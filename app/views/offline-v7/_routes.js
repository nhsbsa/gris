const express = require('express')
const router = express.Router()
const path = require('path')

let version = 'offline-v7';

// NHS Login
router.post('/nhs-login', function(req, res) {
    let email = req.session.data['email-login']

    if (!email || email.trim() === "") {
        res.redirect("nhs-login")
        // This page is not in toolkit or else would add error msg functionality here
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
    let title = String(req.session.data['search-study-title'] || '').trim(); 
    let grisID = String(req.session.data['search-gris-id'] || '').trim(); 
    
    // So long as no field is empty, show search results 
    if (title !== "" || grisID !== "") {
        res.redirect("search-results");
    } else {
        return res.render(path.join(__dirname, "search"), {
            errorSummary: true
        });
    }
})

// Register study - short title of study
router.post('/register-study', function(req, res) {
    let title = req.session.data['short-title']

    if (!title || title.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "register-study"), {
            errorSummary: true
        });
    }  else {
        res.redirect("register-study-add-member-details")
    }    
})

// Register study - add study member details
router.post('/register-study-add-member-details', function(req, res) {
    let name = req.session.data['add-full-name'];
    let email = req.session.data['add-member-email'];

    // Check if name or email are blank, or if permissions is invalid
    if (!name || name.trim() === "" || !email || email.trim() === "") {       
        // Error message functionality
        return res.render(path.join(__dirname, "register-study-add-member-details"), {
            errorSummary: true
        });
    } else {
        res.redirect("register-study-add-member-details-cya");
    }
})

// Register study - add study member completed
router.post('/register-study-add-member-completed', function(req, res) {
    let more = req.session.data['add-more-members']

    if (more == "yes") {
        res.redirect("register-study-add-member-details")
    } else if (more == "no") {
        res.redirect("check-your-answers")
    } else {
        // Error message functionality
        return res.render(path.join(__dirname, "register-study-add-member-completed"), {
            errorSummary: true
        });
    }
})

// Manage study - change title
router.post('/manage-study-change-title', function(req, res) {
    let changeTitle = req.session.data['change-title'];

    if (!changeTitle || changeTitle.trim() === "") {        
        // Error message functionality
        return res.render(path.join(__dirname, "manage-study-change-title"), {
            errorSummary: true
        });
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
        // Error message functionality
        return res.render(path.join(__dirname, "manage-study-add-member"), {
            errorSummary: true
        });
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
        // Error message functionality
        return res.render(path.join(__dirname, "manage-study-change-member"), {
            errorSummary: true
        });
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
        // Error message functionality
        return res.render(path.join(__dirname, "manage-study-delete-member"), {
            errorSummary: true
        });
    }
})

// Manage study - add note
router.post('/add-note', function(req, res) {
    let note = req.session.data['add-note'];

    // Check if name or email are blank, or if permissions is invalid
    if (!note || note.trim() === "") {        
        // Error message functionality
        return res.render(path.join(__dirname, "add-note"), {
            errorSummary: true
        });
    } else {
        res.redirect("add-note-complete");
    }
})

module.exports = router