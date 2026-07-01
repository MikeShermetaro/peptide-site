# Peptide Dosage Demo — Static Site (GitHub Pages + Dash0 RUM & Synthetics)

A static version of the peptide demo, meant to run on **GitHub Pages** so it has a
public HTTPS URL that **Dash0 synthetic checks** can reach, plus **Dash0 real-user
monitoring (RUM)** baked into every page.

This is separate from the Kubernetes app — that keeps running as your "backend
OpenTelemetry" story. This site is your "public endpoint + synthetics + RUM" story.

> Demo/educational content only. Dosing figures are illustrative; not medical guidance.

## Files

Flat HTML — no build step, no server. `index.html`, `single-peptides.html`,
`blends.html`, `calculator.html`, `protocol-*.html`, plus `styles.css`, `app.js`
(client-side calculator), and `dash0-rum.js` (RUM init).

---

## Step 1 — Create a website-only Dash0 token (important)

The RUM token ships inside the public page, so it must be locked down:

1. Dash0 → **Settings → Auth Tokens** → **Create token**
2. Permission: **Ingesting only**
3. Dataset: limit to a single dataset (e.g. `default` or a new `website` dataset)
4. Copy the token.

Then open `dash0-rum.js` and replace `WEBSITE_INGEST_TOKEN` with it. Endpoint is
already set to `https://ingress.us-west-2.aws.dash0.com/v1/traces` (us-west-2).

Do **not** paste your main/private auth token here.

## Step 2 — Push to a new GitHub repo

In Terminal, from this folder:

```bash
cd "/Users/shermetaro/Claude/Projects/My Resume and Job Applications/peptide-site"
git init
git add .
git commit -m "Static peptide site with Dash0 RUM"
git branch -M main
```

Create a new repo on GitHub (e.g. `peptide-site`) — empty, no README — then:

```bash
git remote add origin https://github.com/MikeShermetaro/peptide-site.git
git push -u origin main
```

## Step 3 — Turn on GitHub Pages

1. Repo → **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, folder **/ (root)** → **Save**
4. Wait ~1 minute. Pages shows your live URL, e.g.
   `https://mikeshermetaro.github.io/peptide-site/`

Open that URL, click around, run a calculation. Within ~30s the site should appear
in Dash0 under **Websites** (real-user monitoring). If it doesn't, open the browser
dev console — a 401/403 to the ingress endpoint means the token/permissions are off.

## Step 4 — Create a Dash0 synthetic check

1. Dash0 → **Synthetics** → **Create check**
2. **Target URL:** your Pages URL from Step 3
3. Add an assertion: HTTP status **200** (optionally assert body contains
   `Peptide Dosage`)
4. Pick location(s) — e.g. Oregon — and a schedule (e.g. every 1–5 min)
5. Save. Dash0 now checks availability from outside and tracks uptime + SSL expiry.

To demo a failure: temporarily disable Pages (Settings → Pages → set source to None),
watch the check go red, then re-enable.

---

## Talking point

You now cover three Dash0 surfaces end-to-end: **backend OTEL** (the Kubernetes
app), **frontend RUM** (this site's Web SDK), and **synthetic uptime** (external
checks against this site). That's the full picture a customer would run — exactly
the workflow you'd help customers adopt.
