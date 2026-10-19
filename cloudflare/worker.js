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

// The confirmation a first sign-up gets, in the language the page was showing:
// a short personal note from the founder rather than a designed email, so Gmail
// files it with personal mail, not Promotions (owner, 19 Oct). For the same
// reason it has no List-Unsubscribe header; the privacy policy's unsubscribe
// link is the {unsubscribe} line (see unsubscribe()). Replies go to admin@
// until hello@ and privacy@ receive mail (#44).
const CONTACT = "admin@yummersapp.com";
const CONFIRM = {
    en: {
        subject: "Thanks for joining the Yummers beta",
        note: [
            "Hi,",
            "Thanks for signing up for the Yummers beta. I'm Sovithyea, and I'm building Yummers here in Phnom Penh: an app to rate the places you've eaten, keep lists of where to go next, and see where your friends are eating.",
            "We're testing it with a small group on iPhone first. The beta opens in November, and I'll email you an invite as soon as there's a spot for you.",
            "If there's a place you think everyone should try, hit reply and tell me. I read every email.",
        ],
        offList: "Didn't sign up, or changed your mind? {unsubscribe}",
        unsubscribe: "Take me off the list",
        leaveTitle: "Leave the beta list?",
        leaveText: "We'll delete your email address and won't write to you again.",
        leftTitle: "You're off the list.",
        leftText: "Your email address is deleted. Changed your mind? You can sign up again on yummersapp.com.",
    },
    km: {
        subject: "អរគុណដែលបានចូលរួមសាកល្បង Yummers",
        note: [
            "សួស្តី,",
            "អរគុណដែលបានចុះឈ្មោះសាកល្បង Yummers។ ខ្ញុំឈ្មោះ Sovithyea ហើយខ្ញុំកំពុងបង្កើត Yummers នៅទីនេះ ក្នុងទីក្រុងភ្នំពេញ៖ កម្មវិធីសម្រាប់វាយតម្លៃកន្លែងដែលអ្នកបានញ៉ាំ កត់ចំណាំកន្លែងដែលចង់ទៅលើកក្រោយ និងមើលថាមិត្តភក្តិរបស់អ្នកកំពុងញ៉ាំនៅឯណា។",
            "យើងកំពុងសាកល្បងវាជាមួយក្រុមតូចមួយលើ iPhone សិន។ កម្មវិធីសាកល្បងនឹងបើកនៅខែវិច្ឆិកា ហើយខ្ញុំនឹងផ្ញើអ៊ីមែលអញ្ជើញទៅអ្នក ភ្លាមៗនៅពេលមានកន្លែងសម្រាប់អ្នក។",
            "បើមានកន្លែងណាដែលអ្នកគិតថាគ្រប់គ្នាគួរតែសាកល្បង សូមឆ្លើយតបមកប្រាប់ខ្ញុំ។ ខ្ញុំអានរាល់អ៊ីមែល។",
        ],
        offList: "មិនបានចុះឈ្មោះ ឬប្ដូរចិត្ត? {unsubscribe}",
        unsubscribe: "ដកឈ្មោះខ្ញុំចេញពីបញ្ជី",
        leaveTitle: "ចាកចេញពីបញ្ជីសាកល្បង?",
        leaveText: "យើងនឹងលុបអាសយដ្ឋានអ៊ីមែលរបស់អ្នក ហើយនឹងមិនផ្ញើអ៊ីមែលទៅអ្នកទៀតទេ។",
        leftTitle: "អ្នកបានចាកចេញពីបញ្ជីហើយ។",
        leftText: "អាសយដ្ឋានអ៊ីមែលរបស់អ្នកត្រូវបានលុបហើយ។ ប្ដូរចិត្តវិញ? អ្នកអាចចុះឈ្មោះម្ដងទៀតនៅ yummersapp.com។",
    },
    fr: {
        subject: "Merci d'avoir rejoint la bêta Yummers",
        note: [
            "Bonjour,",
            "Merci de vous être inscrit à la bêta de Yummers. Je m'appelle Sovithyea et je construis Yummers ici, à Phnom Penh : une appli pour noter les endroits où vous avez mangé, garder des listes de vos prochaines adresses et voir où mangent vos amis.",
            "Nous la testons d'abord sur iPhone avec un petit groupe. La bêta ouvre en novembre, et je vous enverrai une invitation dès qu'il y aura une place pour vous.",
            "S'il y a un endroit que tout le monde devrait essayer selon vous, répondez à cet e-mail pour me le dire. Je lis tous les e-mails.",
        ],
        offList: "Vous ne vous êtes pas inscrit, ou vous avez changé d'avis ? {unsubscribe}",
        unsubscribe: "Me retirer de la liste",
        leaveTitle: "Quitter la liste de la bêta ?",
        leaveText: "Nous supprimerons votre adresse e-mail et ne vous écrirons plus.",
        leftTitle: "C'est fait, vous n'êtes plus sur la liste.",
        leftText: "Votre adresse e-mail est supprimée. Vous avez changé d'avis ? Vous pouvez vous réinscrire sur yummersapp.com.",
    },
};

function confirmText(t, unsub) {
    return `${t.note.join("\n\n")}

Sovithyea
Yummers · https://yummersapp.com

${t.offList.replace("{unsubscribe}", `${t.unsubscribe}: ${unsub}`)}
`;
}

// Plain paragraphs, like a note typed in a mail app: no images, banner or button.
function confirmHtml(t, lang, unsub) {
    const p = (text, style = "") => `<p style="margin:0 0 16px;${style}">${text}</p>`;
    const link = "color:#A83618;";
    return `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${t.subject}</title></head>
<body style="margin:0;padding:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#2C2420;">
<div style="max-width:560px;">
${t.note.map(s => p(s)).join("\n")}
${p(`Sovithyea<br>Yummers · <a href="https://yummersapp.com" style="${link}">yummersapp.com</a>`)}
${p(t.offList.replace("{unsubscribe}", `<a href="${unsub}" style="${link}">${t.unsubscribe}</a>`), "margin-top:28px;font-size:13px;color:#8A7D70;")}
</div>
</body>
</html>`;
}

function resendApi(env, method, path, body) {
    return fetch(`https://api.resend.com${path}`, {
        method,
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: body && JSON.stringify(body),
    });
}

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

    const resend = (path, body) => resendApi(env, "POST", path, body);
    // Resend's create also answers OK for an existing contact (same id), so look the
    // address up first: an existing one is only added to the segment, and not emailed.
    const exists = (await resendApi(env, "GET", `/contacts/${encodeURIComponent(email)}`)).ok;
    const res = exists
        ? await resend(`/contacts/${encodeURIComponent(email)}/segments/${env.SEGMENT_ID}`, {})
        : await resend("/contacts", { email, segments: [{ id: env.SEGMENT_ID }] });
    const created = !exists && res.ok;
    const saved = res.ok;
    // Only a new contact is emailed, so signing someone up again can't send them repeat mail.
    // The send runs after the reply, and a failed send doesn't fail the sign-up.
    if (created) ctx.waitUntil(res.json().then(({ id }) => {
        const lang = String(form.get("lang"));
        const known = Object.hasOwn(CONFIRM, lang);
        const t = known ? CONFIRM[lang] : CONFIRM.en;
        // The contact's id is the unsubscribe link's key: only this email carries it.
        const unsub = `https://yummersapp.com/api/unsubscribe?id=${id}&lang=${known ? lang : "en"}`;
        return resend("/emails", {
            from: "Sovithyea from Yummers <sovithyea@mail.yummersapp.com>",
            to: email,
            reply_to: CONTACT,
            subject: t.subject,
            html: confirmHtml(t, known ? lang : "en", unsub),
            text: confirmText(t, unsub),
        });
    }));
    return new Response(null, { status: saved ? 204 : 502 });
}

// The confirmation email's unsubscribe link. Opening it (GET) only asks, because
// mail scanners open links on their own; the button POSTs, which deletes the
// contact outright.
async function unsubscribe(request, env, url) {
    const lang = url.searchParams.get("lang");
    const known = Object.hasOwn(CONFIRM, lang);
    const t = known ? CONFIRM[lang] : CONFIRM.en;
    const id = url.searchParams.get("id") || "";
    const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);
    let title = t.leaveTitle, text = t.leaveText, button = valid;
    if (request.method === "POST") {
        const res = valid ? await resendApi(env, "DELETE", `/contacts/${id}`) : null;
        // Already gone (404) counts as done: the link may be pressed twice.
        if (!res || !(res.ok || res.status === 404)) return new Response(null, { status: valid ? 502 : 400 });
        title = t.leftTitle; text = t.leftText; button = false;
    }
    const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    return new Response(`<!doctype html>
<html lang="${known ? lang : "en"}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="margin:0;padding:48px 16px;background:#F5F0E8;font-family:${font};color:#2C2420;text-align:center;">
  <img src="/assets/logo.png" width="64" height="64" alt="Yummers" style="border-radius:16px;">
  <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.4;margin:20px 0 8px;">${title}</h1>
  <p style="font-size:16px;line-height:1.5;color:#665A4E;max-width:420px;margin:0 auto 24px;">${text}</p>
  ${button ? `<form method="post"><button style="font:600 15px ${font};background:#A83618;color:#fff;border:0;border-radius:999px;padding:13px 24px;cursor:pointer;">${t.unsubscribe}</button></form>` : `<a href="/" style="color:#A83618;font-weight:600;text-decoration:none;">yummersapp.com</a>`}
</body>
</html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname === "/api/signup" && request.method === "POST") return signup(request, env, ctx);
        if (url.pathname === "/api/unsubscribe") return unsubscribe(request, env, url);
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
