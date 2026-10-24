// ChatWave demo data — local sample data only, no real WhatsApp users.
(function () {
  var chats = [
    { id: 'az', name: 'Az', type: 'chat', online: true, unread: 1, color: '#e91e63', messages: [
      { from: 'me', text: 'Tera sath rehna meri life ki sab se bari khushi hai. ❤️', time: '18:30', ticks: 2, starred: false },
      { from: 'them', text: 'Meri life ki bhi sab se bari khushi tum ho. ❤️', time: '18:31', ticks: 2, starred: false }
    ]},
    { id: 'ahmed', name: 'Ahmed Raza', type: 'chat', online: true, unread: 2, color: '#00a884', messages: [
      { from: 'them', text: 'Assalam o Alaikum! Kal match dekhna hai?', time: '09:12', ticks: 2, starred: false },
      { from: 'me', text: 'Walaikum Assalam, haan zaroor! 7 baje?', time: '09:15', ticks: 2, starred: false },
      { from: 'them', text: 'Perfect, main snacks le aata hoon.', time: '09:16', ticks: 2, starred: false }
    ]},
    { id: 'fatima', name: 'Fatima Khan', type: 'chat', online: true, unread: 0, color: '#8e44ad', messages: [
      { from: 'them', text: 'Assignment submit kar di?', time: '08:40', ticks: 2, starred: false },
      { from: 'me', text: 'Haan, kal raat hi kar di thi.', time: '08:45', ticks: 2, starred: false },
      { from: 'them', text: 'Great, teacher ne check bhi kar li.', time: '08:47', ticks: 2, starred: false }
    ]},
    { id: 'ali', name: 'Ali Hamza', type: 'chat', online: false, unread: 1, color: '#e67e22', messages: [
      { from: 'them', text: 'Bhai, wo wali photo bhej do.', time: '10:02', ticks: 1, starred: false },
      { from: 'me', text: 'Abhi bhejta hoon, 2 minute.', time: '10:05', ticks: 2, starred: false }
    ]},
    { id: 'ayesha', name: 'Ayesha Malik', type: 'chat', online: true, unread: 0, color: '#e91e63', messages: [
      { from: 'them', text: 'Birthday party Sunday ko hai, aa rahe ho na?', time: '07:30', ticks: 2, starred: false },
      { from: 'me', text: 'Haan, pakka aaonga!', time: '07:35', ticks: 2, starred: false }
    ]},
    { id: 'bilal', name: 'Bilal Ahmed', type: 'chat', online: false, unread: 0, color: '#2980b9', messages: [
      { from: 'me', text: 'Project ki file mil gayi?', time: 'Yesterday', ticks: 2, starred: false },
      { from: 'them', text: 'Haan, thanks! Kaam ho gaya.', time: 'Yesterday', ticks: 2, starred: false }
    ]},
    { id: 'sana', name: 'Sana Iqbal', type: 'chat', online: true, unread: 3, color: '#16a085', messages: [
      { from: 'them', text: 'Shopping chalen kal?', time: '11:20', ticks: 2, starred: false },
      { from: 'them', text: 'Sale lagi hui hai mall me.', time: '11:21', ticks: 2, starred: false }
    ]},
    { id: 'usman', name: 'Usman Tariq', type: 'chat', online: false, unread: 0, color: '#7f8c8d', messages: [
      { from: 'them', text: 'Car ki servicing ho gayi.', time: 'Yesterday', ticks: 2, starred: false },
      { from: 'me', text: 'Kitne ki pari?', time: 'Yesterday', ticks: 2, starred: false },
      { from: 'them', text: '8000, reasonable thi.', time: 'Yesterday', ticks: 2, starred: false }
    ]},
    { id: 'zainab', name: 'Zainab Noor', type: 'chat', online: true, unread: 0, color: '#c0392b', messages: [
      { from: 'them', text: 'Notes share kar do please.', time: '06:15', ticks: 2, starred: false },
      { from: 'me', text: 'Theek hai, abhi PDF bhejta hoon.', time: '06:20', ticks: 2, starred: false }
    ]},
    { id: 'family', name: 'Family Group', type: 'group', online: false, unread: 5, color: '#27ae60', messages: [
      { from: 'them', text: 'Ammi: Sab Sunday ko ghar aa jana.', time: '12:00', ticks: 2, starred: false },
      { from: 'them', text: 'Abbu: Khana bahar se mangwa lete hain.', time: '12:05', ticks: 2, starred: false },
      { from: 'me', text: 'Theek hai, main 1 baje aa jaonga.', time: '12:10', ticks: 2, starred: false }
    ]},
    { id: 'office', name: 'Office Team', type: 'group', online: false, unread: 0, color: '#2c3e50', messages: [
      { from: 'them', text: 'Manager: Meeting 3 baje hai, sab ready rahen.', time: '09:00', ticks: 2, starred: false },
      { from: 'me', text: 'Noted, presentation ready hai.', time: '09:10', ticks: 2, starred: false }
    ]}
  ];
  var replies = [
    'Haan, theek hai! 👍',
    'Samajh gaya, acha idea hai.',
    'Kal is par baat karte hain.',
    'Thanks for telling me!',
    'Haha, sahi kaha! 😄',
    'Theek hai, main kar loonga.',
    'Zaroor, mujhe bhi bata dena.',
    'Acha, phir milte hain!'
  ];
  var statuses = [
    { name: 'Ahmed Raza', text: 'At the cricket ground 🏏', time: 'Today, 10:30' },
    { name: 'Fatima Khan', text: 'Study mode on 📚', time: 'Today, 09:15' },
    { name: 'Sana Iqbal', text: 'Shopping day! 🛍️', time: 'Yesterday, 18:20' },
    { name: 'My Status', text: 'Working on a new project 💻', time: 'Today, 08:00' }
  ];
  var calls = [
    { name: 'Ahmed Raza', type: 'Incoming', time: 'Today, 11:00', missed: false },
    { name: 'Sana Iqbal', type: 'Missed', time: 'Today, 09:45', missed: true },
    { name: 'Ali Hamza', type: 'Outgoing', time: 'Yesterday, 20:10', missed: false },
    { name: 'Family Group', type: 'Missed', time: 'Yesterday, 15:30', missed: true }
  ];
  var emojis = ['😀','😄','😂','😍','😊','👍','👏','🙏','❤️','🔥','🎉','😅','🤔','😎','🙌','👋','💻','📚','🏏','🍕','☕','🚗','🎁','⭐','✅','🙂'];
  var data = { chats: chats, replies: replies, statuses: statuses, calls: calls, emojis: emojis };
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
  else window.CHATWAVE_DATA = data;
})();
