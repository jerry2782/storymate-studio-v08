# STORYMATE STUDIO V0.8.5.0 — Release Candidate

Mobile-first PWA for story development and AI film-production prompt preparation.

## V0.8.5.0 maintenance notes

- Align visible app version labels, runtime `APP_VERSION`, and the service-worker cache namespace on V0.8.5.0.
- Scope Story Blueprint output element IDs to each story record to prevent ambiguous DOM lookups as the renderer evolves.
- Preserve existing local storage keys and backup schema; this release does not reset or migrate user data.

## Current release status

This is an active release candidate, **not yet declared production-ready**. It has passed source syntax checks and targeted browser interaction tests, but still requires testing on the actual Android Chrome/PWA installation and a real HTTPS deployment before public release.

## Included files

- `index.html` — application
- `manifest.webmanifest` — PWA manifest
- `sw.js` — offline app-shell service worker
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — PWA icons

## Core behavior

- Browser-local data storage with IndexedDB and legacy localStorage migration
- Full JSON backup and restore with validation and rollback attempt; individual Project Backup and Project Restore preserving unrelated projects
- Character Bible with canonical Permanent Character DNA and separate reusable variations
- Asset Library with character/project references
- Scene Builder with project, location, cast, dialogue and story-beat IDs
- Image/video prompt builders that consume Character Bible, variations, Location DNA, assets and scene details

## Important limitations

- Data is local to the browser origin/device. There is no cloud sync or multi-device account system.
- Image/video generation is not performed by this static PWA. It prepares prompts and records jobs; provider API integration requires a secure backend.
- End-to-end Android HTTPS/PWA verification still requires a real deployment and device test. Project-level backup/restore is included and has passed automated browser tests for linked-data export, target replacement, unrelated-project preservation, and rollback on simulated write failure.

## Deploy for final testing

Upload the contents of this folder to the root of a GitHub repository and enable GitHub Pages on the `main` branch/root. Test the deployed HTTPS URL in Android Chrome before relying on it for real production work. Keep regular JSON backups.
