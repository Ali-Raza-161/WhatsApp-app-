# ChatWave — WhatsApp-style Chat App (Demo)

A WhatsApp Web-style chat demo: chat list, conversations, message
bubbles, ticks, search, new chats, emoji picker, starred messages,
status and calls demo lists, and simulated replies. Plain HTML/CSS/JS
only, no API key, no backend, no external libraries. Works from
`file://` and on GitHub Pages.

## What it does

- **Chat list:** 10 sample chats/groups (Pakistani names), last
  message, time, unread badge, online status, and live search.
- **Conversation:** click a chat to open it. Sent messages are green,
  received are white, with timestamps and single/double ticks.
- **Send a message:** it appears in the chat, updates the chat list,
  and saves to `localStorage`, so it persists after reload.
- **Simulated replies:** after you send a message, the contact replies
  automatically after about 1.5 seconds with a canned reply. This is
  a demo simulation, not a real person.
- **New chat / group:** add a contact or group from the form; it
  appears at the top of the list and opens immediately.
- **Emoji picker:** 26 common emojis that insert into the message input.
- **Message actions:** hover a message to ⭐ star it or 🗑 delete it.
  Starred messages are listed under the Starred tab.
- **Status / Calls tabs:** demo lists only — status updates that can
  be viewed in the list, and calls with missed/incoming labels. No
  real calls are made.

## How to run (no build step)

```bash
cd whatsapp-clone-chat-app
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Try it

1. Click **Ahmed Raza** in the chat list.
2. Type a message and press Enter — it appears in green, then a
   simulated reply arrives.
3. Type a name in Search — the list filters live.
4. Click **＋ New**, add a name, and the new chat opens.
5. Hover a message, click ⭐ Star, then open the Starred tab.
6. Reload the page — your sent message is still there (localStorage).

## Screenshots

### Chat list

![ChatWave chat list](docs/screenshots/chats.png)

### Conversation

![ChatWave conversation](docs/screenshots/conversation.png)

### New chat

![ChatWave new chat](docs/screenshots/new-chat.png)

## Honest note — what this is NOT

This is a **UI + local demo clone, NOT WhatsApp**. It is NOT
connected to WhatsApp or Meta, does NOT send messages to real
WhatsApp users, and does NOT use the WhatsApp Business API.
Messages live in this browser only. A real multi-user chat would
need a server, user accounts, message delivery, and end-to-end
encryption — none of which this demo claims to provide.

## Files

- `index.html` — layout: sidebar, conversation, footer note
- `styles.css` — WhatsApp Web-style theme, no external fonts/libraries
- `app.js` — chat state, sending, replies, search, new chat, stars
- `data.js` — sample chats, replies, statuses, calls, emojis
- `TESTING.md` — test results
- `docs/screenshots/` — screenshots of the running demo

## GitHub

Code is pushed to `Ali-Raza-161/WhatsApp-app-` on the main branch.
GitHub Pages is **not** enabled yet — to make the demo live, enable
it in Settings > Pages, deploy from the main branch, /(root).
