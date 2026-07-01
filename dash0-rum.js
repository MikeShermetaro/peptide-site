// Dash0 Web SDK (Real User Monitoring) initialization.
//
// IMPORTANT — this file is PUBLIC once deployed to GitHub Pages, so the token
// below is visible to anyone. That is expected for RUM, but you MUST use a
// dedicated token that can ONLY ingest into ONE dataset:
//   1. Dash0 -> Settings -> Auth Tokens -> create a NEW token
//   2. Limit its permission to "Ingesting" only
//   3. Limit it to a single dataset (e.g. "website" or "default")
//   4. Paste it below as WEBSITE_INGEST_TOKEN
// Do NOT reuse your main/private auth token here.

(function (d, a, h, z) {
  d[a] ||
    ((z = d[a] = function () { h.push(arguments); }), (z._t = new Date()), (z._v = 1), (h = z._q = []));
})(window, "dash0");

dash0("init", {
  serviceName: "peptide-site",
  endpoint: {
    // us-west-2 region BASE endpoint — the SDK appends /v1/traces, /v1/logs itself.
    // Do NOT add a path here or you get a doubled path and 404s.
    url: "https://ingress.us-west-2.aws.dash0.com",
    authToken: "auth_HFQKTqkgSRfASSoAU1DBdmTWAaVK5dEV", // ingest-only website token
  },
  additionalSignalAttributes: {
    "deployment.environment.name": "production",
    "deployment.name": "github-pages",
  },
  sessionInactivityTimeoutMillis: 30 * 60 * 1000, // 30 min
  sessionTerminationTimeoutMillis: 4 * 60 * 60 * 1000, // 4 hours
});
