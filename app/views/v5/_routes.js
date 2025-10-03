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
let version = 'v5';

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

// Manage study - add a sponsor
router.post('/manage-study-add-sponsor', function(req, res) {
    let name = req.session.data['add-sponsor-name'];

    // Check that name is provided and not just whitespace
    if (!name || name.trim() === "") {
        // Redirect back to the add sponsor page if field is blank
        res.redirect("manage-study-add-sponsor");
        // Add error message functionality here
    } else {
        // Redirect to the add email if field is filled
        res.redirect("manage-study-add-sponsor-email");
    }
});

// Manage study - add a sponsor email address
router.post('/manage-study-add-sponsor-email', function(req, res) {
    let email = req.session.data['add-sponsor-email'];

    // Check that email is provided and not just whitespace
    if (!email || email.trim() === "") {
        // Redirect back to the add sponsor email page if field is blank
        res.redirect("manage-study-add-sponsor-email");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if field is filled
        res.redirect("manage-study-add-sponsor-cya");
    }
});

// Manage study - change sponsor
router.post('/manage-study-change-sponsor', function(req, res) {
    let name = req.session.data['change-sponsor-name'];

    // Check that name is provided and not just whitespace
    if (!name || name.trim() === "") {
        // Redirect back to the change sponsor page if blank
        res.redirect("manage-study-change-sponsor");
        // Add error message functionality here
    } else {
        // Redirect to the change sponsor email page if filled
        res.redirect("manage-study-change-sponsor-email");
    }
});

// Manage study - change sponsor email
router.post('/manage-study-change-sponsor-email', function(req, res) {
    let email = req.session.data['change-sponsor-email'];

    // Check that email is provided and not just whitespace
    if (!email || email.trim() === "") {
        // Redirect back to the change sponsor email page if blank
        res.redirect("manage-study-change-sponsor-email");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" if filled
        res.redirect("manage-study-change-sponsor-cya");
    }
});

// Manage study - delete member 
router.post('/manage-study-delete-member', function(req, res) {
    let deleteMember = req.session.data['delete-member']

    if (deleteMember == "yes") {
        res.redirect("manage-study-delete-member-complete")
    } else if (deleteMember == "no") {
        res.redirect("manage-my-study")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-delete-member")
    }
})

module.exports = router