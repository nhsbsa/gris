const express = require('express')
const router = express.Router()
const path = require('path')

// Sign in
router.post('/sign-in', function(req, res) {
    let emailLogin = req.session.data['email-login']

    if (!emailLogin || emailLogin.trim() === "") {
        res.redirect("sign-in")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("enter-your-password")
    }
})

// Enter your password
router.post('/enter-your-password', function(req, res) {
    let password = req.session.data['password']

    if (!password || password.trim() === "") {
        res.redirect("enter-your-password")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("enter-auth-code")
    }
})

// Enter auth code
router.post('/enter-auth-code', function(req, res) {
    let code = req.session.data['auth-code']

    if (!code || code.trim() === "") {
        res.redirect("enter-auth-code")
        // add proper error functionality in future versions instead of redirect
    } else {
        req.session.data['loggedIn'] = true;
        res.redirect("dashboard")
    }
})

// Sign out functionality
router.get('/sign-out', function (req, res) {
    req.session.destroy(function () {
        res.redirect('you-are-now-signed-out');
    });
});

// Dashboard - Don't let user view unless logged in
let version = 'offline-v3';

router.get('/dashboard', function (req, res) {
    let currentPath = req.path;

    if (req.session.data['loggedIn']) {
        res.render(`${version}/dashboard`, { currentPath });
    } else {
        res.redirect('sign-in');
    }
});

// Search
router.post('/search', function(req, res) {
    let title   = String(req.session.data['search-study-title'] || '').trim();
    let grisID  = String(req.session.data['search-gris-id'] || '').trim();
    let ciEmail = String(req.session.data['search-ci-email'] || '').trim();
    let ciName  = String(req.session.data['search-ci-name'] || '').trim();

    // If any field is NOT blank
    if (
        (title && title.trim() !== "") ||
        (grisID && grisID.trim() !== "") ||
        (ciEmail && ciEmail.trim() !== "") ||
        (ciName && ciName.trim() !== "")
    ) {
        res.redirect("search-results")
    } else {
        res.redirect("search")
        // Add error functionality here
    }
})

// Manage study - change title
router.post('/manage-study-change-title', function(req, res) {
    let changeTitle = req.session.data['change-title'];

    if (!changeTitle || changeTitle.trim() === "") {
        res.redirect("manage-study-change-title");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if filled
        res.redirect("manage-study-change-title-cya");
    }
});

// Manage study - change disease area speciality
router.post('/manage-study-change-speciality', function(req, res) {
    const changeSpeciality = req.session.data['change-speciality'];

    const validSpecialities = [
        "ageing",
        "anaesthesia-perioperative-medicine-pain-management",
        "cancer",
        "cardiovascular-disease-cardiac-surgery",
        "children",
        "critical-care",
        "dementias-neurodegeneration",
        "dermatology",
        "diabetes",
        "ear-nose-throat",
        "gastroenterology",
        "genetics",
        "haematology-non-cancer",
        "health-services-research",
        "hepatology",
        "infection",
        "mental-health",
        "metabolic-endocrine-disorders",
        "musculoskeletal-disorders-elective-orthopaedic",
        "neurological-disorders",
        "obstetrics-gynaecology",
        "oral-dental-health",
        "palliative-care",
        "primary-care",
        "public-health",
        "rare-diseases",
        "renal",
        "reproductive-health-childbirth",
        "residential"
    ];

    if (validSpecialities.includes(changeSpeciality)) {
        res.redirect("manage-study-change-speciality-cya");
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-change-speciality");
    }
});

// Manage study - change government priority
router.post('/manage-study-change-priority', function(req, res) {
    let changePriorities = req.session.data['change-priorities'];

    const validPriority = [
        "prevention-early-detection",
        "patient-safety-quality",
        "health-inequalities",
        "mental-health",
        "healthy-ageing",
        "digital-health",
        "capacity-building",
        "sustainability-net-zero",
        "social-care-integration",
        "public-health",
        "none"
    ];

    if (Array.isArray(changePriorities)) {
        const allValid = changePriorities.every(p => validPriority.includes(p));
        return allValid
            ? res.redirect("manage-study-change-priority-cya")
            : res.redirect("manage-study-change-priority");
    } else if (validPriority.includes(changePriorities)) {
        return res.redirect("manage-study-change-priority-cya");
    }

    res.redirect("manage-study-change-priority");
});

// Manage study - change status
router.post('/manage-study-change-status', function(req, res) {
    const changeStatus = req.session.data['change-status'];

    const validStatus = [
        "open-to-recruitment",
        "closed-to-recruitment",
        "completed",
        "suspended-or-on-hold",
        "not-started",
    ];

    if (validStatus.includes(changeStatus)) {
        res.redirect("manage-study-change-status-cya");
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-change-status");
    }
});

// Manage study - change phase
router.post('/manage-study-change-phase', function(req, res) {
    const changePhase = req.session.data['change-phase'];

    const validPhase = [
        "pre-clinical",
        "phase-one",
        "phase-two",
        "phase-three",
        "phase-four",
        "na"
    ];

    if (validPhase.includes(changePhase)) {
        res.redirect("manage-study-change-phase-cya");
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-change-phase");
    }
});

// Manage study - change setting
router.post('/manage-study-change-setting', function(req, res) {
    const changeSetting = req.session.data['change-setting'];

    const validSetting = [
        "primary-care",
        "secondary-care",
        "tertiary-care",
        "community-setting",
        "social-care-setting",
        "online-or-virtual-setting"
    ];

    if (Array.isArray(changeSetting)) {
        const allValid = changeSetting.every(setting => validSetting.includes(setting));
        return allValid
            ? res.redirect("manage-study-change-setting-cya")
            : res.redirect("manage-study-change-setting");
    } else if (validSetting.includes(changeSetting)) {
        return res.redirect("manage-study-change-setting-cya");
    }

    // nothing selected or invalid
    res.redirect("manage-study-change-setting");
});

// Manage study - change location
router.post('/manage-study-change-location', function(req, res) {
    let changeLocation = req.session.data['change-location'];

    if (changeLocation == "england" || changeLocation == "scotland" || changeLocation == "wales" || changeLocation == "northern-ireland") {
        res.redirect("manage-study-change-location-cya")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-change-location")
    }
});

// Manage study - change chief investigator's email address
router.post('/manage-study-change-ci-email', function(req, res) {
    let changeEmail = req.session.data['change-ci-email'];

    if (!changeEmail || changeEmail.trim() === "") {
        res.redirect("manage-study-change-ci-email");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if filled
        res.redirect("manage-study-change-ci-email-cya");
    }
});

// Manage study - change sponsor
router.post('/manage-study-change-sponsor', function(req, res) {
    let name = req.session.data['change-sponsor-name'];
    let email = req.session.data['change-sponsor-email'];

    // Check that both name and email are provided and not just whitespace
    if (!name || name.trim() === "" || !email || email.trim() === "") {
        // Redirect back to the add sponsor page if either is blank
        res.redirect("manage-study-change-sponsor");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if both are filled
        res.redirect("manage-study-change-sponsor-cya");
    }
});

// Manage study - add a sponsor
router.post('/manage-study-add-sponsor', function(req, res) {
    let name = req.session.data['add-sponsor-name'];
    let email = req.session.data['add-sponsor-email'];

    // Check that both name and email are provided and not just whitespace
    if (!name || name.trim() === "" || !email || email.trim() === "") {
        // Redirect back to the add sponsor page if either is blank
        res.redirect("manage-study-add-sponsor");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if both are filled
        res.redirect("manage-study-add-sponsor-cya");
    }
});

// Manage study - add a member 
router.post('/manage-study-add-member', function(req, res) {
    let name = req.session.data['member-full-name'];
    let email = req.session.data['member-email-address'];
    let permissions = req.session.data['permissions'];

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" ||
        !email || email.trim() === "" ||
        (permissions !== "read only" && permissions !== "editor")) {
        res.redirect("manage-study-add-member");
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-add-member-cya");
    }
});

// Manage study - change member 
router.post('/manage-study-change-member', function(req, res) {
    let name = req.session.data['change-full-name'];
    let email = req.session.data['change-email-address'];
    let permissions = req.session.data['change-permissions'];

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" ||
        !email || email.trim() === "" ||
        (permissions !== "read only" && permissions !== "editor")) {
        res.redirect("manage-study-change-member");
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-change-member-cya");
    }
});

// Manage study - delete member 
router.post('/manage-study-delete-member', function(req, res) {
    let deleteMember = req.session.data['delete-member']

    if (deleteMember == "yes") {
        res.redirect("manage-study-delete-member-complete")
    } else if (deleteMember == "no") {
        res.redirect("manage-study")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-delete-member")
    }
})

// Register study - study information
router.post('/register-study', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("register-study-add-members")
})

// Register study - do you need to add study members
router.post('/register-study-add-members', function(req, res) {
    let add = req.session.data['add-members']

    if (add == "yes") {
        res.redirect("register-study-add-member-details")
    } else if (add == "no") {
        res.redirect("register-study-sponsors")
    } else {
        res.redirect("register-study-add-members")
    }
})

// Register study - add study member details
router.post('/register-study-add-member-details', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("register-study-add-member-details-cya")
})

// Register study - add study member completed
router.post('/register-study-add-member-completed', function(req, res) {
    let more = req.session.data['add-more-members']

    if (more == "yes") {
        res.redirect("register-study-add-member-details")
    } else if (more == "no") {
        res.redirect("register-study-sponsors")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("register-study-add-member-completed")
    }
})

// Register study - add sponsor details
router.post('/register-study-sponsors', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("register-study-sponsors-cya")
})

// Register study - add sponsor details completed
router.post('/register-study-sponsors-completed', function(req, res) {
    let more = req.session.data['add-more-sponsors']

    if (more == "yes") {
        res.redirect("register-study-sponsors")
    } else if (more == "no") {
        res.redirect("register-study-related")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("register-study-sponsors-completed")
    }
})

// Register study - is study related to other studies?
router.post('/register-study-related', function(req, res) {
    let related = req.session.data['study-related']

    if (related == "yes") {
        res.redirect("register-study-related-information")
    } else if (related == "no") {
        res.redirect("check-your-answers")
    } else {
        res.redirect("register-study-related")
    }
})

// Regsiter study - related study information
router.post('/register-study-related-information', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("check-your-answers")
})

module.exports = router