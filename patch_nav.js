const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// Find the exact marker
const marker = 'Mening Profilim")));\n    }\n    return null;\n  };';
const idx = content.indexOf(marker);

if (idx === -1) {
  console.log('MARKER NOT FOUND');
  // Try to find what's there
  const altIdx = content.indexOf('Mening Profilim');
  if (altIdx !== -1) {
    console.log('Found "Mening Profilim" at:', altIdx);
    console.log('Context:', JSON.stringify(content.slice(altIdx, altIdx + 100)));
  }
  process.exit(1);
}

console.log('Found marker at:', idx);

const mentorGuestBlockedNav = `Mening Profilim")));
    }

    // 4. MENTOR MENUS
    if (currentUser.role === 'mentor') {
      return React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'mentor_dashboard' ? 'active' : ''), onClick: function() { setActiveTab('mentor_dashboard'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-chalkboard-user' }), !isSidebarCollapsed && React.createElement('span', null, 'Mentor Paneli')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'groups' ? 'active' : ''), onClick: function() { setActiveTab('groups'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-people-roof' }), !isSidebarCollapsed && React.createElement('span', null, 'Guruhlarim')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'homework_review' ? 'active' : ''), onClick: function() { setActiveTab('homework_review'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-list-check' }), !isSidebarCollapsed && React.createElement('span', null, 'Vazifalar')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'schedule' ? 'active' : ''), onClick: function() { setActiveTab('schedule'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-calendar-days' }), !isSidebarCollapsed && React.createElement('span', null, 'Dars Jadvali'))
      );
    }

    // 5. GUEST MENUS
    if (currentUser.role === 'guest') {
      return React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'guest_home' ? 'active' : ''), onClick: function() { setActiveTab('guest_home'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-house' }), !isSidebarCollapsed && React.createElement('span', null, 'Bosh Sahifa')),
        React.createElement('button', { className: 'nav-item-btn ' + (activeTab === 'courses' ? 'active' : ''), onClick: function() { setActiveTab('courses'); setIsMobileMenuOpen(false); } }, React.createElement('i', { className: 'fa-solid fa-book-open' }), !isSidebarCollapsed && React.createElement('span', null, 'Kurslar Katalogi'))
      );
    }

    // 6. BLOCKED MENUS
    if (currentUser.role === 'blocked') {
      return React.createElement(React.Fragment, null,
        React.createElement('button', { className: 'nav-item-btn', style: { background: 'rgba(148,163,184,0.1)', color: '#94a3b8', cursor: 'not-allowed' } }, React.createElement('i', { className: 'fa-solid fa-ban' }), !isSidebarCollapsed && React.createElement('span', null, 'Hisob Bloklangan'))
      );
    }

    return null;
  };`;

content = content.replace(marker, mentorGuestBlockedNav);
fs.writeFileSync('app.js', content, 'utf8');
console.log('SUCCESS: Sidebar nav updated with mentor/guest/blocked!');
