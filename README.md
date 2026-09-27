# hungryraccoonapp.com

The public website for **HungryRaccoon**, a restaurant discovery app for Phnom Penh that is still in the making.

This is a plain static page: HTML, CSS, fonts and images. It has no build step and no backend, and it is served by GitHub Pages on `hungryraccoonapp.com`. It has no download links, email collection or analytics.

The app itself lives in a separate private repository. This repo holds only what the public site needs.

## Editing

Open `index.html` in a browser, or run `python3 -m http.server` here and visit http://localhost:8000. Every push to `main` publishes.

## What's in it

| File | What it is |
|---|---|
| `index.html`, `style.css` | The page |
| `fonts.css`, `assets/font-*.ttf` | DM Sans and Fraunces, from Google Fonts (SIL Open Font License) |
| `assets/logo.png` | The raccoon logo |
| `assets/food.jpg` | AI-generated illustrative food image, not a photo of a real restaurant's dish |
| `assets/app-home.jpg` | The native app's home screen, captured from the iOS Simulator on 27 September 2026 and edited: the cuisine tiles and two cards carry photos taken from the 14 September web screenshot, the For you rail is relabelled Popular with the two places (and their ratings) that led Popular in that screenshot, the Expo dev-tools button is painted out, and the clock reads 9:41 |
| `CNAME` | Tells GitHub Pages the custom domain |

## Known issue

`assets/app-home.jpg` contains restaurant photos that came from the Google Places API (reused from the earlier screenshot it replaced). Google's terms restrict storing and republishing Places photos, and the app stopped serving them for that reason (decision D33 in the app repo). The owner chose to keep this image for now. Replace them with the project's own photographs before any wider launch.
