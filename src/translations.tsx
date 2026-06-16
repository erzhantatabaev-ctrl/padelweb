import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Header
    eliteLeague: "Elite League",
    liveSlots: "LIVE SLOTS AVAILABLE",
    westBayDome: "WEST BAY DOME",
    openRoof: "21°C Open-Roof Ready",
    reserve: "Reserve",
    matchmaking: "Matchmaking",
    myTickets: "My Tickets",

    // Hero Section
    heroSub: "QATAR'S ULTIMATE PADEL DESTINATION",
    heroTitle: "ELEVATE YOUR GAME TO THE ELITE SECTOR",
    heroDesc: "Book premium WPT turf, join open match lobbies with elite Doha players, or rent high-performance Nox and Bullpadel rackets instantly.",
    heroBtn: "Reserve Court Now",

    // Stats Section
    courtsCount: "4 Active Courts",
    playersCount: "1,240+ Elite Players",
    spotsCount: "Daily Open Match Spot",
    ratingLabel: "Google Rating 4.9★",
    courtsSub: "DOHA PRO SECTORS",
    playersSub: "CLUB MEMBER ROSTER",
    spotsSub: "LOBBIES AVAILABLE NOW",
    ratingSub: "TOP RATED REGIONALLY",
    stat1Label: "MAXIMUM HEIGHT",
    stat1Desc: "High Clearance Dome",
    stat2Label: "WORLD PADEL TOUR",
    stat2Desc: "Official Pro Turf",
    stat3Label: "PLAY CONDITIONS",
    stat3Desc: "Controlled Atmosphere",
    stat4Label: "COURT SECURITY",
    stat4Desc: "Automatic HD Replay",

    // Main reservation screen steps titles
    step1: "Choose Championship Court",
    step1Sub: "SELECT TO MATCH SURFACES, CEILING HEIGHT AND VIDEO STREAMING FEATURES",
    step2: "Select Session & Timings",
    step2Sub: "PEAK PRIME HOURLY MULTIPLIERS ARE TRIGGERED DURING HIGH DEMAND PERIODS",
    step3: "Rental Equipment Hub",
    step3Sub: "RENT PREMIUM WPT APPROVED NOX, BULLPADEL OR BABOLAT GEAR FOR YOUR SESSION",
    step4: "Rider & Player Info",
    step4Sub: "SUBMIT YOUR INFORMATION AND LEVEL FOR AN AUTOMATIC ENTRY BADGE",

    // Court cards characteristics
    indoor: "indoor",
    outdoor: "outdoor",
    rateTitle: "RATE / 90M",
    featuresTitle: "ARENA SPECIFICATIONS",
    powerLevel: "Rebound Shock Power",
    controlLevel: "Acoustic Silence Control",
    selectCourtBtn: "Select Court",
    selectedCourtBtn: "Selected Court",
    climateControl: "❄️ Climate Control Active",
    skyDeck: "☀️ Open Sky Deck",
    "court-1-name": "The Grand Slam (Showcourt)",
    "court-1-surface": "Mondo Supercourt XN (WPT Official)",
    "court-1-desc": "Our ultimate elite indoor show court. Specially designed panoramic glass provides seamless spectator view and pro-level ball bounce.",
    "court-2-name": "Apex Arena",
    "court-2-surface": "Mondo Supercourt XN",
    "court-2-desc": "A premium indoor court perfect for high-speed technical rally control. Balanced rebound and high ceiling clearance of 11.5 meters.",
    "court-3-name": "Sunset Vista",
    "court-3-surface": "STX Supercourt Blue Edition",
    "court-3-desc": "Experience majestic sunset rallies, protected from the seaside wind with specialized structural aerodynamics.",
    "court-4-name": "Coastal Breeze Stadium",
    "court-4-surface": "Mondo Comfort Grass Green",
    "court-4-desc": "Fresh atmosphere with a beautiful design. Wide runout zones of 3 meters on all sides allow for off-court retrievals like a pro.",

    // Calendar
    selectDateLabel: "Select Reservation Date:",
    activeSlotsLabel: "Active Session Slots Available",
    slotStandard: "Standard rate hourly tier",
    slotPeak: "Peak slot - Prime demand pricing",
    selectMatchDateLabel: "Select Match Date",
    activeWindowLabel: "7-DAY RESERVATION WINDOW ACTIVE",
    selectSessionSlot: "Select Session Slot",
    durationLabel: "90-MINUTE RESERVATION DURATION",
    rateStandardLabel: "Standard",
    ratePeakLabel: "Prime Time (+25%)",
    sessionRateLabel: "Session Rate",
    peakTag: "PEAK",

    // Hero, Steps, Checkout and Footer
    heroBadge: "PRO ATHLETIC DOME RESERVATION ENGINE",
    heroTitleRow1: "Fast courts.",
    heroTitleRow2: "Intense rallies.",
    heroBannerDesc: "Secure elite-tier climate-controlled indoor glass courts or open-sky scenic panoramic fields. Grab high-performance racket demos and join dynamic doubles matching.",
    heroStatCourts: "4 Championship Courts",
    heroStatDemos: "NOX AT10 Demo Demos",
    step1Title: "Choose Championship Court",
    step2Title: "Select Session & Timings",
    step4Title: "Player Credentials",
    playerCredsSub: "COMPLETE ALL FIELDS FOR MATCH PASS GENERATION",
    lblCaptainName: "Squad Captain Name",
    lblPhoneContact: "Contact Phone",
    lblEmailCreds: "E-Mail Credentials",
    lblRatingLevel: "Your Rating Level",
    costCourtRental: "Court Rental:",
    costHardwareRental: "Hardware Rental:",
    btnConfirmReserve: "Confirm Lock & Reserve Court",
    textPolicy: "🛡️ 2-Hour free cancellation policy applies. Refund issued automatically as play credits.",
    securedAlertTitle: "MATCH SECURED SUCCESSFULLY!",
    securedAlertSub: "Your court ticket has been locked. Transferring you to your digital entry boarding pass...",
    depositGuaranteed: "SLOT DEPOSIT GUARANTEED",
    footerText: "© 2026 Veloce Padel Arena. Fully sanctioned by the Professional Padel Federation. Developed in high contrast modern sport style.",
    footerContact: "📞 +1 (555) PADEL-01",
    footerLocation: "📍 West Arena Dome, Stadium Pkwy",
    footerHours: "🕒 Open Daily 07:30 - 00:00",

    // Equipment rental
    addGearBtn: "Add to Booking",
    selectedGearBtn: "Selected",
    gearBrand: "Brand:",
    gearRating: "Rating:",
    spectatorGear: "Balls & Accessories",
    accessGear: "Player gear accessories",
    rentalHubTitle: "Pro Test-Rental & Accessories",
    rentalHubSub: "DEMO THE LATEST WORLD PADEL TOUR WEAPONS",
    rentQuantity: "RENT QUANTITY",
    sessionSuffix: "/ session",
    powerAttack: "POWER ATTACK",
    techControl: "TECHNICAL CONTROL",

    // Checkout form
    formTitle: "RESERVATION BRIEFING",
    courtLabel: "COURT:",
    dateLabel: "DATE:",
    timeslotLabel: "TIMESLOT:",
    rateScaleLabel: "RATE SCALE:",
    primeRate: "★ PRIME (1.25x)",
    standardRate: "STANDARD (1.0x)",
    courtCostLabel: "COURT COST:",
    totalPriceLabel: "TOTAL PRICE:",
    bookBtn: "🔐 SECURE FIELD RESERVATION",
    cancelBtn: "Cancel Selection",
    submittingBtn: "Securing reservation...",

    // Form fields input
    lblFullName: "Full Name",
    lblPhone: "Phone Number",
    lblEmail: "Email Address",
    lblSkill: "Padel Skill Rating",
    lblPublicQ: "Make this an Open Match?",
    lblPublicQDesc: "Allow other players to see this slot on the Matchmaking lobby and join you!",
    lblSpotsNeeded: "Additional Players Needed",
    placeholderPlayers: "Select players (1-3)",

    // Matchmaking Board
    matchmakingTitle: "Doha Lobbies & Open Matches",
    matchmakingSub: "JOIN PUBLIC QUEUES CREATED BY DOHA PLAYERS",
    matchmakingDesc: "No need to play solo. Enter any available spot below. Secured matches will update in your active tickets instantly.",
    emptyMatches: "NO LOBBY MATCHES AVAILABLE",
    emptyMatchesDesc: "No matches found for your criteria. Create your own booking and activate 'Make this an Open Match' to start a lobby!",
    spotsLeftSuffix: "spots left",
    joinedLabel: "Joined",
    joinBtn: "⚡ Join Lobby Match",
    joinedMatchesTitle: "You have joined",
    registeredPlayers: "REGISTERED TEAM:",
    requiredLevelLabel: "Required Level:",
    hostLabel: "Host Name:",

    // My Bookings
    ticketsTitle: "Active Match Tickets",
    ticketsSub: "PRESENT THESE VIRTUAL BARCODED PASSES AT THE CLUB ENTRANCE DESK",
    emptyTickets: "NO ACTIVE BOOKINGS",
    emptyTicketsDesc: "Get out on the court! Select your premium court on the 'Reserve' view, choose your preferred slot, add rackets, and complete your reservation.",
    ticketCode: "PASS",
    publicLobbyTag: "📢 Public Match Open",
    privateLobbyTag: "🔒 Private Booking",
    arenaComplex: "VELOCE ARENA COMPLEX",
    ticketMatchDate: "Match Date",
    ticketTimeslot: "Timeslot Slot",
    ticketHost: "MATCH MAIN OWNER",
    ticketRating: "Rating",
    ticketGearTitle: "ADD-ON RACKETS & GEAR",
    ticketOwnGear: "NO HARDWARE RENTAL ADDED (BRINGING OWN RACKETS)",
    ticketTotalSecured: "TOTAL SECURED RATE",
    cancelBookingBtn: "Cancel",
    securedStatus: "SECURED",

    // Doha Locations Map
    mapHeaderSub: "Doha Elite Arena GPS System",
    mapHeaderTitle: "Veloce Doha Locations & Hubs",
    mapHeaderDesc: "Quickly select any of our premium arenas below to update the interactive Doha Google Map instantly. No additional configuration needed!",
    mapSectorA: "Sector A: Veloce West Bay Dome",
    mapSectorADesc: "Indoor pro dome featuring WPT-approved panoramic turf with high altitude double ceilings.",
    mapSectorB: "Sector B: Veloce Sunset Vista (The Pearl)",
    mapSectorBDesc: "Magnificent outdoor courts reflecting waterfront breeze and premium sunset twilight ambiance.",
    mapSectorC: "Sector C: Coastal Breeze Katara Stadium",
    mapSectorCDesc: "Bespoke turf courts surrounded by culture, arts, and high energy spectators.",
    mapSectorSubtitle: "Select Active Arena Sector",
    mapWptOutbounds: "WPT Pro Out-of-bounds Zone",
    mapWptOutboundsDesc: "Our Doha properties feature standard wide runoff alleys allowing elite out-of-boundary saves.",
    mapActiveCourts: "Active Courts",
    mapActiveCourtSingle: "Active Court",
    mapLiveTracker: "Live Map Tracker",
    mapFullColor: "🎨 Full Color",
    mapCyberDark: "🕶️ Cyber Dark",
    mapRoadmap: "Roadmap",
    mapSatellite: "Satellite",

    // Chatbot Coach Veloce
    chatTitle: "Coach Veloce",
    chatSubtitle: "Doha Al Assistant",
    chatDesc: "Ask questions about court rules, timings, locations at West Bay or The Pearl, or racket recommendations.",
    chatInputPlaceholder: "Message Coach Veloce...",
    chatSendBtn: "Send",
    chatTyping: "Coach is typing...",

    // Alerts and notifications
    alertInputRequired: "Please fill out all player information details.",
    alertBookingSuccess: "Court reservation secured successfully!",
    notificationTitle: "RESERVATION SECURED",
    notificationDesc: "Your entry ticket has been successfully registered. Check 'My Tickets' to get your gate access passcode.",
    closeBtn: "Dismiss",

    // Footer
    footerClubName: "VELOCE PADEL QATAR",
    footerCopyright: "© 2026 Veloce Padel Executive Club. Doha, Qatar. All rights reserved.",
    footerSupport: "Doha Pro Hotline: +974 4455 0100 | info@velocepadel.qa"
  },
  ar: {
    // Header
    eliteLeague: "دوري النخبة",
    liveSlots: "الملاعب المتاحة حالياً",
    westBayDome: "قبة الخليج الغربي",
    openRoof: "21° مئوية جاهز للفتح",
    reserve: "حجز ملاعب",
    matchmaking: "البحث عن لاعبين",
    myTickets: "تذاكر حجوزاتي",

    // Hero Section
    heroSub: "الوجهة المثالية لرياضة الباديل في قطر",
    heroTitle: "ارتق بلعبتك إلى غلاف النخبة",
    heroDesc: "احجز ملاعب عشبية معتمدة من WPT، وانضم إلى مباريات مع كبار لاعبي الدوحة، أو استأجر مضارب Nox و Bullpadel عالية الأداء فوراً.",
    heroBtn: "احجز ملعبك الآن",

    // Stats Section
    courtsCount: "4 ملاعب نشطة",
    playersCount: "1,240+ لاعب نخبة",
    spotsCount: "مباريات مفتوحة يومياً",
    ratingLabel: "تقييم غوغل 4.9★",
    courtsSub: "قطاعات الدوحة الاحترافية",
    playersSub: "سجل أعضاء النادي المشتركين",
    spotsSub: "المجموعات المتاحة الحين",
    ratingSub: "الأعلى تصنيفاً إقليمياً",
    stat1Label: "الارتفاع الأقصى",
    stat1Desc: "قبة مرتفعة الأسقف والاعتماد",
    stat2Label: "دوري الباديل العالمي",
    stat2Desc: "عشب Mondo معتمد رسمياً",
    stat3Label: "بيئة اللعب والحرارة",
    stat3Desc: "تكييف متكامل ومثالي بنظام الذكاء",
    stat4Label: "مستوى الأمان والتحليلات",
    stat4Desc: "حفظ تلقائي وإعادة فورية بالكامل HD",

    // Main reservation screen steps titles
    step1: "اختر ملعب البطولة",
    step1Sub: "حدد لمطابقة الأسطح وارتفاع السقف ومزايا البث المباشر للفيديو",
    step2: "اختر الجلسة والمواعيد",
    step2Sub: "يتم تطبيق تسعيرات الذروة المضاعفة خلال فترات الطلب المرتفع",
    step3: "مركز استئجار المعدات والمضارب",
    step3Sub: "استأجر معدات Nox أو Bullpadel أو Babolat المعتمدة لجلساتك بالدوحة",
    step4: "تفاصيل وبيانات اللاعب",
    step4Sub: "قم بتأكيد اسمك ومستواك للحصول على بطاقة الدخول الرقمية التلقائية",

    // Court cards characteristics
    indoor: "داخلي",
    outdoor: "خارجي",
    rateTitle: "السعر / 90 دقيقة",
    featuresTitle: "مواصفات الملعب والساحة",
    powerLevel: "قوة امتصاص ارتداد الكرة",
    controlLevel: "مستوى عزل الهوت والصدى",
    selectCourtBtn: "اختر الملعب",
    selectedCourtBtn: "الملعب المحدد",
    climateControl: "❄️ التكييف والتحكم المناخي نشط",
    skyDeck: "☀️ ساحة سقف مفتوح وعرض خارجي",
    "court-1-name": "الملعب الرئيسي الكبير (شوكورت)",
    "court-1-surface": "موندو سوبيركورت XN (معتمد رسمياً)",
    "court-1-desc": "الملعب الفخم المغلق فائق الأداء والتميز بالزجاج البانورامي المريح لرؤية ممتازة وحركة ارتداد كروية فائقة السرعة للمحترفين.",
    "court-2-name": "أكاديمية أبيكس",
    "court-2-surface": "موندو سوبيركورت XN الفاخر",
    "court-2-desc": "ملعب مغلق بمواصفات ممتازة لتحكم رائع في الكرات السريعة والمثيرة. ارتداد متوازن مع سقف واسع بارتفاع 11.5 متراً.",
    "court-3-name": "مطل الغروب (سنسيت فيستا)",
    "court-3-surface": "موندو STX سوبيركورت الإصدار الأزرق",
    "court-3-desc": "عش روعة مباريات غروب الشمس بساحة اللؤلؤة المميزة، محمي تماماً من تيارات الهواء البحرية بديناميكا هوائية هيكلية.",
    "court-4-name": "ملعب نسيم الساحل بكتارا",
    "court-4-surface": "موندو كومفورت عشب أخضر طبيعي",
    "court-4-desc": "نسيم ساحر وتصميم ملهم للعب الممتع. مساحات خارجية واسعة تبلغ 3 أمتار على الجوانب تتيح الحصول على الكرات الصعبة مثل المحترفين.",

    // Calendar
    selectDateLabel: "اختر تاريخ الحجز:",
    activeSlotsLabel: "الفترات الزمنية المتاحة للجلسة",
    slotStandard: "تسعيرة الفئة العادية",
    slotPeak: "ساعة ذروة - تطبق تسعيرة خاصة",
    selectMatchDateLabel: "اختر تاريخ المباراة",
    activeWindowLabel: "حجز متاح خلال نافذة 7 أيام",
    selectSessionSlot: "اختر فترة الجلسة",
    durationLabel: "مدة الجلسة الكاملة 90 دقيقة",
    rateStandardLabel: "عادي",
    ratePeakLabel: "فترة ذروة (+25%)",
    sessionRateLabel: "سعر الجلسة",
    peakTag: "ذروة",

    // Hero, Steps, Checkout and Footer
    heroBadge: "منصة حجز صالات الباديل الاحترافية بالدوحة",
    heroTitleRow1: "ملاعب سريعة.",
    heroTitleRow2: "تحديات حماسية.",
    heroBannerDesc: "احجز ملاعب بطولة مغلقة ومكيفة بالكامل أو ملاعب بانورامية في الهواء الطلق بتصميم مذهل. جرب أحدث المضارب من أرقى الشركات وانضم إلى مجموعات اللعب المزدوج.",
    heroStatCourts: "4 ملاعب بطولة معتمدة",
    heroStatDemos: "مضارب Nox AT10 لـلتجربة",
    step1Title: "اختر ملعب البطولة",
    step2Title: "اختر فترة الجلسة والمواعيد",
    step4Title: "بيانات واعتماد اللاعب",
    playerCredsSub: "أكمل كافة الحقول لإصدار بطاقة حجز الملعب الرقمية المعتمدة",
    lblCaptainName: "اسم كابتن الفريق / اللاعب",
    lblPhoneContact: "رقم هاتف الاتصال",
    lblEmailCreds: "البريد الإلكتروني",
    lblRatingLevel: "مستوى اللعب والمهارة",
    costCourtRental: "سعر حجز الملعب:",
    costHardwareRental: "استئجار معدات أخرى:",
    btnConfirmReserve: "تأكيد واستكمال حجز الملعب",
    textPolicy: "🛡️ تطبق سياسة الإلغاء المجاني قبل ساعتين من موعد اللعب. يتم استرداد المبالغ كرصيد تلقائي.",
    securedAlertTitle: "تم تأكيد وضمان الحجز بنجاح!",
    securedAlertSub: "تم حجز وتأمين الملعب بنجاح. جاري تقديم بطاقة المرور وتذكرة الصعود المخصصة...",
    depositGuaranteed: "مبلغ عربون الحجز مضمون ومؤمن",
    footerText: "© 2026 نادي فيلوتشي للباديل وصالات الملاعب بدولة قطر. معتمد رسمياً للبطولات ومصمم بنمط تباين رياضي عصري.",
    footerContact: "📞 +1 (555) PADEL-01",
    footerLocation: "📍 الدوحة، القبة الرياضية الغربية",
    footerHours: "🕒 يومياً من 07:30 صباحاً إلى 12:00 منصف الليل",

    // Equipment rental
    addGearBtn: "إضافة للحجز",
    selectedGearBtn: "محدد",
    gearBrand: "العلامة التجارية:",
    gearRating: "التقييم:",
    spectatorGear: "كرات وإكسسوارات",
    accessGear: "ملحقات وإكسسوارات اللاعبين",
    rentalHubTitle: "استئجار وتجربة معدات المحترفين",
    rentalHubSub: "جرب وتدرب مع أحدث مضارب ومعدات دوري الباديل العالمي",
    rentQuantity: "الكمية المطلوبة",
    sessionSuffix: "/ جلسة",
    powerAttack: "قوة الهجوم والسرعة",
    techControl: "التحكم والمناورة الفنية",

    // Checkout form
    formTitle: "تفاصيل الحجز المؤقت",
    courtLabel: "الملعب:",
    dateLabel: "التاريخ:",
    timeslotLabel: "الفترة الزمنية:",
    rateScaleLabel: "فئة السعر:",
    primeRate: "★ ذروة (1.25 ضعف)",
    standardRate: "عادي (1.0 ضعف)",
    courtCostLabel: "سعر الملعب:",
    totalPriceLabel: "السعر الإجمالي:",
    bookBtn: "🔐 تأكيد حجز الملعب والدفع",
    cancelBtn: "إلغاء التحديد",
    submittingBtn: "جاري تأكيد الحجز...",

    // Form fields input
    lblFullName: "الاسم الكامل",
    lblPhone: "رقم الهاتف",
    lblEmail: "البريد الإلكتروني",
    lblSkill: "مستوى تقييم المهارة",
    lblPublicQ: "هل ترغب بجعلها مباراة عامة مفتوحة؟",
    lblPublicQDesc: "اسمح للاعبين الآخرين برؤية هذه الفترة في صالة المباريات والانضمام إليك!",
    lblSpotsNeeded: "عدد اللاعبين الإضافيين المطلوبين",
    placeholderPlayers: "اختر عدد اللاعبين (1-3)",

    // Matchmaking Board
    matchmakingTitle: "مباريات ومجموعات الدوحة المفتوحة",
    matchmakingSub: "انضم إلى المجموعات العامة التي أنشأها لاعبو الدوحة",
    matchmakingDesc: "لا تلعب بمفردك. انضم إلى أي مكان شاغر أدناه. ستتحدث حجوزاتك فوراً في قسم التذاكر.",
    emptyMatches: "لا توجد مجموعات متاحة حالياً",
    emptyMatchesDesc: "لم يتم العثور على مباريات تطابق المعايير. احجز ملعبك الخاص وقم بتفعيل خيار 'مباراة عامة مفتوحة' لبدء مجموعتك الرياضية!",
    spotsLeftSuffix: "أماكن متبقية",
    joinedLabel: "انضممت",
    joinBtn: "⚡ انضمام للمباراة",
    joinedMatchesTitle: "لقد انضممت بنجاح",
    registeredPlayers: "الفريق المسجل:",
    requiredLevelLabel: "المستوى المطلوب:",
    hostLabel: "اسم المستضيف:",

    // My Bookings
    ticketsTitle: "تذاكر حجوزاتك النشطة",
    ticketsSub: "يرجى إبراز بطاقات الباركود الرقمية هذه عند مكتب دخول النادي لفتح البوابة",
    emptyTickets: "لا توجد أي حجوزات نشطة حالياً",
    emptyTicketsDesc: "احجز جلستك الحين! اختر ملعبك الفاخر من صفحة 'احجز ملعب'، حدد الموعد المفضل، أضف المضارب، وأتمم الحجز التلقائي.",
    ticketCode: "تذكرة",
    publicLobbyTag: "📢 مباراة عامة مفتوحة",
    privateLobbyTag: "🔒 حجز خاص",
    arenaComplex: "مجمع ملاعب فيلوتشي بالدوحة",
    ticketMatchDate: "تاريخ المباراة",
    ticketTimeslot: "الفترة الزمنية",
    ticketHost: "مالك ومستضيف الحجز",
    ticketRating: "التقييم والمهارة",
    ticketGearTitle: "المضارب والمعدات المضافة",
    ticketOwnGear: "لم يتم استئجار مضارب (إحضار المضرب الخاص باللاعب)",
    ticketTotalSecured: "مجموع القيمة المؤكدة للطلب",
    cancelBookingBtn: "إلغاء الحجز",
    securedStatus: "مؤكد ومحمي",

    // Doha Locations Map
    mapHeaderSub: "نظام الملاحة GPS لأكاديميات الدوحة",
    mapHeaderTitle: "مواقع ومراكز فيلوتشي باديل بالدوحة",
    mapHeaderDesc: "اختر فرعنا المفضل أدناه لتحديث خريطة غوغل التفاعلية فوراً وإرشادك إلى موقع الملعب.",
    mapSectorA: "قطاع أ: قبة فيلوتشي بالخليج الغربي",
    mapSectorADesc: "قبة احترافية مغلقة مصممة بزجاج بانورامي معتمد من WPT مع أسقف مرتفعة للغاية.",
    mapSectorB: "قطاع ب: فيلوتشي غروب اللؤلؤة (بورتو أرابيا)",
    mapSectorBDesc: "ملاعب خارجية فاخرة تطل مباشرة على المراسي البحرية مع نسيم رائع وأجواء الغروب الهادئة.",
    mapSectorC: "قطاع ج: ملعب نسيم الساحل بكتارا",
    mapSectorCDesc: "ملاعب عشبية متميزة تقع بقلب الحي الثقافي كتارا محاطة بالفنون ومدرجات الجماهير المتحمسة.",
    mapSectorSubtitle: "اختر قطاع الملعب النشط للملاحة",
    mapWptOutbounds: "منطقة اللعب خارج حدود الملعب WPT",
    mapWptOutboundsDesc: "تتميز فروعنا في الدوحة بمساحات ارتداد جانبية واسعة تسمح بالضربات الجريئة خارج الزجاج.",
    mapActiveCourts: "ملاعب نشطة",
    mapActiveCourtSingle: "ملعب نشط",
    mapLiveTracker: "مؤشر الخريطة المباشر",
    mapFullColor: "🎨 ألوان كاملة",
    mapCyberDark: "🕶️ المظهر الداكن",
    mapRoadmap: "خريطة الطرق",
    mapSatellite: "قمر صناعي",

    // Chatbot Coach Veloce
    chatTitle: "كوتش فيلوتشي",
    chatSubtitle: "مساعد الدوحة الذكي",
    chatDesc: "اسأل عن القواعد الفنية، أوقات الفتح، الفروع في بورتو أرابيا بكتارا، أو توصيات بمضارب Nox.",
    chatInputPlaceholder: "اكتب رسالتك للكوتش فيلوتشي هنا...",
    chatSendBtn: "إرسال",
    chatTyping: "الكوتش يكتب الحين...",

    // Alerts and notifications
    alertInputRequired: "الرجاء كتابة وتعبئة كافة البيانات المطلوبة للاعبين.",
    alertBookingSuccess: "تم تأكيد وحجز ملعب الباديل بنجاح تام!",
    notificationTitle: "تم تأكيد حجز الملعب",
    notificationDesc: "تم تسجيل تذكرتك الرياضية بنجاح. تحقق من 'تذكرة حجوزاتي' لرؤية رمز الدخول الرقمي.",
    closeBtn: "إغلاق",

    // Footer
    footerClubName: "فيلوتشي باديل قطر",
    footerCopyright: "© 2026 نادي فيلوتشي الفاخر للباديل. الدوحة، قطر. جميع الحقوق محفوظة.",
    footerSupport: "خط الدوحة المباشر: +974 4455 0100 | info@velocepadel.qa"
  }
} as const;

export type TranslationKeys = keyof typeof translations['en'];

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('veloce_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('veloce_language', language);
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.lang = language;
    
    // Add font styling preference for Arabic readability
    if (language === 'ar') {
      document.body.classList.add('font-arabic-friendly');
    } else {
      document.body.classList.remove('font-arabic-friendly');
    }
  }, [language]);

  const t = (key: TranslationKeys): string => {
    const translationSet = translations[language];
    return (translationSet[key] as string) || (translations['en'][key] as string) || String(key);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
