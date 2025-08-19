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
let version = 'offline-v2';

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

module.exports = router