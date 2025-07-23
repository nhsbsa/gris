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
        res.redirect("search-for-gris-id")
    }
})

// Search for a GRIS ID


// Sign out functionality
router.get('/sign-out', function (req, res) {
    req.session.destroy(function () {
        res.redirect('you-are-now-signed-out');
    });
});


// BELOW THIS LINE MIGHT BE NEEDED SO KEEP FOR NOW - ALL TAKEN FROM V3.1 ONLINE


// Manage my study - add a member (name)
router.post('/manage-my-study-add-member', function(req, res) {
    let name = req.session.data['member-full-name']

    if (!name || name.trim() === "") {
        res.redirect("manage-my-study-add-member")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-my-study-add-member-2")
    }
})

// Manage my study - add a member (email)
router.post('/manage-my-study-add-member-2', function(req, res) {
    let email = req.session.data['member-email-address']

    if (!email || email.trim() === "") {
        res.redirect("manage-my-study-add-member-2")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-my-study-add-member-3")
    }
})

// Manage my study - add a member (permissions)
router.post('/manage-my-study-add-member-3', function(req, res) {
    let permissions = req.session.data['permissions']

    if (permissions == "read only" || permissions == "editor") {
        res.redirect("manage-my-study-add-member-4")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-my-study-add-member-3")
    }
})

// Manage my study - add a sponsor (name)
router.post('/manage-my-study-add-sponsor', function(req, res) {
    let name = req.session.data['add-sponsor-name']

    if (!name || name.trim() === "") {
        res.redirect("manage-my-study-add-sponsor")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-my-study-add-sponsor-2")
    }
})

// Manage my study - add a sponsor (email)
router.post('/manage-my-study-add-sponsor-2', function(req, res) {
    let email = req.session.data['add-sponsor-email']

    if (!email || email.trim() === "") {
        res.redirect("manage-my-study-add-sponsor-2")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-my-study-add-sponsor-3")
    }
})

// Does this study already have a Government Research (GRIS) ID?
router.post('/does-study-have-gris-id', function(req, res) {
    let study = req.session.data['has-study-id']

    if (study == "yes") {
        res.redirect("related-to-other-studies")
    } else if (study == "no") {
        res.redirect("what-is-the-short-title")
    } else {
        // None selected add error in future here instead of redirect
        res.redirect("does-study-have-gris-id")
    }
})

// What is the short title of the study?
router.post('/what-is-the-short-title', function(req, res) {
    let title = req.session.data['short-title']

    if (!title || title.trim() === "") {
        res.redirect("what-is-the-short-title")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("orcid-id-chief-investigator")
    }
})

// What is the ORCID ID of the Chief Investigator or key lead?
router.post('/orcid-id-chief-investigator', function(req, res) {
    let orcidOne = req.session.data['orcid-id-one']
    let orcidTwo = req.session.data['orcid-id-two']
    let orcidThree = req.session.data['orcid-id-three']
    let orcidFour = req.session.data['orcid-id-four']

    if (!orcidOne || orcidOne.trim() === "" || !orcidTwo || orcidTwo.trim() === "" || !orcidThree || orcidThree.trim() === "" || !orcidFour || orcidFour.trim() === "") {
        res.redirect("orcid-id-chief-investigator")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("confirm-chief-investigator-details")
    }
})

// Confirm Chief Investigator or key lead details
router.post('/confirm-chief-investigator-details', function(req, res) {
    let confirm = req.session.data['confirm-chief']

    if (confirm == "yes") {
        res.redirect("add-chief-investigator-email")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("confirm-chief-investigator-details")
    }
})

// Add email address of Chief Investigator of key lead
router.post('/add-chief-investigator-email', function(req, res) {
    let email = req.session.data['investigator-email']

    if (!email || email.trim() === "") {
        // add proper error functionality in future versions instead of redirect
        res.redirect("add-chief-investigator-email")
    } else {
        res.redirect("add-additional-study-members")
    }
})

// Do you need to add additional study members?
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

// Add additional member (name)
router.post('/add-study-member-name', function(req, res) {
    let name = req.session.data['add-full-name']

    if (!name || name.trim() === "") {
        res.redirect("add-study-member-name")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-email")
    }
})

// Add additional member (email)
router.post('/add-study-member-email', function(req, res) {
    let email = req.session.data['add-member-email']

    if (!email || email.trim() === "") {
        res.redirect("add-study-member-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-permissions")
    }
})

// Add additional member (permissions)
router.post('/add-study-member-permissions', function(req, res) {
    let permissions = req.session.data['add-member-permissions']

    if (permissions == "read only" || permissions == "editor") {
        res.redirect("add-study-member-check-answers")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("add-study-member-permissions")
    }
})

// Add additional member (completed)
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

// Who is the sponsor of the research? (name)
router.post('/who-is-the-sponsor', function(req, res) {
    let name = req.session.data['sponsor-name']

    if (!name || name.trim() === "") {
        res.redirect("who-is-the-sponsor")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("who-is-the-sponsor-email")
    }
})

// Who is the sponsor of the research? (email)
router.post('/who-is-the-sponsor-email', function(req, res) {
    let email = req.session.data['sponsor-email']

    if (!email || email.trim() === "") {
        res.redirect("who-is-the-sponsor-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("who-is-the-sponsor-check-answers")
    }
})

// Who is the sponsor of the research? (completed)
router.post('/who-is-the-sponsor-completed', function(req, res) {
    let more = req.session.data['add-more-sponsors']

    if (more == "yes") {
        res.redirect("who-is-the-sponsor")
    } else if (more == "no") {
        res.redirect("we-found-a-matching-study")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("who-is-the-sponsor-completed")
    }
})

// We found a matching study
router.post('/we-found-a-matching-study', function(req, res) {
    let matching = req.session.data['use-matching-study']

    if (matching == "yes" || matching == "no") {
        res.redirect("gris-confirmed")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("we-found-a-matching-study")
    }
})

// Is this study related to other studies?
router.post('/related-to-other-studies', function(req, res) {
    let study = req.session.data['study-related']

    if (study == "yes" || study == "no") {
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
    } else if ( study == "no") {
        res.redirect("does-related-study-have-same-iras-id");
    } else {
        res.redirect("do-you-know-gris-id")
        // add proper error functionality in future versions instead of redirect
    }
})

// What is the relationship between the current study and the related study?
router.post('/relationship-between-studies', function(req, res) {
    let relationship = req.session.data['study-relationship']

    if (relationship == "sub" || relationship == "parent" || relationship == "platform" || relationship == "cont") {
        res.redirect("does-related-study-have-same-iras-id")
    } else {
        res.redirect("relationship-between-studies")
        // add proper error functionality in future versions instead of redirect
    }
})

// Does the related study have the same IRAS ID as the new study?
router.post('/does-related-study-have-same-iras-id', function(req, res) {
    let iras = req.session.data['iras-id']

    if (iras == "yes" || iras == "no") {
        res.redirect("does-related-study-have-same-funding-id")
    } else {
        res.redirect("does-related-study-have-same-iras-id")
        // add proper error functionality in future versions instead of redirect
    }
})

// Does the related study have the same funding ID as the new study?
router.post('/does-related-study-have-same-funding-id', function(req, res) {
    let funding = req.session.data['funding-id']

    if (funding == "yes" || funding == "no") {
        res.redirect("select-funding-id")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("does-related-study-have-same-funding-id")
    }
})

// Select the funding ID for the study
router.post('/select-funding-id', function(req, res) {
    let funding = req.session.data['funding-name']

    if (funding) {
        res.redirect("check-your-answers")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("select-funding-id")
    }
})


module.exports = router