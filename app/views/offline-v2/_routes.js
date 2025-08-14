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
    }
})

module.exports = router