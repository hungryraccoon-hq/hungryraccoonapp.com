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
| `assets/earlier-home.png` | Screenshot of an earlier app design (14 September 2026), shown in the phone and labelled as an earlier preview |
| `CNAME` | Tells GitHub Pages the custom domain |

## Known issue

`assets/earlier-home.png` contains restaurant photos that came from the Google Places API. Google's terms restrict storing and republishing Places photos, and the app stopped serving them for that reason (decision D33 in the app repo). The owner chose to keep this image for now. Replace it with a screenshot that has no Google photos before any wider launch.
