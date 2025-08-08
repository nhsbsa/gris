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
        res.redirect("search")
    }
})

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