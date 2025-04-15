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
let version = 'v3';

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

    if (!funding) {
        res.redirect("does-related-study-have-same-funding-id")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("check-your-answers")
    }
})


module.exports = router