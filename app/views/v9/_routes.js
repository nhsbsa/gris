const express = require('express')
const router = express.Router()
const path = require('path')

let version = 'v9';

// Register an account - name
router.post('/register-account-name', function(req, res) {
    let registerName = req.session.data['name-register']

    if (!registerName || registerName.trim() === "") {
        res.redirect("register-account-name")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-email")
    }
})

// Register an account - email
router.post('/register-account-email', function(req, res) {
    let registerEmail = req.session.data['email-register']

    if (!registerEmail || registerEmail.trim() === "") {
        res.redirect("register-account-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-check-email")
    }
})

// Register an account - security code
router.post('/register-account-check-email', function(req, res) {
    let registerCode = req.session.data['code-register']

    if (!registerCode || registerCode.trim() === "") {
        res.redirect("register-account-check-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-create-password")
    }
})

// Register an account - create password
router.post('/register-account-create-password', function(req, res) {
    let registerPass = req.session.data['password-register']

    if (!registerPass || registerPass.trim() === "") {
        res.redirect("register-account-create-password")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-choose-auth")
    }
})

// Register an account - choose 2FA method
router.post('/register-account-choose-auth', function(req, res) {
    let registerAuth = req.session.data['auth-register']

    if (registerAuth == "text-message") {
        res.redirect("register-account-mobile")
    } else if (registerAuth == "authenticator-app") {
        res.redirect("register-account-authenticator")
    } else {
        res.redirect("egister-account-choose-auth")
    }
})

// Register an account - enter mobile number
router.post('/register-account-mobile', function(req, res) {
    let registerMobile = req.session.data['mobile-register']

    if (!registerMobile || registerMobile.trim() === "") {
        res.redirect("register-account-mobile")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-mobile-code")
    }
})

// Register an account - phone code
router.post('/register-account-mobile-code', function(req, res) {
    let phoneCode = req.session.data['code-register']

    if (!phoneCode || phoneCode.trim() === "") {
        res.redirect("register-account-mobile-code")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-completed")
    }
})

// Register an account - authenticator app
router.post('/register-account-authenticator', function(req, res) {
    let authenticatorCode = req.session.data['auth-code-register']

    if (!authenticatorCode || authenticatorCode.trim() === "") {
        res.redirect("register-account-authenticator")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("register-account-completed")
    }
})

// Sign in
router.post('/sign-in', function(req, res) {
    let emailLogin = req.session.data['email-login']

    if (!emailLogin || emailLogin.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "sign-in"), {
            errorSummary: true
        });
    } else {
        res.redirect("enter-your-password")
    }
})

// Enter your password
router.post('/enter-your-password', function(req, res) {
    let password = req.session.data['password']

    if (!password || password.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "enter-your-password"), {
            errorSummary: true
        });
    } else {
        res.redirect("enter-auth-code")
    }
})

// Forgot my password
router.post('/forgot-my-password', function(req, res) {
    let passwordCode = req.session.data['forgot-password']

    if (!passwordCode || passwordCode.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "forgot-my-password"), {
            errorSummary: true
        });
    } else {
        res.redirect("reset-my-password")
    }
})

// Reset my password
router.post('/reset-my-password', function(req, res) {
    let passwordReset = req.session.data['password-reset']

    if (!passwordReset || passwordReset.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "reset-my-password"), {
            errorSummary: true
        });
    } else {
        res.redirect("reset-my-password-completed")
    }
})

// Enter auth code
router.post('/enter-auth-code', function(req, res) {
    let code = req.session.data['auth-code']

    if (!code || code.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "enter-auth-code"), {
            errorSummary: true
        });
    } else {
        req.session.data['loggedIn'] = true;
        res.redirect("dashboard")
    }
})

// If signed in already, don't let the user go to certain screens
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
        // Error message functionality
        return res.render(path.join(__dirname, "manage-study-change-title"), {
            errorSummary: true
        });
    } else {
        // Redirect to the "check your answers" page if filled
        res.redirect("manage-study-change-title-cya");
    }
});

// Register study - what is the short title of the study?
router.post('/what-is-the-short-title', function(req, res) {
    let title = req.session.data['short-title']

    if (!title || title.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "what-is-the-short-title"), {
            errorSummary: true
        });
    } else if (title == "Investigating"){
        res.redirect("we-found-matching-study")
    } else {
        res.redirect("who-is-the-sponsor")
    }
})

// Register study - we found a matching study
router.post('/we-found-matching-study', function(req, res) {
    let match = req.session.data['matching-study']

    if (match == "yes") {
        res.redirect("my-studies")
    } else if (match == "no") {
        res.redirect("who-is-the-sponsor")
    } else {
        // Error message functionality
        return res.render(path.join(__dirname, "we-found-matching-study"), {
            errorSummary: true
        });
    }
})

// Register study - who is the sponsor of the research (name)
router.post('/who-is-the-sponsor', function(req, res) {
    let name = req.session.data['sponsor-name']

    if (!name || name.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "who-is-the-sponsor"), {
            errorSummary: true
        });
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("who-is-the-sponsor-email")
    }
})

// Register study - who is the sponsor of the research (email)
router.post('/who-is-the-sponsor-email', function(req, res) {
    let email = req.session.data['sponsor-email']

    if (!email || email.trim() === "") {
        // Error message functionality
        return res.render(path.join(__dirname, "who-is-the-sponsor-email"), {
            errorSummary: true
        });
    } else {
        res.redirect("who-is-the-sponsor-check-answers")
    }
})

// Register study - who is the sponsor of the research (completed)
router.post('/who-is-the-sponsor-completed', function(req, res) {
    let more = req.session.data['add-more-sponsors']

    if (more == "yes") {
        res.redirect("who-is-the-sponsor")
    } else if (more == "no") {
        res.redirect("does-study-have-iras-id")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("who-is-the-sponsor-completed")
    }
})

// Register study - does study have an IRAS ID?
router.post('/does-study-have-iras-id', function(req, res) {
    const iras = req.session.data['iras-id']
    const irasInput = req.session.data['iras-id-input']

    // 1. Nothing selected
    if (!iras) {
        return res.render(path.join(__dirname, "does-study-have-iras-id"), {
            errorSummary: true,
            radioError: {
                text: "Select if this study has an IRAS ID"
            }
        });
    }

    // 2. Yes selected but no input
    if (iras === "yes" && (!irasInput || irasInput.trim() === "")) {
        return res.render(path.join(__dirname, "does-study-have-iras-id"), {
            errorSummary: true,
            inputError: {
                text: "Enter an IRAS ID"
            }
        });
    }

    // 3. Valid
    res.redirect("check-your-answers")
})

module.exports = router