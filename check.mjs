// Checks what AI agents look for on the site: llms.txt, the About and Contact
// pages, the homepage's Organization data and the sitemap.
// Usage: node check.mjs [base URL]   (default: the live site)
const base = (process.argv[2] || "https://hungryraccoonapp.com").replace(/\/$/, "");
let failed = 0;

function check(name, ok) {
    console.log(`${ok ? "ok  " : "FAIL"} ${name}`);
    if (!ok) failed++;
}

async function get(path) {
    const res = await fetch(base + path);
    return { status: res.status, type: res.headers.get("content-type") || "", body: await res.text() };
}

const text = (html) => html.replace(/<(script|style)[\s\S]*?<\/\1>|<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const llms = await get("/llms.txt");
check("llms.txt is served as text", llms.status === 200 && llms.type.startsWith("text/plain"));
check("llms.txt has an H1, a summary and a When to use section",
    /^# \S/.test(llms.body) && /^> \S/m.test(llms.body) && /^## When to use$/m.test(llms.body));

for (const page of ["/about.html", "/contact.html", "/privacy.html"]) {
    const { status, body } = await get(page);
    check(`${page} has 500+ characters of text`, status === 200 && text(body.split("<main")[1] || "").length >= 500);
}

const home = await get("/");
const graph = JSON.parse(home.body.match(/application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
const org = graph.find((x) => x["@type"] === "Organization");
check("Organization has a description", !!org?.description);
check("Organization has a contactPoint with an email and contactType",
    !!(org?.contactPoint?.email && org.contactPoint.contactType));

const sitemap = await get("/sitemap.xml");
const urls = [...sitemap.body.matchAll(/<loc>https:\/\/hungryraccoonapp\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
check("sitemap lists the About and Contact pages", urls.includes("/about.html") && urls.includes("/contact.html"));
for (const path of urls) check(`sitemap URL ${path} responds 200`, (await get(path)).status === 200);

const footer = home.body.match(/<nav class="footer-links"[\s\S]*?<\/nav>/)[0];
for (const [, href] of footer.matchAll(/href="([^"]+)"/g)) {
    check(`footer link ${href} responds 200`, (await get("/" + href.replace(/^\//, ""))).status === 200);
}

const missing = await get("/no-such-page");
check("an unknown path still returns 404", missing.status === 404);

process.exit(failed ? 1 : 0);
