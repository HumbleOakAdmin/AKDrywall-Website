# A&K Drywall website preview

Static GitHub Pages mock of the live site at [akdrywall.ca](https://akdrywall.ca/). The pages, styles, logo, and icons were copied from that site on 24 November 2026 so the layout can be reviewed here before anything replaces the live site.

This preview is marked `noindex`. Quote forms stay on the page and show a confirmation, but they do not email the office. Real inquiries still go through [akdrywall.ca](https://akdrywall.ca/).

## Pages

- `index.html` — home, services ticker, quote request
- `about.html`
- `sectors.html`
- `services.html`
- `projects.html`
- `approach.html`
- `safety.html`
- `contact.html`

## Publish

The repository is public and Pages is not turned on yet. `.github/workflows/pages.yml` publishes the site root when `main` is pushed, after Pages is set to use GitHub Actions.

1. Push this project to `main`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

The first push may only register the workflow. If the site does not appear, run **Deploy GitHub Pages** from the Actions tab.

The site will be served at:

`https://humbleoakadmin.github.io/AKDrywall-Website/`

Do not add a `CNAME` for `akdrywall.ca` until the preview is approved to replace the live site. GitHub Pages cannot run the live site's `send-inquiry.php` form.

## Local check

Open `index.html` in a browser, or from this folder run a static server and walk Home, Services, Projects, and Contact.
