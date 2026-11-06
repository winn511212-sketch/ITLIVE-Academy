// Terminal CLI orqali Telegramga tezkor ulanish skripti
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
const fs = require('fs');
const path = require('path');

const apiId = 2040;
const apiHash = 'b18441a14360a370b257861453c849f3';
const stringSession = new StringSession('');

(async () => {
  console.log('--- Telegram Tezkor Ulanish Tizimi ---');
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text('Telefon raqamingizni kiriting (+998...): '),
    password: async () => await input.password('2FA parolingiz (agar bo\'lsa): '),
    phoneCode: async () => await input.text('Telegramga kelgan 5 xonali kod: '),
    onError: (err) => console.log('Xatolik:', err),
  });

  console.log('Muvaffaqiyatli ulandi!');
  const sessionString = client.session.save();
  const me = await client.getMe();
  console.log(`Xush kelibsiz: ${me.firstName} (@${me.username || ''})`);

  // Save session for server.js
  const sessionData = {
    stringSession: sessionString,
    apiId: apiId,
    apiHash: apiHash,
    phone: me.phone,
    isLoggedIn: true
  };

  fs.writeFileSync(path.join(__dirname, 'session_store.json'), JSON.stringify(sessionData, null, 2));
  console.log('Sessiya saqlandi! Endi http://localhost:3000 avtomatik sizning akkauntingizda ochiladi.');
  process.exit(0);
})();
