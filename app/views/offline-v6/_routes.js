const express = require('express')
const router = express.Router()
const path = require('path')

let version = 'offline-v6';

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

// NHS Login
router.post('/nhs-login', function(req, res) {
    let email = req.session.data['email-login']

    if (!email || email.trim() === "") {
        res.redirect("nhs-login")
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

// If signed in already, don't let the user go to sign in, or auth screens
router.get('/sign-in', function (req, res) {
    let currentPath = req.path;
    
    if (req.session.data['loggedIn']) {
       res.redirect('dashboard');
    } else {
        res.render(`${version}/sign-in`, { currentPath });
    }
});

router.get('/nhs-login', function (req, res) {
    let currentPath = req.path;
    
    if (req.session.data['loggedIn']) {
       res.redirect('dashboard');
    } else {
        res.render(`${version}/nhs-login`, { currentPath });
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

    // If any field is NOT blank
    if (
        (title && title.trim() !== "") || (grisID && grisID.trim() !== "")
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
    res.redirect("register-study-add-member-details")
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

// Manage study - add a member 
router.post('/manage-study-add-member', function(req, res) {
    let name = req.session.data['member-full-name'];
    let email = req.session.data['member-email-address'];

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" || !email || email.trim() === "") {
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

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" || !email || email.trim() === "") {
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