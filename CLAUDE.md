# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Big picture

Vernon's personal website (`vlumpkin.github.io`) — a single-page React app bundled by webpack. The bundle is committed to `public/` and served as a static GitHub Pages site; there is no backend despite the `express` dependency in `package.json`.

What the site actually renders today is a **fake Windows 7-style desktop**: draggable icons, resizable windows, a taskbar, a file explorer, a webcam app, and optional MediaPipe hand-gesture control. The older screens (About, Resume, Resume Builder) still exist and still work, but nothing navigates to them — `App.js` hardcodes the initial state to `"Desktop"` and the `<Menu/>` is commented out.

## Commands

- `npm start` — webpack-dev-server in development mode (hot reload), port 8080, serving `public/`.
- `npm run build` — production webpack build. **Must be run and committed** before pushing, because GitHub Pages serves `public/bundle.js` directly. Forgetting this is a recurring issue (see commit `030f944 Forgot to build!`).
- No test script is wired up (`npm test` is a placeholder).

`.claude/launch.json` describes the dev server for the preview tooling; it is not part of the build.

## Architecture

```
src/index.js
  └─ App.js            state = "Desktop" (hardcoded), holds Resume Builder formData
      └─ Display.js    switch on state
           ├─ "Desktop"         → desktop/Desktop.js      ← the only reachable screen
           ├─ "About"           → components/About.js     ┐
           ├─ "Resume"          → components/Resume.js    │ unreachable without
           ├─ "Resume Builder"  → ResumeApp.js            │ editing App.js
           └─ "Testing..."      → ResumeApp + testing/MovingBar.js ┘
```

### The desktop (`src/desktop/`)

`Desktop.js` owns all shell state: open windows, z-order, focus, icon positions, marquee selection, the modal dialog, and whether gesture control is on. Everything else is presentational or a helper.

```
Desktop.js
  ├─ Wordmark.js         wallpaper name, drawn pixelated into a canvas
  ├─ DesktopIcon.js      one icon (double-click opens, drag moves)
  ├─ Window.js           chrome, drag, 8-way resize, min/max/close
  │    └─ BrowserChrome.js   fake address bar, for apps with kind: 'browser'
  ├─ Taskbar.js          start orb, task buttons, clock
  └─ GestureController.js  MediaPipe hand tracking → synthetic mouse events
```

- **`apps.js` is the registry.** Every window in the shell is an entry there: `kind` (`'app'` or `'browser'`), default `width`/`height`, and a `render()` returning the window body. `desktopLayout` is the ordered list of icons on the wallpaper. `apps.js` also contains the whole file explorer (`FileExplorerBody` + the `explorerViews` tree), which is a fake filesystem — folders navigate via `goto`, files launch apps via `open` or open URLs via `href`.
- **Windows are uncontrolled.** `Window.js` keeps its own position/size in local state and exposes `getBounds`/`setBounds`/`isMaximized` through a ref. `Desktop.js` holds those refs in `windowRefs` so the gesture controller can move and maximize windows without lifting geometry into React state.
- **Photos are in-memory.** `photoStore.js` is a `useSyncExternalStore` store; the Camera app writes to it and the explorer's Pictures view reads from it. Refreshing the page loses them, by design.
- **Two scaling wrappers** exist because their content has a fixed authored width: `ScaledResume.js` (the resume tree, base 1480px) and `ScaledIframe.js` (PowerBI/Observable embeds, base dimensions passed per app). Both CSS-transform their subtree to fit the window rather than restyling the content.

### Hand gestures

`handTracking.js` lazy-loads MediaPipe Tasks Vision **from a CDN at runtime** (`import(/* webpackIgnore: true */ ...)`) plus a model from Google's bucket — it is deliberately not bundled, so the desktop works offline until you turn gestures on. Both the Camera app and `GestureController.js` share the one landmarker promise.

`GestureController.js` translates landmarks into synthetic DOM mouse events, so the rest of the shell needs no gesture-specific code. The vocabulary: index pinch = click (double-pinch = dblclick), tripod pinch = click-and-hold/drag, held fist = maximize the window under the cursor, open-palm horizontal swipe = close the active window, two-hand "picture frame" = resize. All thresholds are named constants at the top of the file, most with hysteresis pairs (`*_ON` / `*_OFF`) — tune those rather than the detection logic.

## Quirks

- **Bundle is committed.** `public/bundle.js` is checked in. After any `src/` change, run `npm run build` and commit the new bundle in the same PR.
- **Case-sensitive imports**: the directory is `src/components/` (lowercase). On Windows/macOS a capitalized `./Components/...` import silently works but breaks a Linux build and triggers a webpack "modules with names that only differ in casing" warning. Always import as lowercase.
- **Two HTML files**: `index.html` (root, dev) and `public/index.html` (what GitHub Pages serves). Keep them in sync if you change the `<div id="root">` shell or the stylesheet links.
- **`express` is a dead dependency** — nothing in `src/` imports it. Don't add server code; this ships as static.
- **`header.js` and `style.css` at repo root** are legacy/unused by the webpack build. The live styles are `public/styles.css`, `public/header.css`, and `public/desktop.css`.
- **No in-page navigation.** `Menu` is imported but commented out in `Display.js`, and the taskbar's Start button is a `TODO` no-op. To reach a non-Desktop screen you edit the initial state in `App.js`.
- **Camera and gestures need a secure context** — `getUserMedia` works on `localhost` and the live HTTPS site, but not over a plain-HTTP LAN address.
- **`src/testing/`** holds in-progress experiments (`MovingBar`, `ResumeRebuild`, `TestDisplay`). Treat as scratch; only `MovingBar` is wired anywhere, via the unreachable "Testing..." state.

## Common edits

- Add a desktop app/window → add an entry to `apps` in `src/desktop/apps.js`, then add its id to `desktopLayout` (and to an `explorerViews` folder if it should appear in the file explorer).
- Change the wallpaper name → constants at the top of `src/desktop/Wordmark.js` (`LINES` and their `dx` stagger, `WIDTH_RATIO`, `VERTICAL`, `PIXEL`, `ALPHA`, `CUTOFF`).
- Tune a gesture → the threshold constants at the top of `src/desktop/GestureController.js`.
- Update resume content → `vResumeContent` in `src/data.js`.
- Change desktop look → `public/desktop.css`. Everything else → `public/styles.css` (not the root `style.css`).
