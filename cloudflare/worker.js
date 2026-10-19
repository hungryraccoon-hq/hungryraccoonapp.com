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
// The privacy policy promises every email an unsubscribe link, hence offList
// and the List-Unsubscribe headers (see unsubscribe()). admin@ until hello@ and privacy@ receive
// mail (#44). The layout matches the app's sign-in emails (supabase/templates).
const CONTACT = "admin@yummersapp.com";
const CONFIRM = {
    en: {
        subject: "You're on the Yummers beta list",
        badge: "iPhone beta",
        heading: "You're on the list!",
        thanks: "Thanks for signing up for the Yummers beta.",
        about: "Yummers is a food diary you share with friends: rate the places you've eaten, make lists, and see what your friends are loving.",
        nextTitle: "What happens next",
        steps: [
            "We're testing with a small group in Phnom Penh first.",
            "The beta opens in November, on iPhone only.",
            "We'll email you an invite with a link to install it through TestFlight.",
        ],
        button: "Take a peek inside",
        offList: "We'll only use this address for the beta. Didn't sign up, or changed your mind? {unsubscribe}.",
        unsubscribe: "Take me off the list",
        leaveTitle: "Leave the beta list?",
        leaveText: "We'll delete your email address and won't write to you again.",
        leftTitle: "You're off the list.",
        leftText: "Your email address is deleted. Changed your mind? You can sign up again on yummersapp.com.",
        team: "The Yummers team",
        footer: "Made for Phnom Penh. And your appetite.",
        privacy: "Privacy",
    },
    km: {
        subject: "អ្នកមានឈ្មោះក្នុងបញ្ជីសាកល្បង Yummers ហើយ",
        badge: "សាកល្បងលើ iPhone",
        heading: "អ្នកមានឈ្មោះក្នុងបញ្ជីហើយ!",
        thanks: "អរគុណដែលបានចុះឈ្មោះសាកល្បង Yummers។",
        about: "Yummers ជាសៀវភៅកត់ត្រាអាហារ ដែលអាចចែករំលែកជាមួយមិត្តភក្តិ៖ វាយតម្លៃកន្លែងដែលអ្នកបានញ៉ាំ បង្កើតបញ្ជី ហើយមើលថាមិត្តភក្តិកំពុងតែចូលចិត្តអ្វី។",
        nextTitle: "អ្វីដែលនឹងកើតឡើងបន្ទាប់",
        steps: [
            "យើងកំពុងសាកល្បងជាមួយក្រុមតូចមួយនៅភ្នំពេញសិន។",
            "កម្មវិធីសាកល្បងនឹងបើកនៅខែវិច្ឆិកា សម្រាប់តែ iPhone ប៉ុណ្ណោះ។",
            "យើងនឹងផ្ញើអ៊ីមែលអញ្ជើញទៅអ្នក ជាមួយតំណសម្រាប់ដំឡើងតាម TestFlight។",
        ],
        button: "ចូលមើលបន្តិចមក",
        offList: "យើងនឹងប្រើអាសយដ្ឋាននេះតែសម្រាប់កម្មវិធីសាកល្បងប៉ុណ្ណោះ។ មិនបានចុះឈ្មោះ ឬប្ដូរចិត្ត? {unsubscribe}។",
        unsubscribe: "ដកឈ្មោះខ្ញុំចេញពីបញ្ជី",
        leaveTitle: "ចាកចេញពីបញ្ជីសាកល្បង?",
        leaveText: "យើងនឹងលុបអាសយដ្ឋានអ៊ីមែលរបស់អ្នក ហើយនឹងមិនផ្ញើអ៊ីមែលទៅអ្នកទៀតទេ។",
        leftTitle: "អ្នកបានចាកចេញពីបញ្ជីហើយ។",
        leftText: "អាសយដ្ឋានអ៊ីមែលរបស់អ្នកត្រូវបានលុបហើយ។ ប្ដូរចិត្តវិញ? អ្នកអាចចុះឈ្មោះម្ដងទៀតនៅ yummersapp.com។",
        team: "ក្រុមការងារ Yummers",
        footer: "បង្កើតឡើងសម្រាប់ភ្នំពេញ និងចំណង់អាហាររបស់អ្នក",
        privacy: "ឯកជនភាព",
    },
    fr: {
        subject: "Vous êtes sur la liste de la bêta Yummers",
        badge: "Bêta iPhone",
        heading: "C'est noté, vous êtes sur la liste !",
        thanks: "Merci de vous être inscrit à la bêta de Yummers.",
        about: "Yummers est un carnet culinaire à partager : notez les endroits où vous avez mangé, faites des listes et découvrez ce que vos amis adorent.",
        nextTitle: "La suite",
        steps: [
            "Nous testons d'abord avec un petit groupe à Phnom Penh.",
            "La bêta ouvre en novembre, sur iPhone uniquement.",
            "Nous vous enverrons une invitation par e-mail, avec un lien pour l'installer via TestFlight.",
        ],
        button: "Jetez un œil",
        offList: "Nous n'utiliserons cette adresse que pour la bêta. Vous ne vous êtes pas inscrit, ou vous avez changé d'avis ? {unsubscribe}.",
        unsubscribe: "Me retirer de la liste",
        leaveTitle: "Quitter la liste de la bêta ?",
        leaveText: "Nous supprimerons votre adresse e-mail et ne vous écrirons plus.",
        leftTitle: "C'est fait, vous n'êtes plus sur la liste.",
        leftText: "Votre adresse e-mail est supprimée. Vous avez changé d'avis ? Vous pouvez vous réinscrire sur yummersapp.com.",
        team: "L'équipe Yummers",
        footer: "Fait pour Phnom Penh. Et pour votre appétit.",
        privacy: "Confidentialité",
    },
};

function confirmText(t, unsub) {
    return `${t.heading}

${t.thanks}

${t.about}

${t.nextTitle}:
${t.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

${t.button}: https://yummersapp.com

${t.offList.replace("{unsubscribe}", `${t.unsubscribe}: ${unsub}`)}

${t.team}
`;
}

// Inline styles and tables, because email apps ignore most CSS.
function confirmHtml(t, lang, unsub) {
    const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
    const link = "color:#A83618;text-decoration:none;font-weight:600;";
    const steps = t.steps.map((s, i) => `
              <tr><td valign="top" width="36" style="padding:6px 0;"><div style="width:26px;height:26px;line-height:26px;border-radius:13px;background:#A83618;color:#FFFFFF;font-size:13px;font-weight:700;text-align:center;">${i + 1}</div></td>
                <td style="padding:8px 0;font-size:15px;line-height:1.5;color:#2C2420;">${s}</td></tr>`).join("");
    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${t.subject}</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${t.thanks}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F0E8;">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;table-layout:fixed;">
      <tr><td align="center" style="padding-bottom:20px;">
        <img src="https://yummersapp.com/assets/logo.png" width="64" height="64" alt="Yummers" style="display:block;border:0;border-radius:16px;">
      </td></tr>
      <tr><td style="background:#FFFFFF;border:1px solid #E4D9C6;border-radius:20px;overflow:hidden;font-family:${font};color:#2C2420;">
        <img src="https://yummersapp.com/assets/share.jpg" width="480" alt="" style="display:block;width:100%;height:auto;border:0;">
        <div style="padding:28px 28px 32px;">
          <div style="display:inline-block;background:#FEF3EC;border:1px solid #F3D3C2;border-radius:999px;padding:4px 12px;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:600;color:#A83618;">${t.badge}</div>
          <h1 style="margin:14px 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.4;font-weight:700;color:#2C2420;">${t.heading}</h1>
          <p style="margin:0 0 12px;font-size:16px;line-height:1.5;color:#2C2420;">${t.thanks}</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:#665A4E;">${t.about}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="background:#FEF3EC;border:1px solid #F3D3C2;border-radius:14px;padding:18px 18px 12px;">
              <div style="font-size:13px;line-height:1;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;color:#A83618;padding-bottom:8px;">${t.nextTitle}</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${steps}
              </table>
            </td></tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 0;">
            <tr><td style="background:#A83618;border-radius:999px;">
              <a href="https://yummersapp.com" style="display:inline-block;padding:13px 24px;font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;">${t.button} &rarr;</a>
            </td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:16px;line-height:1.5;color:#2C2420;">${t.team}</p>
          <p style="margin:20px 0 0;font-size:14px;line-height:1.5;color:#8A7D70;">${t.offList.replace("{unsubscribe}", `<a href="${unsub}" style="${link}">${t.unsubscribe}</a>`)}</p>
        </div>
      </td></tr>
      <tr><td align="center" style="padding:20px 8px 0;font-family:${font};font-size:13px;line-height:1.5;color:#8A7D70;">
        Yummers · ${t.footer}<br>
        <a href="https://yummersapp.com" style="color:#A83618;text-decoration:none;">yummersapp.com</a> · <a href="https://yummersapp.com/privacy#beta-sign-up" style="color:#A83618;text-decoration:none;">${t.privacy}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
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
    // Signing up twice fails to create the contact, so add the existing one to the segment.
    const res = await resend("/contacts", { email, segments: [{ id: env.SEGMENT_ID }] });
    const created = res.ok;
    const saved = created
        || (await resend(`/contacts/${encodeURIComponent(email)}/segments/${env.SEGMENT_ID}`, {})).ok;
    // Only a new contact is emailed, so signing someone up again can't send them repeat mail.
    // The send runs after the reply, and a failed send doesn't fail the sign-up.
    if (created) ctx.waitUntil(res.json().then(({ id }) => {
        const lang = String(form.get("lang"));
        const known = Object.hasOwn(CONFIRM, lang);
        const t = known ? CONFIRM[lang] : CONFIRM.en;
        // The contact's id is the unsubscribe link's key: only this email carries it.
        const unsub = `https://yummersapp.com/api/unsubscribe?id=${id}&lang=${known ? lang : "en"}`;
        return resend("/emails", {
            from: "Yummers <noreply@mail.yummersapp.com>",
            to: email,
            reply_to: CONTACT,
            subject: t.subject,
            html: confirmHtml(t, known ? lang : "en", unsub),
            text: confirmText(t, unsub),
            headers: {
                "List-Unsubscribe": `<${unsub}>, <mailto:${CONTACT}?subject=Unsubscribe>`,
                "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
        });
    }));
    return new Response(null, { status: saved ? 204 : 502 });
}

// The confirmation email's unsubscribe link. Opening it (GET) only asks, because
// mail scanners open links on their own; the button, or a mail app's one-click
// Unsubscribe (RFC 8058), POSTs, which deletes the contact outright.
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
