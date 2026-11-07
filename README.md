# maksforge.com

The MaksForge site at [maksforge.com](https://maksforge.com), hosted on Cloudflare (Workers static assets).

It is the home page here plus every app's site: each public `maks-sredniawa` repo whose `docs/_config.yml` uses `remote_theme: maks-sredniawa/pages-theme` is built with Jekyll and published at `maksforge.com/<repo>/`. A new app needs nothing beyond that config.

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, and every 15 minutes checks the app repos and the theme for changes. It needs the `CLOUDFLARE_API_TOKEN` secret and the `CLOUDFLARE_ACCOUNT_ID` variable.

To preview the home page alone, run `python3 -m http.server` here and open <http://localhost:8000>. To build the whole site locally:

```bash
bundle install
scripts/build.sh $(scripts/apps.sh)
npx wrangler dev
```
