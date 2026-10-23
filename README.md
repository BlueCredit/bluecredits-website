# bluecredits_website

BlueCredit company website, https://www.bluecredits.org. Plain static HTML/CSS/JS: no build step, no server code, no environment variables.

## Layout
| Path | What it is |
|---|---|
| `index.html` | Home: hero + promo video, BlueCredit Platform section (Atlas, Hydro, Flow, Project, Marketplace; Plume = Risk Assessment; Cloud = Connect) |
| `capabilities.html`, `industries.html`, `past-performance.html` | Consulting |
| `research.html`, `newsroom.html` | Research and news (LinkedIn posts listed in `assets/linkedin-posts.js`) |
| `partnerships.html`, `investors.html`, `careers.html` | Collaborate (forms post to Formspree) |
| `assets/` | Images, `light.css`, `mobile.css` + `mobile.js` (phone menu), `bc-apps.js` (9-dot BlueCredit app launcher), PDFs |
| `assets/apps/` | App icons used in the Platform section |
| `assets/video/` | `bluecredit-promo.mp4` and its poster image |
| `CNAME` | Custom domain |
| `tests/smoke_test.py` | Smoke test (below) |

Every page shares the same nav (Solutions mega menu, Consulting, Research, Collaborate, Newsroom, app launcher, Sign in) and footer. When you change the nav or footer, change it on every page.

## House rules
- Contact shown on pages is support@bluecredits.org. No personal email and no street address on any page.
- After changing `assets/*.css` or `assets/*.js`, bump its `?v=` cache-buster on every page that loads it.

## Run locally and test
```
python3 -m http.server 8080
python3 tests/smoke_test.py http://localhost:8080
```
The smoke test checks that every page loads and that every local file a page references (images, CSS, JS, PDFs, video) exists.

## Deploy
`.github/workflows/deploy.yml` deploys on push to `main` by running `/opt/bluecredits/deploy-website.sh` on the server over SSH (repository secrets `CONTABO_HOST`, `CONTABO_USER`, `CONTABO_SSH_KEY`), then checks that https://bluecredits.org responds.
The `Dockerfile`, `cloudbuild.yaml` and `.dockerignore` are left over from an old Cloud Run setup and are not used (no Docker).
