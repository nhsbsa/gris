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
    let title = req.session.data['search-study-title']
    let grisID = req.session.data['search-gris-id']
    let ciEmail = req.session.data['search-ci-email']
    let ciName = req.session.data['search-ci-name']

    if (!title || title.trim() === "") {
        res.redirect("search")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("search-results")
    }
})

module.exports = router