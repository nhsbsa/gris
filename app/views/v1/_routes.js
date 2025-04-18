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

// Add the ORCID ID or email of at least one study member
router.post('/add-study-member-email', function(req, res) {
    let email = req.session.data['add-members']

    if (email == "add") {
        res.redirect("add-study-member-email")
        // Redirecting to same page as no screen on provided designs for adding members
    } else {
        res.redirect("who-is-the-sponsor")
    }
})

// Who is the sponsor of the research?
router.post('/who-is-the-sponsor', function(req, res) {
    let name = req.session.data['sponsor-name']
    let email = req.session.data['sponsor-email']

    if (!email || email.trim() === "" || !name || name.trim() === "") {
        res.redirect("who-is-the-sponsor")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("we-found-a-matching-study")
    }
})

// Is this study related to other studies?
router.post('/related-to-other-studies', function(req, res) {
    let study = req.session.data['study-related']

    if (study == "yes" || study == "no" || study == "unsure") {
        res.redirect("do-you-know-gris-id")
    } else {
        res.redirect("related-to-other-studies")
        // add proper error functionality in future versions instead of redirect
    }
})

// Do you know the GRIS ID of the related study?
router.post('/do-you-know-gris-id', function(req, res) {
    let study = req.session.data['study-gris-id']

    if (study == "yes") {
        res.redirect("relationship-between-studies")
    } else if ( study == "no" || study == "unsure") {
        res.redirect("does-related-study-have-same-iras-id");
    } else {
        res.redirect("do-you-know-gris-id")
        // add proper error functionality in future versions instead of redirect
    }
})

// What is the relationship between the current study and the related study?
router.post('/relationship-between-studies', function(req, res) {
    let relationship = req.session.data['study-relationship']

    if (relationship == "sub" || relationship == "parent" || relationship == "platform" || relationship == "cont" || relationship == "unsure") {
        res.redirect("does-related-study-have-same-iras-id")
    } else {
        res.redirect("relationship-between-studies")
        // add proper error functionality in future versions instead of redirect
    }
})

// Does the related study have the same IRAS ID as the new study?
router.post('/does-related-study-have-same-iras-id', function(req, res) {
    let iras = req.session.data['iras-id']

    if (iras == "yes" || iras == "no" || iras == "unsure") {
        res.redirect("does-related-study-have-same-funding-id")
    } else {
        res.redirect("does-related-study-have-same-iras-id")
        // add proper error functionality in future versions instead of redirect
    }
})

// Does the related study have the same funding ID as the new study?
router.post('/does-related-study-have-same-funding-id', function(req, res) {
    let funding = req.session.data['funding-id']

    if (!funding) {
        res.redirect("does-related-study-have-same-funding-id")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("check-your-answers")
    }
})


module.exports = router