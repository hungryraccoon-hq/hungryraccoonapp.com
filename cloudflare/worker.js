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

// The confirmation a first sign-up gets, in the language the page was showing.
// The privacy policy promises every email a way off the list, hence the
// admin@ line and the List-Unsubscribe header. admin@ until hello@ and privacy@
// receive mail (#42).
const CONFIRM = {
    en: {
        subject: "You're on the Yummers beta list",
        text: `Hi,

Thanks for signing up for the Yummers beta. You're on the list!

Yummers is a food diary you share with friends: rate the places you've eaten, make lists, and see what your friends are loving. We're testing it on iPhone with a small group in Phnom Penh first, and we'll email you when your invite is ready.

We'll only use this address for the beta. Didn't sign up, or want off the list? Email admin@yummersapp.com and we'll take you off.

The Yummers team
https://yummersapp.com
`,
    },
    km: {
        subject: "អ្នកមានឈ្មោះក្នុងបញ្ជីសាកល្បង Yummers ហើយ",
        text: `សួស្តី,

អរគុណដែលបានចុះឈ្មោះសាកល្បង Yummers។ អ្នកមានឈ្មោះក្នុងបញ្ជីហើយ!

Yummers ជាសៀវភៅកត់ត្រាអាហារ ដែលអាចចែករំលែកជាមួយមិត្តភក្តិ៖ វាយតម្លៃកន្លែងដែលអ្នកបានញ៉ាំ បង្កើតបញ្ជី ហើយមើលថាមិត្តភក្តិកំពុងតែចូលចិត្តអ្វី។ យើងកំពុងសាកល្បងវាលើ iPhone ជាមួយក្រុមតូចមួយនៅភ្នំពេញសិន ហើយយើងនឹងផ្ញើអ៊ីមែលទៅអ្នក នៅពេលការអញ្ជើញរបស់អ្នករួចរាល់។

យើងនឹងប្រើអាសយដ្ឋាននេះតែសម្រាប់កម្មវិធីសាកល្បងប៉ុណ្ណោះ។ មិនបានចុះឈ្មោះ ឬចង់ដកឈ្មោះចេញពីបញ្ជី? សូមផ្ញើអ៊ីមែលមក admin@yummersapp.com ហើយយើងនឹងដកឈ្មោះអ្នកចេញ។

ក្រុមការងារ Yummers
https://yummersapp.com
`,
    },
    fr: {
        subject: "Vous êtes sur la liste de la bêta Yummers",
        text: `Bonjour,

Merci de vous être inscrit à la bêta de Yummers. C'est noté, vous êtes sur la liste !

Yummers est un carnet culinaire à partager : notez les endroits où vous avez mangé, faites des listes et découvrez ce que vos amis adorent. Nous le testons d'abord sur iPhone avec un petit groupe à Phnom Penh, et nous vous écrirons dès que votre invitation sera prête.

Nous n'utiliserons cette adresse que pour la bêta. Vous ne vous êtes pas inscrit, ou vous voulez quitter la liste ? Écrivez à admin@yummersapp.com et nous vous retirerons.

L'équipe Yummers
https://yummersapp.com
`,
    },
};

// The homepage's beta sign-up form. Checks the Turnstile token, saves the
// email as a Resend contact in the beta sign-up segment, and emails a first
// sign-up a confirmation.
async function signup(request, env, ctx) {
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
    const created = (await resend("/contacts", { email, segments: [{ id: env.SEGMENT_ID }] })).ok;
    const saved = created
        || (await resend(`/contacts/${encodeURIComponent(email)}/segments/${env.SEGMENT_ID}`, {})).ok;
    // Only a new contact is emailed, so signing someone up again can't send them repeat mail.
    // The send runs after the reply, and a failed send doesn't fail the sign-up.
    if (created) {
        const lang = String(form.get("lang"));
        const mail = Object.hasOwn(CONFIRM, lang) ? CONFIRM[lang] : CONFIRM.en;
        ctx.waitUntil(resend("/emails", {
            from: "Yummers <noreply@mail.yummersapp.com>",
            to: email,
            reply_to: "admin@yummersapp.com",
            subject: mail.subject,
            text: mail.text,
            headers: { "List-Unsubscribe": "<mailto:admin@yummersapp.com?subject=Unsubscribe>" },
        }));
    }
    return new Response(null, { status: saved ? 204 : 502 });
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname === "/api/signup" && request.method === "POST") return signup(request, env, ctx);
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
