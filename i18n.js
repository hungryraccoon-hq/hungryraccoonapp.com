// English / Khmer / French switch for the homepage.
//
// English lives in index.html as written; this file holds the Khmer and French.
// Elements carry data-i18n (inner HTML), data-i18n-alt or data-i18n-aria,
// and the English is read back from the page on load, so there is one copy
// of each language. The choice is kept in localStorage on the visitor's own
// device (never sent anywhere, and not a cookie) and can be linked to with
// ?lang=km, ?lang=fr or ?lang=en.
(function () {
    var km = {
        title: "HungryRaccoon — វាយតម្លៃ ដាក់ក្នុងបញ្ជី និងចែករំលែកកន្លែងញ៉ាំនៅភ្នំពេញ",
        skip: "រំលង",
        brandHome: "ទំព័រដើម HungryRaccoon",
        navMain: "ការរុករកមេ",
        navHow: "របៀបប្រើ",
        navStatus: "កំពុងរៀបចំ",
        heroTitle: "វាយតម្លៃ! <br> បង្កើតតារាង!<br><em>និងចែកគ្នា!</em>",
        heroIntro: "HungryRaccoon ជាសៀវភៅកត់ត្រាអាហារសម្រាប់អ្នកភ្នំពេញ ដែលអាចចែករំលែកជាមួយមិត្តភក្តិ វាយតម្លៃកន្លែងដែលអ្នកបានញ៉ាំ កត់ចំណាំកន្លែងដែលចង់ទៅលើកក្រោយ ហើយមើលថាមិត្តភក្តិកំពុងតែចូលចិត្តអ្វី!",
        heroButton: "ចូលមើលបន្តិចមក",
        foodAlt: "គុយទាវមួយចាន ជាមួយជីរស្រស់ ក្រូចឆ្មា និងម្ទេស",
        foodCaption: "របស់ឆ្ងាញ់ៗ នៅមិនឆ្ងាយទេ",
        welcomeAlt: "អេក្រង់ស្វាគមន៍របស់ HungryRaccoon ៖ Rate it. List it. Share it. ជាមួយប៊ូតុង Get started និង Sign in",
        previewCaption: "មើលកម្មវិធីសាកល្បង · តុលា · ២០២៦",
        tickerLabel: "វាយតម្លៃទីតាំង, បង្កើតបញ្ជី, ចែករំលែកជាមួយមិត្ត, ភ្នំពេញក្នុងដៃអ្នក",
        tickerRate: "វាយតម្លៃទីតាំង",
        tickerLists: "បង្កើតបញ្ជី",
        tickerShare: "ចែករំលែកជាមួយមិត្ត",
        tickerPlate: "ភ្នំពេញក្នុងដៃអ្នក",
        previewTitle: "ទីក្រុងអ្នក<br>រសជាតិអ្នក<br><em>អាហារបន្ទាប់របស់អ្នក</em>",
        previewP1: "ចាប់ផ្ដើមពីតំបន់ដែលអ្នកស្គាល់ និងម្ហូបដែលអ្នកស្រឡាញ់ និងដាក់កន្លែងដែលចាប់ចិត្តអ្នក ដោយងាយៗ",
        previewP2: "នៅជិតផ្ទះ ជិតកន្លែងធ្វើការ ឬគ្រាន់តែមកលេង ការញ៉ាំម្ហូបអាហារជុំវិញភ្នំពេញ មានច្រើនរបៀបណាស់!",
        areasAlt: "តើអ្នកតែងតែញ៉ាំនៅឯណា? ជ្រើសរើសតំបន់ក្នុងភ្នំពេញបានរហូតដល់បី ចំការមន និងឫស្សីកែវ ត្រូវបានជ្រើសរើស",
        areasTitle: "តោះស្វែងរកនៅជិតៗអ្នក!",
        areasText: "ជ្រើសរើសបានដល់ ៣ តំបន់ដើម្បីស្វែងរក!",
        tastesAlt: "តើអ្នកចូលចិត្តញ៉ាំអ្វី? ជម្រើសម្ហូប ដោយបានជ្រើសម្ហូបខ្មែរ និងម្ហូបជប៉ុន",
        tastesTitle: "តាមចំណង់អ្នក!",
        tastesText: "ជ្រើសរើសម្ហូបដែលអ្នកចូលចិត្ត! អាចប្ដូរគ្រប់ពេលវេលា",
        closingTitle: "ជួបគ្នានៅ<br><em>ហាងសំណព្វថ្មីរបស់អ្នក</em>",
        closingText: 'HungryRaccoon នៅតែកំពុងរៀបចំ<br>យើងកំពុងត្រៀមខ្លួនសម្រាប់អ្នកឃ្លាននៅភ្នំពេញ<br>តាមដានយើងនៅលើ <a href="https://www.instagram.com/hungryraccoonapp/" target="_blank" rel="noopener">Instagram</a> និង <a href="https://www.tiktok.com/@hungryraccoonapp" target="_blank" rel="noopener">TikTok</a> ខណៈដែលយើងកំពុងចម្អិន',
        backTop: "ត្រឡប់ទៅខាងលើ",
        footerTag: "បង្កើតឡើងសម្រាប់ភ្នំពេញ និងចំណង់អាហាររបស់អ្នក",
        footerNav: "បាតទំព័រ",
        privacy: "គោលការណ៍ឯកជនភាព (English)",
        terms: "លក្ខខណ្ឌប្រើប្រាស់ (English)",
        about: "អំពីយើង (English)",
        contact: "ទាក់ទងយើង (English)",
        onInstagram: "HungryRaccoon នៅលើ Instagram",
        onFacebook: "HungryRaccoon នៅលើ Facebook",
        onLinkedIn: "HungryRaccoon នៅលើ LinkedIn",
        onTikTok: "HungryRaccoon នៅលើ TikTok",
        langGroup: "ភាសា"
    };

    var fr = {
        title: "HungryRaccoon — Notez, listez et partagez vos adresses à Phnom Penh",
        skip: "Aller au contenu",
        brandHome: "Accueil HungryRaccoon",
        navMain: "Navigation principale",
        navHow: "Comment ça marche",
        navStatus: "En préparation",
        heroTitle: "Notez. Listez.<br><em>Partagez.</em>",
        heroIntro: "HungryRaccoon est un carnet culinaire à partager, pensé pour Phnom Penh. Notez les endroits où vous avez mangé, gardez des listes de vos prochaines adresses et découvrez ce que vos amis adorent.",
        heroButton: "Jetez un œil",
        foodAlt: "Un bol de nouilles de riz avec des herbes fraîches, du citron vert et du piment",
        foodCaption: "Un bon plat vous attend au coin de la rue.",
        welcomeAlt: "Écran d’accueil de HungryRaccoon : Rate it. List it. Share it., avec les boutons Get started et Sign in",
        previewCaption: "Aperçu de l’app · octobre 2026",
        tickerLabel: "Notez ce que vous avez mangé, Faites des listes, Partagez avec vos amis, Phnom Penh dans l’assiette",
        tickerRate: "Notez ce que vous avez mangé",
        tickerLists: "Faites des listes",
        tickerShare: "Partagez avec vos amis",
        tickerPlate: "Phnom Penh dans l’assiette",
        previewTitle: "Votre ville.<br>Vos goûts.<br><em>Votre prochain repas.</em>",
        previewP1: "Commencez par les quartiers que vous connaissez et la cuisine que vous aimez. HungryRaccoon vous montre d’abord les endroits qui vous ressemblent.",
        previewP2: "Près de chez vous, près du bureau ou simplement de passage : il y a mille façons de goûter Phnom Penh.",
        areasAlt: "Où mangez-vous d’habitude ? Choisissez jusqu’à trois quartiers de Phnom Penh. Chamkarmon et Russei Keo sont sélectionnés.",
        areasTitle: "Juste au coin de la rue.",
        areasText: "Choisissez jusqu’à trois quartiers pour commencer.",
        tastesAlt: "Qu’aimez-vous manger ? Choix de cuisines, avec khmère et japonaise sélectionnées.",
        tastesTitle: "Selon vos goûts.",
        tastesText: "Choisissez vos préférées. Modifiables à tout moment.",
        closingTitle: "Rendez-vous à<br>votre prochaine <em>adresse fétiche.</em>",
        closingText: 'HungryRaccoon est encore en préparation. <br>Nous nous préparons pour les gourmands de Phnom Penh. <br>Suivez-nous sur <a href="https://www.instagram.com/hungryraccoonapp/" target="_blank" rel="noopener">Instagram</a> et <a href="https://www.tiktok.com/@hungryraccoonapp" target="_blank" rel="noopener">TikTok</a> pendant que ça mijote.',
        backTop: "Retour en haut",
        footerTag: "Fait pour Phnom Penh. Et pour votre appétit.",
        footerNav: "Pied de page",
        privacy: "Politique de confidentialité (en anglais)",
        terms: "Conditions d’utilisation (en anglais)",
        about: "À propos (en anglais)",
        contact: "Nous contacter (en anglais)",
        onInstagram: "HungryRaccoon sur Instagram",
        onFacebook: "HungryRaccoon sur Facebook",
        onLinkedIn: "HungryRaccoon sur LinkedIn",
        onTikTok: "HungryRaccoon sur TikTok",
        langGroup: "Langue"
    };

    var strings = { km: km, fr: fr };

    var KEY = "hr-lang";
    var root = document.documentElement;
    var buttons = document.querySelectorAll(".lang-switch button");
    var targets = [
        ["data-i18n", null],
        ["data-i18n-alt", "alt"],
        ["data-i18n-aria", "aria-label"]
    ];

    // Remember the English before anything is swapped.
    var english = [];
    targets.forEach(function (t) {
        document.querySelectorAll("[" + t[0] + "]").forEach(function (el) {
            english.push({
                el: el,
                key: el.getAttribute(t[0]),
                attr: t[1],
                text: t[1] ? el.getAttribute(t[1]) : el.innerHTML
            });
        });
    });
    var englishTitle = document.title;

    function apply(lang) {
        var t = strings[lang] || {};
        english.forEach(function (item) {
            var value = t[item.key] || item.text;
            if (item.attr) item.el.setAttribute(item.attr, value);
            else item.el.innerHTML = value;
        });
        document.title = t.title || englishTitle;
        root.lang = strings[lang] ? lang : "en";
        buttons.forEach(function (b) {
            b.setAttribute("aria-pressed", b.getAttribute("data-lang") === root.lang ? "true" : "false");
        });
    }

    function isLang(l) { return l === "en" || !!strings[l]; }

    function saved() {
        var fromUrl = new URLSearchParams(location.search).get("lang");
        if (isLang(fromUrl)) return fromUrl;
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    var start = saved();
    if (start && strings[start]) apply(start);

    buttons.forEach(function (b) {
        b.addEventListener("click", function () {
            var next = b.getAttribute("data-lang");
            if (!isLang(next) || next === root.lang) return;
            apply(next);
            try { localStorage.setItem(KEY, next); } catch (e) { }
            // Keep a shared link in the language being read.
            var url = new URL(location.href);
            url.searchParams.set("lang", next);
            history.replaceState(null, "", url);
        });
    });
})();
