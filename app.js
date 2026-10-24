// ChatWave app logic — local demo only. State persists in localStorage.
(function () {
  var seed = window.CHATWAVE_DATA;
  var STORAGE_KEY = 'chatwave-chats-v1';
  var chats, activeId = null, currentTab = 'chats', replyTimers = {};

  function load() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { chats = JSON.parse(saved); return; }
    } catch (e) {}
    chats = JSON.parse(JSON.stringify(seed.chats));
  }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(chats)); } catch (e) {} }
  function nowTime() {
    var d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  function initials(name) { return name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase(); }
  function lastMsg(chat) { return chat.messages.length ? chat.messages[chat.messages.length - 1] : null; }
  function lastTime(chat) { var m = lastMsg(chat); return m ? m.time : ''; }

  function renderList() {
    var list = document.getElementById('chatList');
    var info = document.getElementById('sideInfo');
    var q = (document.getElementById('searchInput').value || '').toLowerCase();
    list.innerHTML = ''; info.innerHTML = '';
    if (currentTab === 'status') {
      seed.statuses.forEach(function (s) {
        var d = document.createElement('div'); d.className = 'chat-item';
        d.innerHTML = '<div class="avatar" style="background:#25d366">' + initials(s.name) + '</div><div class="chat-item-text"><strong>' + s.name + '</strong><span>' + s.text + '</span></div><div class="chat-meta">' + s.time + '</div>';
        list.appendChild(d);
      });
      info.textContent = 'Status updates are demo data only — not real WhatsApp statuses.';
      return;
    }
    if (currentTab === 'calls') {
      seed.calls.forEach(function (c) {
        var d = document.createElement('div'); d.className = 'chat-item';
        d.innerHTML = '<div class="avatar" style="background:#667781">' + initials(c.name) + '</div><div class="chat-item-text"><strong>' + c.name + '</strong><span>' + (c.missed ? 'Missed ' : '') + c.type + ' call (demo)</span></div><div class="chat-meta">' + c.time + '</div>';
        list.appendChild(d);
      });
      info.textContent = 'Calls are demo data only — no real calls are made.';
      return;
    }
    if (currentTab === 'starred') {
      var found = false;
      chats.forEach(function (chat) {
        chat.messages.forEach(function (m) {
          if (!m.starred) return; found = true;
          var d = document.createElement('div'); d.className = 'chat-item';
          d.innerHTML = '<div class="avatar" style="background:' + chat.color + '">' + initials(chat.name) + '</div><div class="chat-item-text"><strong>' + chat.name + '</strong><span>⭐ ' + m.text + '</span></div>';
          d.onclick = function () { openChat(chat.id); };
          list.appendChild(d);
        });
      });
      if (!found) info.textContent = 'No starred messages yet. Hover a message and click ⭐ Star to star it.';
      return;
    }
    chats.filter(function (c) { return !q || c.name.toLowerCase().indexOf(q) !== -1; }).forEach(function (chat) {
      var m = lastMsg(chat);
      var item = document.createElement('div'); item.className = 'chat-item' + (chat.id === activeId ? ' active' : '');
      item.setAttribute('data-chat-id', chat.id);
      item.innerHTML = '<div class="avatar" style="background:' + chat.color + '">' + initials(chat.name) + '</div>' +
        '<div class="chat-item-text"><strong>' + chat.name + (chat.online ? ' <span class="online-dot">●</span>' : '') + '</strong><span>' + (m ? m.text : 'No messages yet') + '</span></div>' +
        '<div class="chat-meta">' + lastTime(chat) + (chat.unread ? '<br><span class="unread">' + chat.unread + '</span>' : '') + '</div>';
      item.onclick = function () { openChat(chat.id); };
      list.appendChild(item);
    });
  }

  function openChat(id) {
    var chat = chats.find(function (c) { return c.id === id; });
    if (!chat) return;
    activeId = id; chat.unread = 0; save();
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('chatView').classList.remove('hidden');
    document.getElementById('chatName').textContent = chat.name;
    document.getElementById('chatStatus').textContent = chat.online ? 'online' : (chat.type === 'group' ? 'group · ' + chat.messages.length + ' messages' : 'last seen recently');
    var av = document.getElementById('chatAvatar'); av.textContent = initials(chat.name); av.style.background = chat.color;
    renderMessages(); renderList();
    document.getElementById('messageInput').focus();
  }

  function renderMessages() {
    var chat = chats.find(function (c) { return c.id === activeId; });
    if (!chat) return;
    var box = document.getElementById('messages'); box.innerHTML = '';
    chat.messages.forEach(function (m, idx) {
      var div = document.createElement('div'); div.className = 'msg ' + (m.from === 'me' ? 'me' : 'them') + (m.starred ? ' starred' : '');
      var ticks = m.from === 'me' ? (m.ticks === 2 ? ' ✓✓' : ' ✓') : '';
      div.innerHTML = '<span>' + escapeHtml(m.text) + '</span><span class="msg-time">' + m.time + ticks + (m.starred ? ' ⭐' : '') + '</span>' +
        '<div class="msg-actions"><button data-action="star">' + (m.starred ? 'Unstar' : '⭐ Star') + '</button><button data-action="delete">🗑 Delete</button></div>';
      div.querySelector('[data-action="star"]').onclick = function () { m.starred = !m.starred; save(); renderMessages(); renderList(); };
      div.querySelector('[data-action="delete"]').onclick = function () { chat.messages.splice(idx, 1); save(); renderMessages(); renderList(); };
      box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
  }
  function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function sendMessage(text) {
    var chat = chats.find(function (c) { return c.id === activeId; });
    if (!chat || !text.trim()) return;
    chat.messages.push({ from: 'me', text: text.trim(), time: nowTime(), ticks: 2, starred: false });
    save(); renderMessages(); renderList();
    // Simulated reply — clearly a demo, not a real person.
    if (replyTimers[chat.id]) clearTimeout(replyTimers[chat.id]);
    document.getElementById('typingIndicator').classList.remove('hidden');
    replyTimers[chat.id] = setTimeout(function () {
      document.getElementById('typingIndicator').classList.add('hidden');
      var reply = seed.replies[Math.floor(Math.random() * seed.replies.length)];
      chat.messages.push({ from: 'them', text: reply, time: nowTime(), ticks: 2, starred: false });
      save(); renderMessages(); renderList();
    }, 1500);
  }

  function init() {
    load();
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.onclick = function () {
        document.querySelectorAll('.tab').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active'); currentTab = btn.getAttribute('data-tab'); renderList();
      };
    });
    document.getElementById('searchInput').addEventListener('input', renderList);
    document.getElementById('messageForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('messageInput');
      sendMessage(input.value); input.value = '';
    });
    document.getElementById('emojiBtn').onclick = function () {
      var picker = document.getElementById('emojiPicker');
      picker.classList.toggle('hidden');
      if (!picker.innerHTML) {
        seed.emojis.forEach(function (em) {
          var b = document.createElement('button'); b.type = 'button'; b.textContent = em;
          b.onclick = function () { var inp = document.getElementById('messageInput'); inp.value += em; inp.focus(); };
          picker.appendChild(b);
        });
      }
    };
    document.getElementById('newChatBtn').onclick = function () { document.getElementById('newChatForm').classList.toggle('hidden'); };
    document.getElementById('cancelNewBtn').onclick = function () { document.getElementById('newChatForm').classList.add('hidden'); };
    document.getElementById('newChatForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('newName').value.trim();
      if (!name) return;
      var id = 'custom-' + Date.now();
      chats.unshift({ id: id, name: name, type: document.getElementById('newType').value, online: true, unread: 0, color: '#00a884', messages: [{ from: 'them', text: 'Hello! This is a new demo chat.', time: nowTime(), ticks: 2, starred: false }] });
      save(); document.getElementById('newChatForm').classList.add('hidden'); document.getElementById('newName').value = '';
      currentTab = 'chats'; document.querySelectorAll('.tab').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-tab') === 'chats'); });
      renderList(); openChat(id);
    });
    renderList();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
