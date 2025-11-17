const express = require('express')
const router = express.Router()
const path = require('path')

let version = 'offline-v5';

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

// Forgot my password
router.post('/forgot-my-password', function(req, res) {
    let passwordCode = req.session.data['forgot-password']

    if (!passwordCode || passwordCode.trim() === "") {
        res.redirect("forgot-my-password")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("reset-my-password")
    }
})

// Reset my password
router.post('/reset-my-password', function(req, res) {
    let passwordReset = req.session.data['password-reset']

    if (!passwordReset || passwordReset.trim() === "") {
        res.redirect("reset-my-password")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("reset-my-password-completed")
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

// If signed in already, don't let the user go to sign in, enter password, or enter auth code screens
router.get('/sign-in', function (req, res) {
    let currentPath = req.path;
    
    if (req.session.data['loggedIn']) {
       res.redirect('dashboard');
    } else {
        res.render(`${version}/sign-in`, { currentPath });
    }
});

router.get('/enter-password', function (req, res) {
    let currentPath = req.path;
    
    if (req.session.data['loggedIn']) {
       res.redirect('dashboard');
    } else {
        res.render(`${version}/enter-password`, { currentPath });
    }
});

router.get('/enter-auth-code', function (req, res) {
    let currentPath = req.path;
    
    if (req.session.data['loggedIn']) {
       res.redirect('dashboard');
    } else {
        res.render(`${version}/enter-auth-code`, { currentPath });
    }
});

// Dashboard - Don't let user view unless logged in
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
        res.redirect("check-your-answers")
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
        res.redirect("check-your-answers")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("register-study-add-member-completed")
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

// Manage study - change chief investigator 
router.post('/manage-study-change-ci', function(req, res) {
    let name = req.session.data['change-investigator-name'];
    let email = req.session.data['change-investigator-email'];

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" || !email || email.trim() === "") {
        res.redirect("manage-study-change-ci");
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-change-ci-cya");
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

// Manage study - change member 
router.post('/manage-study-change-member', function(req, res) {
    let name = req.session.data['change-full-name'];
    let email = req.session.data['change-email-address'];
    let permissions = req.session.data['change-permissions'];

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" ||
        !email || email.trim() === "" ||
        (permissions !== "read only" && permissions !== "editor")) {
        res.redirect("manage-study-change-member");
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-change-member-cya");
    }
});

// Manage study - delete member 
router.post('/manage-study-delete-member', function(req, res) {
    let deleteMember = req.session.data['delete-member']

    if (deleteMember == "yes") {
        res.redirect("manage-study-delete-member-complete")
    } else if (deleteMember == "no") {
        res.redirect("manage-study")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-delete-member")
    }
})

module.exports = router