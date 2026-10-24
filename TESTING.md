# ChatWave — Testing

## Automated checks

- `node --check app.js` — PASS
- `node --check data.js` — PASS

## Playwright / headless-Chromium UI tests

Served locally and tested in headless Chromium. See the parent
agent's test report for the exact pass list, including:

- Open a chat — conversation loads with bubbles and timestamps.
- Send a message — it appears in the chat and updates the chat list.
- Search filters the chat list live.
- New chat creation — new chat appears and opens.
- Simulated reply arrives after sending a message.
- Delete a message removes it from the conversation.
- Reload persists a sent message via localStorage.

## Screenshots

Real captures of the running demo in `docs/screenshots/`:
`chats.png`, `conversation.png`, `new-chat.png`.

## Limitations

- Replies are canned demo replies, not a real person or AI.
- Status and calls are demo lists only.
- No real WhatsApp connection, no server, no accounts.
