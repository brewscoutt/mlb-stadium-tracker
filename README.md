# MLB Stadium Tracker

A tiny, no-build personal tool for tracking which of the 30 MLB stadiums you've visited.

## Use it

Open `index.html` in a browser (double-click it, or serve the folder with any static file server). No install, no dependencies.

Three views, sharing the same saved data:

- **List** (`index.html`) — check off a stadium as visited; a date and notes field appear for it. Search by team, stadium, or city, filter by league or visited status, and sort. Use **Export** to save a JSON backup, and **Import** to restore it (e.g. on another device/browser).
- **Collection** (`collection.html`) — a badge grid of retro pixel-art stadium icons. Each one starts grayscale; tapping it marks the stadium visited, pops in the team's colors, and lights up its towers.
- **Former Parks** (`former.html`) — retired ballparks from the modern era (roughly since 1989) that a team has since moved on from, e.g. the Oakland Coliseum or Shea Stadium. Tracked separately from the current 30 so a visit to a now-demolished park still counts for something. This is not the full history of every MLB ballpark ever — just the recent, plausibly-visited-in-your-lifetime ones.

Data is saved to `localStorage` in your browser only, under one shared key, so Export/Import from the List view backs up all three views at once.

## Files

- `stadiums.js` — static data for all 30 current MLB ballparks, plus each team's colors.
- `former-stadiums.js` — static data for retired ballparks (see Former Parks above).
- `storage.js` — shared localStorage read/write helpers used by all views.
- `pixel-stadium.js` — procedurally builds the pixel-art stadium bowl icon used on the Collection page.
- `index.html` / `app.js` — the List view.
- `collection.html` / `collection.js` / `collection.css` — the Collection view.
- `former.html` / `former.js` — the Former Parks view.
- `style.css` — shared styling across all views.
