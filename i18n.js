// English / Khmer toggle for the homepage.
//
// English lives in index.html as written; this file holds only the Khmer.
// Elements carry data-i18n (inner HTML), data-i18n-alt or data-i18n-aria,
// and the English is read back from the page on load, so there is one copy
// of each language. The choice is kept in localStorage on the visitor's own
// device (never sent anywhere, and not a cookie) and can be linked to with
// ?lang=km or ?lang=en.
(function () {
    var km = {
        title: "HungryRaccoon — វាយតម្លៃ ដាក់ក្នុងបញ្ជី និងចែករំលែកកន្លែងញ៉ាំនៅភ្នំពេញ",
        skip: "រំលងទៅមាតិកា",
        brandHome: "ទំព័រដើម HungryRaccoon",
        navMain: "ការរុករកមេ",
        navHow: "របៀបដំណើរការ",
        navCooking: "អ្វីដែលមានស្រាប់",
        navStatus: "កំពុងរៀបចំ",
        heroTitle: "វាយតម្លៃ។ ដាក់ក្នុងបញ្ជី។<br><em>ចែករំលែក។</em>",
        heroIntro: "HungryRaccoon គឺជាកំណត់ហេតុម្ហូបអាហារសម្រាប់ភ្នំពេញ ដែលអ្នកអាចចែករំលែកជាមួយមិត្តភក្តិ។ វាយតម្លៃកន្លែងដែលអ្នកបានញ៉ាំ រក្សាបញ្ជីកន្លែងដែលចង់ទៅបន្ទាប់ ហើយមើលថាមិត្តភក្តិរបស់អ្នកកំពុងចូលចិត្តអ្វី។",
        heroButton: "មើលខាងក្នុងបន្តិច",
        launchNote: "រសជាតិបន្តិចបន្តួចនៃអ្វីដែលនឹងមកដល់។<br>កម្មវិធីនេះមិនទាន់អាចទាញយកបាននៅឡើយទេ។",
        city: "ភ្នំពេញ កម្ពុជា",
        cityTag: "សម្រាប់គ្រប់ទីកន្លែងដែលភាពឃ្លាននាំអ្នកទៅ។",
        foodAlt: "គុយទាវមួយចាន ជាមួយជីរស្រស់ ក្រូចឆ្មា និងម្ទេស",
        foodCaption: "របស់ឆ្ងាញ់ៗ នៅមិនឆ្ងាយទេ។",
        welcomeAlt: "អេក្រង់ស្វាគមន៍របស់ HungryRaccoon ៖ Rate it. List it. Share it. ជាមួយប៊ូតុង Get started និង Sign in",
        previewCaption: "ការមើលកម្មវិធីជាមុន · ខែតុលា ២០២៦",
        smallNote: "ចំណង់ធំ។<br>អេក្រង់តូច។",
        tickerLabel: "វាយតម្លៃអ្វីដែលអ្នកបានញ៉ាំ, បង្កើតបញ្ជី, ចែករំលែកជាមួយមិត្តភក្តិ, ភ្នំពេញនៅលើចាន",
        tickerRate: "វាយតម្លៃអ្វីដែលអ្នកបានញ៉ាំ",
        tickerLists: "បង្កើតបញ្ជី",
        tickerShare: "ចែករំលែកជាមួយមិត្តភក្តិ",
        tickerPlate: "ភ្នំពេញនៅលើចាន",
        previewTitle: "ទីក្រុងរបស់អ្នក។<br>រសជាតិរបស់អ្នក។<br><em>អាហារបន្ទាប់របស់អ្នក។</em>",
        previewP1: "ចាប់ផ្ដើមពីតំបន់ដែលអ្នកស្គាល់ និងម្ហូបដែលអ្នកចូលចិត្ត។ HungryRaccoon បង្ហាញកន្លែងដែលត្រូវនឹងចិត្តអ្នកមុនគេ។",
        previewP2: "នៅជិតផ្ទះ ជិតកន្លែងធ្វើការ ឬគ្រាន់តែមកលេង។ មានវិធីច្រើនយ៉ាងដើម្បីញ៉ាំជុំវិញភ្នំពេញ។",
        previewLink: "មើលអ្វីដែលមានរួចហើយ",
        previewNote: "ការមើលកំណែសាកល្បងខែតុលារបស់យើង។",
        areasAlt: "តើអ្នកតែងតែញ៉ាំនៅឯណា? ជ្រើសរើសតំបន់ក្នុងភ្នំពេញបានរហូតដល់បី។ ចំការមន និងឫស្សីកែវ ត្រូវបានជ្រើសរើស។",
        areasTitle: "នៅក្បែរអ្នក។",
        areasText: "ជ្រើសរើសរហូតដល់បីតំបន់ ដើម្បីចាប់ផ្ដើមស្វែងរក។",
        tastesAlt: "តើអ្នកចូលចិត្តញ៉ាំអ្វី? ជម្រើសម្ហូប ដោយបានជ្រើសម្ហូបខ្មែរ និងម្ហូបជប៉ុន។",
        tastesTitle: "ត្រូវតាមរសជាតិអ្នក។",
        tastesText: "ជ្រើសរើសម្ហូបដែលអ្នកចូលចិត្ត។ ប្ដូរបានគ្រប់ពេល។",
        featuresTitle: "ជីវិតម្ហូបអាហាររបស់អ្នក<br><em>នៅកន្លែងតែមួយ។</em>",
        featuresIntro: "កំណត់ហេតុសម្រាប់គ្រប់កន្លែងដែលអ្នកញ៉ាំ និងព័ត៌មានថាមិត្តភក្តិរបស់អ្នកកំពុងញ៉ាំនៅឯណា។ នេះហើយជាអ្វីដែលយើងកំពុងកសាង HungryRaccoon ឱ្យក្លាយជា។",
        inTestBuild: "មានក្នុងកំណែសាកល្បង",
        comingSoon: "ឆាប់ៗនេះ",
        rateTitle: "វាយតម្លៃអ្វីដែលអ្នកបានញ៉ាំ។",
        rateText: "ប្រាប់ថាអ្នកមានអារម្មណ៍យ៉ាងណា រួចជ្រើសរើសកន្លែងដែលល្អជាង ក្នុងចំណោមកន្លែងពីរបីដែលអ្នកធ្លាប់ទៅ។ មិនបាច់ពិបាកគិតរកលេខទេ ៖ ចំណាត់ថ្នាក់ផ្ទាល់ខ្លួនរបស់អ្នកនឹងកើតឡើងដោយខ្លួនឯង។",
        ratingsLabel: "ឧទាហរណ៍នៃការវាយតម្លៃ",
        liked: "ចូលចិត្ត",
        fine: "ធម្មតា",
        notForMe: "មិនត្រូវចិត្ត",
        listsTitle: "បញ្ជីដែលគួរចែករំលែក។",
        listsText: "ហាងគុយទាវដែលអ្នកស្រឡាញ់បំផុត។ ហាងកាហ្វេដែលអ្នកទៅជាប្រចាំ។ បញ្ជីសម្រាប់មិត្តដែលមកលេងទីក្រុង។ ចែករំលែកបញ្ជីណាមួយក៏បាន ដោយតំណតែមួយ។",
        listLabel: "ឧទាហរណ៍នៃបញ្ជីដែលបានចែករំលែក",
        listName: "បញ្ជី «ត្រូវតែសាកល្បង»",
        listSub: "កន្លែងដែលចូលចិត្តមួយចំនួន នៅកន្លែងតែមួយ។",
        friendsTitle: "ញ៉ាំជាមួយមិត្តភក្តិ។",
        friendsText: "តាមដានមិត្តភក្តិ ដើម្បីមើលថាពួកគេបានទៅណាខ្លះ បានវាយតម្លៃអ្វី និងចង់ត្រឡប់ទៅញ៉ាំអ្វីម្ដងទៀត។ ដំបូន្មានល្អបំផុត មកពីមនុស្សដែលអ្នកទុកចិត្ត។",
        friendsNote: "អ្វីដែលពួកគេចូលចិត្ត។ អាហារបន្ទាប់របស់អ្នក។",
        nextTitle: "ចាប់ផ្ដើមពី<br><em>គ្រប់តុក្នុងទីក្រុង។</em>",
        nextIntro: "នៅពីក្រោយការវាយតម្លៃ និងបញ្ជី គឺជាមគ្គុទ្ទេសក៍សម្រាប់ទីក្រុងទាំងមូល។<br>ផ្នែកទាំងនេះដំណើរការរួចហើយក្នុងកំណែសាកល្បងរបស់យើង។",
        findTitle: "រកកន្លែងដែលត្រូវនឹងចិត្តអ្នក។",
        findText: "ភោជនីយដ្ឋាន ហាងកាហ្វេ និងបារ ជាង ៤០០០ កន្លែង នៅទូទាំងភ្នំពេញ។ រកមើលតាមតំបន់ ឬប្រភេទម្ហូប ស្វែងរកតាមឈ្មោះ ឬប្រាប់ពីម្ហូបដែលអ្នកចូលចិត្ត ហើយមើលកន្លែងទាំងនោះមុនគេ។",
        cravingTitle: "កន្លែងសម្រាប់គ្រប់ចំណង់។",
        cravingText: "ស្វែងរកកន្លែងមួយ បើកទំព័ររបស់វា ហើយពិនិត្យព័ត៌មានលម្អិត។ ធ្លាប់ទៅរួចហើយមែនទេ? ចូលគណនី ដើម្បីវាយតម្លៃ និងចាប់ផ្ដើមបង្កើតចំណាត់ថ្នាក់ផ្ទាល់ខ្លួនរបស់អ្នក។",
        openTitle: "ដឹងថាកន្លែងណាកំពុងបើក។",
        openText: "មើលកន្លែងដែលកំពុងបើកឥឡូវនេះ ដោយកន្លែងដែលជិតបិទបង្ហាញមុនគេ ព្រមទាំងអាសយដ្ឋាន និងម៉ោងបើក មុនពេលអ្នកចេញដំណើរ។",
        openExample: '<span class="open-dot"></span> កំពុងបើក <span class="example-label">ឧទាហរណ៍ម៉ោងបើក</span>',
        closingTitle: "ជួបគ្នានៅ<br><em>ហាងសំណព្វថ្មីរបស់អ្នក។</em>",
        closingText: 'HungryRaccoon នៅតែកំពុងរៀបចំ។<br>យើងកំពុងត្រៀមខ្លួនសម្រាប់អ្នកឃ្លាននៅភ្នំពេញ។<br>តាមដានយើងនៅលើ <a href="https://www.instagram.com/hungryraccoonapp/" target="_blank" rel="noopener">Instagram</a> និង <a href="https://www.tiktok.com/@hungryraccoonapp" target="_blank" rel="noopener">TikTok</a> ខណៈដែលយើងកំពុងចម្អិន។',
        backTop: "ត្រឡប់ទៅខាងលើ",
        footerTag: "បង្កើតឡើងសម្រាប់ភ្នំពេញ។ និងចំណង់អាហាររបស់អ្នក។",
        footerNav: "បាតទំព័រ",
        privacy: "គោលការណ៍ឯកជនភាព (English)",
        terms: "លក្ខខណ្ឌប្រើប្រាស់ (English)",
        contact: "ទាក់ទងយើង",
        onInstagram: "HungryRaccoon នៅលើ Instagram",
        onFacebook: "HungryRaccoon នៅលើ Facebook",
        onLinkedIn: "HungryRaccoon នៅលើ LinkedIn",
        onTikTok: "HungryRaccoon នៅលើ TikTok"
    };

    var KEY = "hr-lang";
    var root = document.documentElement;
    var button = document.querySelector(".lang-toggle");
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
        var khmer = lang === "km";
        english.forEach(function (item) {
            var value = khmer && km[item.key] ? km[item.key] : item.text;
            if (item.attr) item.el.setAttribute(item.attr, value);
            else item.el.innerHTML = value;
        });
        document.title = khmer ? km.title : englishTitle;
        root.lang = khmer ? "km" : "en";
        if (button) {
            button.textContent = khmer ? "EN" : "ខ្មែរ";
            button.lang = khmer ? "en" : "km";
            button.setAttribute("aria-label", khmer
                ? "Switch to English (ប្ដូរទៅភាសាអង់គ្លេស)"
                : "ប្ដូរទៅភាសាខ្មែរ (Switch to Khmer)");
        }
    }

    function saved() {
        var fromUrl = new URLSearchParams(location.search).get("lang");
        if (fromUrl === "km" || fromUrl === "en") return fromUrl;
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    if (saved() === "km") apply("km");

    if (button) {
        button.addEventListener("click", function () {
            var next = root.lang === "km" ? "en" : "km";
            apply(next);
            try { localStorage.setItem(KEY, next); } catch (e) { }
            // Keep a shared link in the language being read.
            var url = new URL(location.href);
            url.searchParams.set("lang", next);
            history.replaceState(null, "", url);
        });
    }
})();
