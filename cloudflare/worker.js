// Runs on Cloudflare in front of GitHub Pages. Clients that ask for Markdown
// (Accept: text/markdown) get the homepage as llms.txt and a short Markdown
// "not found" page; everything else passes through unchanged.
const NOT_FOUND = `# Page not found

There's no page at this address on hungryraccoonapp.com.

- [HungryRaccoon home](https://hungryraccoonapp.com/)
- [What HungryRaccoon is, for AI assistants](https://hungryraccoonapp.com/llms.txt)
- [Sitemap](https://hungryraccoonapp.com/sitemap.xml)
`;

function markdown(body, status) {
    return new Response(body, {
        status,
        headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
    });
}

export default {
    async fetch(request) {
        const url = new URL(request.url);
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
