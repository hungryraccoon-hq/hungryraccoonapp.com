// Runs on Cloudflare in front of GitHub Pages. Clients that ask for Markdown
// (Accept: text/markdown) get the homepage as llms.txt and a short Markdown
// "not found" page; POST /api/signup saves a beta sign-up; everything else
// passes through unchanged.
const NOT_FOUND = `# Page not found

There's no page at this address on yummersapp.com.

- [Yummers home](https://yummersapp.com/)
- [What Yummers is, for AI assistants](https://yummersapp.com/llms.txt)
- [Sitemap](https://yummersapp.com/sitemap.xml)
`;

function markdown(body, status) {
    return new Response(body, {
        status,
        headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
    });
}

// The homepage's beta sign-up form. Checks the Turnstile token, then saves the
// email as a Resend contact in the beta sign-up segment.
async function signup(request, env) {
    const form = await request.formData().catch(() => null);
    const email = String(form?.get("email") || "").trim().toLowerCase();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(null, { status: 400 });
    }

    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET,
            response: String(form.get("cf-turnstile-response") || ""),
            remoteip: request.headers.get("CF-Connecting-IP") || "",
        }),
    });
    if (!(await check.json()).success) return new Response(null, { status: 403 });

    const resend = (path, body) => fetch(`https://api.resend.com${path}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    // Signing up twice fails to create the contact, so add the existing one to the segment.
    const saved = (await resend("/contacts", { email, segments: [{ id: env.SEGMENT_ID }] })).ok
        || (await resend(`/contacts/${encodeURIComponent(email)}/segments/${env.SEGMENT_ID}`, {})).ok;
    return new Response(null, { status: saved ? 204 : 502 });
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname === "/api/signup" && request.method === "POST") return signup(request, env);
        const wantsMarkdown = (request.headers.get("Accept") || "").includes("text/markdown");

        if (wantsMarkdown && url.pathname === "/") {
            const llms = await fetch(new URL("/llms.txt", url));
            return markdown(await llms.text(), llms.status);
        }

        const res = await fetch(request);
        // Share links (/l/...) are rendered by 404.html, so they arrive as 404s
        // but are real pages.
        if (wantsMarkdown && res.status === 404 && !url.pathname.startsWith("/l/")) {
            return markdown(NOT_FOUND, 404);
        }
        const out = new Response(res.body, res);
        out.headers.append("Vary", "Accept");
        return out;
    },
};
