# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Big picture

Vernon's personal website (`vlumpkin.github.io`) — a single-page React app bundled by webpack. The bundle is committed to `public/` and served as a static GitHub Pages site; there is no backend despite the `express` dependency listed in `package.json`. The app is a state-machine over a few "screens" (About, Resume, Resume Builder, Testing) selected by a `useState` value in `src/App.js` and dispatched in `src/Display.js`.

## Commands

- `npm start` — webpack-dev-server in development mode (hot reload).
- `npm run build` — production webpack build. **Must be run and committed** before pushing, because GitHub Pages serves `public/bundle.js` directly. Forgetting this is a recurring issue (see commit `030f944 Forgot to build!`).
- No test script is wired up (`npm test` is a placeholder).

## Architecture

```
src/index.js → <App/> (src/App.js, holds state + formData)
                └─ <Display/> (src/Display.js, switch on state)
                     ├─ "About"          → components/About.js
                     ├─ "Resume"         → components/Resume.js  (renders data.js → vResumeContent)
                     ├─ "Resume Builder" → ResumeApp.js          (uses ResumeForm + Resume)
                     └─ "Testing..."     → ResumeApp + testing/MovingBar.js
```

- **Entry**: webpack reads `src/index.js`, emits `public/bundle.js`. Configured in `webpack.config.js` with `@babel/preset-env` + `@babel/preset-react`.
- **Two HTML files**: `index.html` (root, dev) and `public/index.html` (what GitHub Pages serves). Keep them in sync if you change the `<div id="root">` shell or stylesheet links.
- **Resume content** is hardcoded in `src/data.js` as `vResumeContent`. The "Resume Builder" screen lets the user edit a parallel `formData` shape in `App.js` state — it does **not** persist anywhere.
- **`src/testing/`** holds in-progress experiments (alternate `MovingBar`, `ResumeRebuild`, `TestDisplay`). Treat as scratch; not on any production path unless wired through `Display.js`.

## Quirks

- **Case-sensitive imports**: the directory is `src/components/` (lowercase). On Windows/macOS a capitalized `./Components/...` import silently works but breaks a Linux build and triggers a webpack "modules with names that only differ in casing" warning. Always import as lowercase.
- **`express` is a dead dependency** — listed in `package.json` but nothing in `src/` imports it. Don't add server code; this ships as static.
- **`header.js` and `style.css` at repo root** are legacy/unused by the webpack build. The live styles are `public/styles.css` and `public/header.css`.
- **Menu is commented out** in `Display.js` (line 78). The app currently has no in-page navigation — state is changed via code, not UI. Re-enable `<Menu/>` if you need it.
- **Bundle is committed.** `public/bundle.js` is checked in. After any `src/` change, run `npm run build` and commit the new bundle in the same PR.

## Common edits

- Update resume content → edit `vResumeContent` in `src/data.js`.
- Add a new screen → add a case in the `switch` in `src/Display.js` and a component under `src/components/`.
- Change global look → `public/styles.css` (not the root `style.css`).
