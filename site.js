// In-page links (How it works, Take a peek inside, Back to the top, ...)
// scroll to their section without adding #preview, #launch and so on to the
// address bar, so the link stays yummersapp.com/ (plus ?lang= when a
// language is picked). Without this script the links still work as normal
// anchors.
(function () {
    function go(target) {
        if (!target) {
            window.scrollTo({ top: 0 });
            return;
        }
        target.scrollIntoView();
        // Move keyboard focus too, as following a real anchor would, so the
        // skip link and Back to the top still help keyboard and screen reader users.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
    }

    document.addEventListener("click", function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var link = e.target.closest && e.target.closest('a[href^="#"]');
        if (!link) return;
        var id = link.getAttribute("href").slice(1);
        var target = id ? document.getElementById(id) : null;
        if (id && !target) return;
        e.preventDefault();
        go(target);
    });

    // A link from another page (/#launch on the privacy page's Join button, or
    // an old shared link) lands on its section; the # is then dropped from the
    // address bar. This script runs before the browser's own jump to the #, and
    // dropping it cancels that jump, so scroll here instead.
    if (location.hash) {
        var landing = document.getElementById(location.hash.slice(1));
        history.replaceState(null, "", location.pathname + location.search);
        if (landing) go(landing);
    }
})();

// Beta sign-up: sends the form to the Worker (/api/signup) and shows the
// answer in place. The Turnstile bot check needs JavaScript anyway.
(function () {
    var form = document.getElementById("signup");
    if (!form) return;
    var error = form.querySelector(".signup-error");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var button = form.querySelector("button");
        button.disabled = true;
        error.hidden = true;
        var body = new FormData(form);
        body.set("lang", document.documentElement.lang); // the confirmation email's language
        fetch(form.action, { method: "POST", body: body })
            .then(function (res) {
                if (!res.ok) throw new Error(res.status);
                form.querySelector(".signup-fields").hidden = true;
                form.querySelector(".signup-done").hidden = false;
            })
            .catch(function () {
                error.hidden = false;
                button.disabled = false;
                // A Turnstile token works once, so get a fresh one for the retry.
                if (window.turnstile) window.turnstile.reset();
            });
    });
})();

// On narrow screens each row of phones swipes sideways; the dots under it show
// which phone is in view (hidden by CSS on wider screens, where nothing scrolls).
(function () {
    document.querySelectorAll(".onboarding-screens").forEach(function (row) {
        var figures = row.querySelectorAll("figure");
        var dots = document.createElement("div");
        dots.className = "screen-dots";
        dots.setAttribute("aria-hidden", "true");
        figures.forEach(function () { dots.appendChild(document.createElement("span")); });
        row.after(dots);
        function update() {
            var step = figures[1].offsetLeft - figures[0].offsetLeft;
            // The last phone can't snap to the left edge, so reaching the end means the last dot.
            var atEnd = row.scrollLeft >= row.scrollWidth - row.clientWidth - 2;
            var current = atEnd ? figures.length - 1 : Math.round(row.scrollLeft / step);
            dots.childNodes.forEach(function (dot, i) { dot.classList.toggle("on", i === current); });
        }
        row.addEventListener("scroll", update, { passive: true });
        update();
    });
})();
