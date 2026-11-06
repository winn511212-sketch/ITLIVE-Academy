const http = require('http');
const fs = require('fs');
const path = require('path');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { Api } = require('telegram/tl');

const PORT = 3000;
const SESSIONS_FILE = path.join(__dirname, 'session_store.json');

// Session storage
let sessionStore = {
  stringSession: '',
  apiId: 0,
  apiHash: '',
  phone: '',
  phoneCodeHash: '',
  botToken: '',
  isLoggedIn: false
};

if (fs.existsSync(SESSIONS_FILE)) {
  try {
    sessionStore = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
  } catch (e) {}
}

function saveSessions() {
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessionStore, null, 2));
}

let tgClient = null;

async function getClient(apiId, apiHash, sessionStr = '') {
  if (tgClient && tgClient.connected) {
    return tgClient;
  }
  const stringSession = new StringSession(sessionStr || sessionStore.stringSession || '');
  tgClient = new TelegramClient(stringSession, Number(apiId), apiHash, {
    connectionRetries: 5,
  });
  await tgClient.connect();
  return tgClient;
}

// Default public Telegram App credentials for instant connection
const DEFAULT_API_ID = 2040;
const DEFAULT_API_HASH = 'b18441a14360a370b257861453c849f3';

// SSE Clients for live real-time Telegram updates
let sseClients = [];

function broadcastToClients(event, data) {
  sseClients.forEach(client => {
    try {
      client.res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    } catch (e) {}
  });
}

function setupTelegramEventListeners(client) {
  try {
    const { NewMessage } = require('telegram/events');
    client.addEventHandler(async (event) => {
      try {
        const message = event.message;
        if (!message) return;
        const sender = await message.getSender();
        const chat = await message.getChat();
        
        const updateData = {
          id: message.id.toString(),
          chatId: chat ? chat.id.toString() : (sender ? sender.id.toString() : ''),
          chatTitle: chat ? (chat.title || chat.firstName || 'Telegram Chat') : (sender ? sender.firstName : 'User'),
          senderName: sender ? `${sender.firstName || ''} ${sender.lastName || ''}`.trim() : 'User',
          text: message.message || '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOutgoing: message.out
        };

        console.log('Real-time Telegram message received:', updateData.text);
        broadcastToClients('new_message', updateData);
      } catch (err) {
        console.log('Event handler error:', err);
      }
    }, new NewMessage({}));
  } catch (e) {
    console.log('Could not setup event listener:', e);
  }
}

// Auto-restore session if saved
(async () => {
  const apiId = sessionStore.apiId || DEFAULT_API_ID;
  const apiHash = sessionStore.apiHash || DEFAULT_API_HASH;
  if (sessionStore.stringSession) {
    try {
      console.log('Restoring saved Telegram session...');
      const client = await getClient(apiId, apiHash, sessionStore.stringSession);
      const me = await client.getMe();
      if (me) {
        sessionStore.isLoggedIn = true;
        setupTelegramEventListeners(client);
        console.log(`Connected as @${me.username || me.firstName}`);
      }
    } catch (e) {
      console.log('Could not restore session:', e.message);
    }
  }
})();

// HTTP Server
const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Real-time SSE Stream for Telegram Events
  if (req.url === '/api/tg/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('retry: 3000\n\n');
    const clientId = Date.now();
    const newClient = { id: clientId, res };
    sseClients.push(newClient);

    req.on('close', () => {
      sseClients = sseClients.filter(c => c.id !== clientId);
    });
    return;
  }

  // API Routes
  if (req.url.startsWith('/api/')) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      let data = {};
      try {
        if (body) data = JSON.parse(body);
      } catch (e) {}

      // 1. Check Status
      if (req.url === '/api/tg/status') {
        let me = null;
        if (tgClient && tgClient.connected) {
          try {
            const meObj = await tgClient.getMe();
            if (meObj) {
              me = {
                id: meObj.id ? meObj.id.toString() : '',
                firstName: meObj.firstName || '',
                lastName: meObj.lastName || '',
                username: meObj.username || '',
                phone: meObj.phone || ''
              };
            }
          } catch (e) {}
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          isLoggedIn: !!me,
          user: me
        }));
        return;
      }

      // 2. Send SMS / App Verification Code
      if (req.url === '/api/tg/send-code' && req.method === 'POST') {
        try {
          let { apiId, apiHash, phone } = data;
          apiId = Number(apiId) || DEFAULT_API_ID;
          apiHash = apiHash || DEFAULT_API_HASH;

          if (!phone) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Telefon raqam kiritilishi shart' }));
            return;
          }

          sessionStore.apiId = apiId;
          sessionStore.apiHash = apiHash;
          sessionStore.phone = phone;

          const client = await getClient(apiId, apiHash, '');
          const result = await client.sendCode({
            apiId: apiId,
            apiHash: apiHash
          }, phone);

          sessionStore.phoneCodeHash = result.phoneCodeHash;
          saveSessions();

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: 'Tasdiqlash kodi Telegramingizga yuborildi!',
            phoneCodeHash: result.phoneCodeHash
          }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message || 'Telegramga ulanishda xatolik yuz berdi' }));
        }
        return;
      }

      // 3. Sign In with Code & Password
      if (req.url === '/api/tg/sign-in' && req.method === 'POST') {
        try {
          const { code, password } = data;
          const apiId = sessionStore.apiId || DEFAULT_API_ID;
          const apiHash = sessionStore.apiHash || DEFAULT_API_HASH;
          const client = await getClient(apiId, apiHash, '');
          
          await client.signInUser({
            apiId: apiId,
            apiHash: apiHash
          }, {
            phoneNumber: sessionStore.phone,
            phoneCodeHash: sessionStore.phoneCodeHash,
            phoneCode: async () => code,
            password: async () => password || '',
            onError: (err) => { throw err; }
          });

          sessionStore.stringSession = client.session.save();
          sessionStore.isLoggedIn = true;
          saveSessions();

          setupTelegramEventListeners(client);
          const me = await client.getMe();

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: 'Telegram hisobingiz muvaffaqiyatli ulandi!',
            user: {
              id: me.id ? me.id.toString() : '',
              firstName: me.firstName || '',
              username: me.username || '',
              phone: me.phone || ''
            }
          }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message || 'Kodni tasdiqlashda xatolik yuz berdi' }));
        }
        return;
      }

      // 4. Fetch Real Dialogs (Chats)
      if (req.url === '/api/tg/dialogs') {
        try {
          if (!tgClient || !tgClient.connected) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Telegramga ulanmagan' }));
            return;
          }

          const dialogs = await tgClient.getDialogs({ limit: 30 });
          const formatted = [];

          for (const d of dialogs) {
            const entity = d.entity || {};
            const isUser = entity.className === 'User';
            const isGroup = entity.className === 'Chat' || (entity.className === 'Channel' && !entity.broadcast);
            const isChannel = entity.className === 'Channel' && entity.broadcast;

            let type = 'private';
            if (isGroup) type = 'group';
            if (isChannel) type = 'channel';

            const name = d.title || (entity.firstName ? `${entity.firstName} ${entity.lastName || ''}`.trim() : 'Saved Messages');
            const lastMsg = d.message ? (d.message.message || (d.message.media ? '📎 Media' : '')) : '';

            // Fetch recent messages for this dialog
            let messages = [];
            try {
              const hist = await tgClient.getMessages(d.inputEntity, { limit: 15 });
              messages = hist.reverse().map(m => ({
                id: m.id.toString(),
                sender: m.out ? 'You' : (m.sender ? (m.sender.firstName || name) : name),
                isOutgoing: m.out,
                type: m.media ? (m.media.className ? 'file' : 'text') : 'text',
                text: m.message || (m.media ? '📎 Media fayl' : ''),
                timestamp: m.date ? new Date(m.date * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
                reactions: []
              }));
            } catch (e) {}

            formatted.push({
              id: d.id ? d.id.toString() : entity.id.toString(),
              entityId: entity.id ? entity.id.toString() : '',
              name: name,
              type: type,
              folder: isUser ? 'private' : (isGroup ? 'groups' : 'channels'),
              time: d.date ? new Date(d.date * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
              unread: d.unreadCount || 0,
              lastMessage: lastMsg,
              avatarBg: isUser ? '#3b82f6' : (isGroup ? '#10b981' : '#f59e0b'),
              avatarText: name.substring(0, 2).toUpperCase(),
              username: entity.username ? `@${entity.username}` : '',
              messages: messages.length > 0 ? messages : [
                {
                  id: 'real-m1',
                  sender: name,
                  isOutgoing: false,
                  type: 'text',
                  text: lastMsg || 'Salom!',
                  timestamp: d.date ? new Date(d.date * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00',
                  reactions: []
                }
              ]
            });
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ dialogs: formatted }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
        return;
      }

      // 5. Send Real Message to Telegram
      if (req.url === '/api/tg/send-message' && req.method === 'POST') {
        try {
          const { chatId, username, text } = data;
          if (!tgClient || !tgClient.connected) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Telegramga ulanmagan' }));
            return;
          }

          let target = chatId;
          if (username) {
            target = username.replace('@', '');
          }

          const resMsg = await tgClient.sendMessage(target, { message: text });
          console.log(`Sent real Telegram message to ${target}: ${text}`);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, messageId: resMsg.id.toString() }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
        return;
      }

      // 6. Real Telegram Call Trigger
      if (req.url === '/api/tg/call' && req.method === 'POST') {
        try {
          const { username, chatId } = data;
          const userHandle = username ? username.replace('@', '') : chatId;
          const deepLink = `tg://resolve?domain=${userHandle}&call=1`;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, deepLink }));
        } catch (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
        return;
      }

      // 7. Logout
      if (req.url === '/api/tg/logout' && req.method === 'POST') {
        sessionStore = { stringSession: '', apiId: 0, apiHash: '', phone: '', phoneCodeHash: '', isLoggedIn: false };
        saveSessions();
        if (tgClient) {
          try { await tgClient.disconnect(); } catch (e) {}
          tgClient = null;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Chiqildi' }));
        return;
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API topilmadi' }));
    });
    return;
  }

  // Static Files Serving
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      const ext = path.extname(filePath);
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Telegram Clone Server running on http://localhost:${PORT}`);
});
