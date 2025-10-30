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
let version = 'offline-v4';

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