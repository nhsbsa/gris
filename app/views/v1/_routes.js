const express = require('express')
const router = express.Router()

// Does this study already have a Government Research (GRIS) ID?
router.post('/does-study-have-gris-id', function(req, res) {
    let study = req.session.data['has-study-id']

    if (study == "yes") {
        res.redirect("related-to-other-studies")
    } else {
        res.redirect("what-is-the-short-title")
    }
})

// What is the short title of the study?
router.post('/what-is-the-short-title', function(req, res) {
    let title = req.session.data['short-title']

    if (!title || title.trim() === "") {
        res.redirect("what-is-the-short-title")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("orcid-and-email-address")
    }
})

// What is the ORCID ID and email address of the Chief Investigator or key lead?
router.post('/orcid-and-email-address', function(req, res) {
    let orcid = req.session.data['orcid-id']

    if (!orcid || orcid.trim() === "") {
        res.redirect("orcid-and-email-address")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("confirm-chief-investigator-details")
    }
})

// Confirm Chief Investigator or key lead details
router.post('/confirm-chief-investigator-details', function(req, res) {
    let email = req.session.data['investigator-email']

    if (!email || email.trim() === "") {
        res.redirect("confirm-chief-investigator-details")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-email")
    }
})

module.exports = router