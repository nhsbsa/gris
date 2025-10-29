const express = require('express')
const router = express.Router()

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

// Dashboard - Don't let user view unless logged in
let version = 'v6';

router.get('/dashboard', function (req, res) {
    let currentPath = req.path;

    if (req.session.data['loggedIn']) {
        res.render(`${version}/dashboard`, { currentPath });
    } else {
        res.redirect('sign-in');
    }
});

// Sign out functionality
router.get('/sign-out', function (req, res) {
    req.session.destroy(function () {
        res.redirect('you-are-now-signed-out');
    });
});

// Register study - what is the short title of the study?
router.post('/what-is-the-short-title', function(req, res) {
    let title = req.session.data['short-title']

    if (!title || title.trim() === "") {
        res.redirect("what-is-the-short-title")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("disease-area-speciality")
    }
})

// Register study - disease area speciality
router.post('/disease-area-speciality', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("government-strategic-priority")
})

// Register study - government strategic priority
router.post('/government-strategic-priority', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("study-stage")
})

// Register study - stage stage
router.post('/study-stage', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("study-phase")
})

// Register study - study phase
router.post('/study-phase', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("study-setting")
})

// Register study - study setting
router.post('/study-setting', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("study-location")
})

// Register study - study location
router.post('/study-location', function(req, res) {
    // Need to add rules here for checking fields are not empty etc.

    // For now, just redirect to next page on submit:
    res.redirect("chief-investigator-name")
})

// Register study - chief investigator name

// Register study - chief investigator email
router.post('/chief-investigator-email', function(req, res) {
    let email = req.session.data['investigator-email']

    if (!email || email.trim() === "") {
        // add proper error functionality in future versions instead of redirect
        res.redirect("chief-investigator-email")
    } else {
        res.redirect("add-additional-study-members")
    }
})

// Register study - do you need to add additional study members?
router.post('/add-additional-study-members', function(req, res) {
    let add = req.session.data['add-members']

    if (add == "yes") {
        res.redirect("add-study-member-name")
    } else if (add == "no") {
        res.redirect("who-is-the-sponsor")
    } else {
        res.redirect("add-additional-study-members")
    }
})

// Register study - add additional member (name)
router.post('/add-study-member-name', function(req, res) {
    let name = req.session.data['add-full-name']

    if (!name || name.trim() === "") {
        res.redirect("add-study-member-name")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-email")
    }
})

// Register study - add additional member (email)
router.post('/add-study-member-email', function(req, res) {
    let email = req.session.data['add-member-email']

    if (!email || email.trim() === "") {
        res.redirect("add-study-member-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-check-answers")
    }
})

// Register study - add additional member (completed)
router.post('/add-study-member-completed', function(req, res) {
    let more = req.session.data['add-more-members']

    if (more == "yes") {
        res.redirect("add-study-member-name")
    } else if (more == "no") {
        res.redirect("who-is-the-sponsor")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("add-study-member-completed")
    }
})

// Register study - who is the sponsor of the research (name)
router.post('/who-is-the-sponsor', function(req, res) {
    let name = req.session.data['sponsor-name']

    if (!name || name.trim() === "") {
        res.redirect("who-is-the-sponsor")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("who-is-the-sponsor-type")
    }
})

// Register study - who is the sponsor of the research (type)
router.post('/who-is-the-sponsor-type', function(req, res) {
    let type = req.session.data['sponsor-type']

    if (type == "nhs-organisation" || type == "higher-education-institution" || type == "commercial-company" || type == "government-or-public-sector-body" || type == "charity-or-not-for-profit-organisation" || type == "other") {
        res.redirect("who-is-the-sponsor-email")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("who-is-the-sponsor-type")
    }
})

// Register study - who is the sponsor of the research (email)
router.post('/who-is-the-sponsor-email', function(req, res) {
    let email = req.session.data['sponsor-email']

    if (!email || email.trim() === "") {
        res.redirect("who-is-the-sponsor-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("who-is-the-sponsor-check-answers")
    }
})

// Register study - who is the sponsor of the research (completed)
router.post('/who-is-the-sponsor-completed', function(req, res) {
    let more = req.session.data['add-more-sponsors']

    if (more == "yes") {
        res.redirect("who-is-the-sponsor")
    } else if (more == "no") {
        res.redirect("related-to-other-studies")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("who-is-the-sponsor-completed")
    }
})

// Register study - is this study related to other studies?
router.post('/related-to-other-studies', function(req, res) {
    let study = req.session.data['study-related']

    if (study == "yes") {
        res.redirect("related-study-gris-id")
    } else  if ( study == "no") {
        res.redirect("check-your-answers")
    } else {
        res.redirect("related-to-other-studies")
        // add proper error functionality in future versions instead of redirect
    }
})

// Register study - do you know the GRIS ID of the related study?
router.post('/related-study-gris-id', function(req, res) {
    let study = req.session.data['study-gris-id']

    if (study == "yes" || study == "no") {
        res.redirect("related-study-relationship")
    } else {
        res.redirect("related-study-gris-id")
        // add proper error functionality in future versions instead of redirect
    }
})

// Register study - what is the relationship between the current study and the related study?
router.post('/related-study-relationship', function(req, res) {
    let relationship = req.session.data['study-relationship']

    if (relationship == "sub" || relationship == "parent" || relationship == "platform" || relationship == "cont") {
        res.redirect("related-study-iras-id")
    } else {
        res.redirect("related-study-relationship")
        // add proper error functionality in future versions instead of redirect
    }
})

// Register study - does the related study have the same IRAS ID as the new study?
router.post('/related-study-iras-id', function(req, res) {
    let iras = req.session.data['iras-id']

    if (iras == "yes" || iras == "no") {
        res.redirect("related-study-funding-id")
    } else {
        res.redirect("related-study-iras-id")
        // add proper error functionality in future versions instead of redirect
    }
})

// Register study - does the related study have the same funding ID as the new study?
router.post('/related-study-funding-id', function(req, res) {
    let funding = req.session.data['funding-id']

    if (funding == "yes" || funding == "no") {
        res.redirect("related-study-select-funding")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("related-study-funding-id")
    }
})

// Register study - select the funding ID for the study
router.post('/related-study-select-funding', function(req, res) {
    let funding = req.session.data['funding-name']

    if (funding) {
        res.redirect("check-your-answers")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("related-study-select-funding")
    }
})

module.exports = router