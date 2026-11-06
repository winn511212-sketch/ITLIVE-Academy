const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// Find the insertion point - before renderSidebarNav
const marker = '  // ==========================================================================\n  // SIDEBAR NAVIGATION RENDERER';
const idx = content.indexOf(marker);

if (idx === -1) {
  // Try to find alternate marker
  const altMarker = 'renderSidebarNav';
  const altIdx = content.indexOf(altMarker);
  console.log('Alt marker at:', altIdx);
  console.log('Context:', JSON.stringify(content.slice(Math.max(0,altIdx-200), altIdx+50)));
  process.exit(1);
}

console.log('Insertion point found at:', idx);

const newViews = `
  // ==========================================================================
  // VIEW: MENTOR DASHBOARD
  // ==========================================================================
  const renderMentorContent = () => React.createElement('div', { className: 'dashboard-content-area' },
    React.createElement('div', { className: 'page-header-actions' },
      React.createElement('div', { className: 'page-title-box' },
        React.createElement('h2', null, React.createElement('i', { className: 'fa-solid fa-chalkboard-user', style: { marginRight: '10px', color: '#10b981' } }), 'Mentor Paneli'),
        React.createElement('p', null, 'Farxod Dadajonov — Frontend React & Next.js Pro Mentori')
      )
    ),
    React.createElement('div', { className: 'stats-cards-grid' },
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-top' }, React.createElement('div', { className: 'stat-icon-box stat-icon-green' }, React.createElement('i', { className: 'fa-solid fa-users' }))),
        React.createElement('div', { className: 'stat-value' }, '18'),
        React.createElement('div', { className: 'stat-bottom-row' }, React.createElement('div', { className: 'stat-label' }, 'Mening Talabalarim'), React.createElement('div', { className: 'stat-trend' }, 'FN-204 Guruh'))
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-top' }, React.createElement('div', { className: 'stat-icon-box stat-icon-yellow' }, React.createElement('i', { className: 'fa-solid fa-list-check' }))),
        React.createElement('div', { className: 'stat-value' }, homeworks.filter(h => h.status === 'pending').length),
        React.createElement('div', { className: 'stat-bottom-row' }, React.createElement('div', { className: 'stat-label' }, 'Tekshiruv Kutayotgan'), React.createElement('div', { className: 'stat-trend', style: { color: '#f59e0b' } }, 'Muhim'))
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-top' }, React.createElement('div', { className: 'stat-icon-box stat-icon-blue' }, React.createElement('i', { className: 'fa-solid fa-star' }))),
        React.createElement('div', { className: 'stat-value' }, '4.9'),
        React.createElement('div', { className: 'stat-bottom-row' }, React.createElement('div', { className: 'stat-label' }, 'Reyting Baholari'), React.createElement('div', { className: 'stat-trend' }, React.createElement('i', { className: 'fa-solid fa-arrow-up' }), ' 0.2'))
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-top' }, React.createElement('div', { className: 'stat-icon-box stat-icon-cyan' }, React.createElement('i', { className: 'fa-solid fa-book-open' }))),
        React.createElement('div', { className: 'stat-value' }, '32'),
        React.createElement('div', { className: 'stat-bottom-row' }, React.createElement('div', { className: 'stat-label' }, 'Jami Darslar'), React.createElement('div', { className: 'stat-trend' }, '4 oy kurs'))
      )
    ),
    React.createElement('div', { className: 'dashboard-card', style: { marginTop: '24px' } },
      React.createElement('div', { className: 'card-header-bar' },
        React.createElement('h3', null, React.createElement('i', { className: 'fa-solid fa-list-check', style: { marginRight: '8px', color: '#f59e0b' } }), 'Tekshiruv kutayotgan vazifalar'),
        React.createElement('button', { className: 'card-action-tag', onClick: () => setActiveTab('homework_review'), style: { background: 'transparent', border: 'none', cursor: 'pointer' } }, 'Barchasini tekshirish →')
      ),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' } },
        homeworks.filter(h => h.status === 'pending').length === 0
          ? React.createElement('p', { style: { color: 'var(--text-muted)', padding: '20px', textAlign: 'center' } }, '✅ Barcha vazifalar baholangan!')
          : homeworks.filter(h => h.status === 'pending').slice(0,3).map(hw =>
              React.createElement('div', { key: hw.id, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-subtle)' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                  React.createElement('img', { src: hw.studentAvatar, style: { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #f59e0b' } }),
                  React.createElement('div', null,
                    React.createElement('div', { style: { fontSize: '14px', fontWeight: '700', color: '#fff' } }, hw.studentName),
                    React.createElement('div', { style: { fontSize: '12px', color: 'var(--text-secondary)' } }, hw.lessonTitle)
                  )
                ),
                React.createElement('button', { className: 'btn-primary', style: { padding: '6px 14px', fontSize: '12px' }, onClick: () => handleOpenGradingModal(hw) },
                  React.createElement('i', { className: 'fa-solid fa-star' }), ' Baholash'
                )
              )
            )
      )
    )
  );

  // ==========================================================================
  // VIEW: GUEST HOME
  // ==========================================================================
  const renderGuestContent = () => React.createElement('div', { className: 'dashboard-content-area' },
    React.createElement('div', { style: { textAlign: 'center', padding: '60px 20px 40px' } },
      React.createElement('div', { style: { width: '100px', height: '100px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '40px', boxShadow: '0 20px 40px rgba(139,92,246,0.3)' } },
        React.createElement('i', { className: 'fa-solid fa-user', style: { color: '#fff' } })
      ),
      React.createElement('h1', { style: { fontSize: '32px', fontWeight: '800', marginBottom: '12px' } }, 'IT LIVE Academy ga xush kelibsiz!'),
      React.createElement('p', { style: { fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: '1.7' } }, "Siz mehmon sifatida ko'rib chiqyapsiz. To'liq imkoniyatlar uchun hisob oching yoki login qiling."),
      React.createElement('div', { style: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' } },
        React.createElement('button', { className: 'btn-primary', style: { padding: '12px 28px', fontSize: '15px' }, onClick: () => handleQuickRoleSwitch('student') },
          React.createElement('i', { className: 'fa-solid fa-graduation-cap' }), ' Talaba sifatida kiring'
        ),
        React.createElement('button', { className: 'btn-secondary', style: { padding: '12px 28px', fontSize: '15px' }, onClick: () => setActiveTab('courses') },
          React.createElement('i', { className: 'fa-solid fa-book-open' }), ' Kurslarni Ko\'rish'
        )
      )
    ),
    React.createElement('div', { className: 'stats-cards-grid', style: { marginTop: '10px' } },
      [
        { icon: 'fa-users', color: 'stat-icon-blue', value: '1,200+', label: "Muvaffaqiyatli o'quvchilar" },
        { icon: 'fa-book-open', color: 'stat-icon-green', value: '6', label: "Zamonaviy kurslar" },
        { icon: 'fa-star', color: 'stat-icon-yellow', value: '4.9', label: "O'rtacha reyting" },
        { icon: 'fa-briefcase', color: 'stat-icon-cyan', value: '87%', label: "Ish topish ko'rsatkichi" }
      ].map((s, i) => React.createElement('div', { key: i, className: 'stat-card' },
        React.createElement('div', { className: 'stat-card-top' }, React.createElement('div', { className: 'stat-icon-box ' + s.color }, React.createElement('i', { className: 'fa-solid ' + s.icon }))),
        React.createElement('div', { className: 'stat-value' }, s.value),
        React.createElement('div', { className: 'stat-bottom-row' }, React.createElement('div', { className: 'stat-label' }, s.label))
      ))
    )
  );

  // ==========================================================================
  // VIEW: BLOCKED PAGE
  // ==========================================================================
  const renderBlockedContent = () => React.createElement('div', { className: 'dashboard-content-area' },
    React.createElement('div', { style: { textAlign: 'center', padding: '80px 20px' } },
      React.createElement('div', { style: { width: '120px', height: '120px', background: 'linear-gradient(135deg, #374151, #1f2937)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', border: '4px solid rgba(239,68,68,0.3)', boxShadow: '0 0 40px rgba(239,68,68,0.15)' } },
        React.createElement('i', { className: 'fa-solid fa-ban', style: { fontSize: '48px', color: '#ef4444' } })
      ),
      React.createElement('h1', { style: { fontSize: '36px', fontWeight: '900', color: '#ef4444', marginBottom: '16px', letterSpacing: '-0.5px' } }, 'Hisobingiz Bloklangan'),
      React.createElement('p', { style: { fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: '1.8' } },
        "Sizning hisobingiz vaqtincha bloklangan. Muammo haqida to'liqroq ma'lumot olish yoki blokni olib tashlash uchun IT LIVE Academy administratoriga murojaat qiling."
      ),
      React.createElement('div', { style: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' } },
        React.createElement('a', { href: 'mailto:admin@itlive.uz', className: 'btn-primary', style: { padding: '14px 32px', fontSize: '15px', textDecoration: 'none' } },
          React.createElement('i', { className: 'fa-solid fa-envelope' }), ' Admin bilan bog\'lanish'
        ),
        React.createElement('button', { className: 'btn-secondary', style: { padding: '14px 32px', fontSize: '15px' }, onClick: handleLogout },
          React.createElement('i', { className: 'fa-solid fa-arrow-right-from-bracket' }), ' Tizimdan Chiqish'
        )
      ),
      React.createElement('div', { style: { marginTop: '48px', padding: '24px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', maxWidth: '400px', margin: '48px auto 0' } },
        React.createElement('div', { style: { fontSize: '13px', color: '#fca5a5', fontWeight: '600', marginBottom: '8px' } }, React.createElement('i', { className: 'fa-solid fa-circle-info', style: { marginRight: '6px' } }), 'Murojaat ma\'lumotlari'),
        React.createElement('div', { style: { fontSize: '13px', color: 'var(--text-secondary)' } }, 'admin@itlive.uz | +998 71 200 00 01')
      )
    )
  );

`;

content = content.slice(0, idx) + newViews + content.slice(idx);
fs.writeFileSync('app.js', content, 'utf8');
console.log('SUCCESS: Mentor/Guest/Blocked views added!');
console.log('Total file size:', content.length, 'bytes');
