const express = require('express')
const router = express.Router()

let version = 'v7';

// Register an account - email
router.post('/register-account', function(req, res) {
    let registerEmail = req.session.data['email-register']

    if (!registerEmail || registerEmail.trim() === "") {
        res.redirect("register-account")
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
        res.redirect("manage-study-change-title");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if filled
        res.redirect("manage-study-change-title-cya");
    }
});

// Manage study - change chief investigator
router.post('/manage-study-change-ci', function (req, res) {
  // Reset if no input sent
  if (!('change-ci' in req.body)) {
    req.session.data['change-ci'] = null;
  }

  let changeCi = req.session.data['change-ci'];

  if (!changeCi) {
    res.redirect("manage-study-change-ci");
  } else if (changeCi == "jane" || changeCi == "joe") {
    res.redirect("manage-study-change-ci-cya");
  } else if (changeCi == "new") {
    res.redirect("manage-study-change-ci-name");
  }
});

// Manage study - change chief investigator (new - name)
router.post('/manage-study-change-ci-name', function(req, res) {
    let newCiName = req.session.data['new-ci-name'];

    if (!newCiName || newCiName.trim() === "") {
        res.redirect("manage-study-change-ci-name");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if filled
        res.redirect("manage-study-change-ci-email");
    }
})

// Manage study - change chief investigator (new - email)
router.post('/manage-study-change-ci-email', function(req, res) {
    let newCiEmail = req.session.data['new-ci-email'];

    if (!newCiEmail || newCiEmail.trim() === "") {
        res.redirect("manage-study-change-ci-email");
        // Add error message functionality here
    } else {
        // Redirect to the "check your answers" page if filled
        res.redirect("manage-study-change-ci-cya");
    }
})

// Manage study - change chief investigator (check answers)
router.post('/manage-study-change-ci-cya', function(req, res) {
    let confirm = req.session.data['are-you-sure']

    if (confirm == "yes") {
        res.redirect("manage-study-change-ci-complete")
    } else if (confirm == "no") {
        res.redirect("view-my-study")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-change-ci-cya")
    }
})


// Manage my study - add a member (name)
router.post('/manage-study-add-member', function(req, res) {
    let name = req.session.data['member-full-name']

    if (!name || name.trim() === "") {
        res.redirect("manage-study-add-member")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-add-member-email")
    }
})

// Manage my study - add a member (email)
router.post('/manage-study-add-member-email', function(req, res) {
    let email = req.session.data['member-email-address']

    if (!email || email.trim() === "") {
        res.redirect("manage-study-add-member-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-add-member-permissions")
    }
})

// Manage my study - add a member (permissions)
router.post('/manage-study-add-member-permissions', function(req, res) {
    let permissions = req.session.data['permissions']

    if (permissions == "read-only" || permissions == "editor") {
        res.redirect("manage-study-add-member-cya")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-add-member-permissions")
    }
})

// Manage my study - change member (name)
router.post('/manage-study-change-member', function(req, res) {
    let name = req.session.data['change-full-name'];

    // Check if name is blank
    if (!name || name.trim() === "") {
        // Don't progress if blank
        res.redirect("manage-study-change-member");
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-change-member-email");
    }
});

// Manage study - change member (email)
router.post('/manage-study-change-member-email', function(req, res) {
    let email = req.session.data['change-email-address'];

    // Check if email is blank
    if (!email || email.trim() === "") {
        // Don't progress if blank
        res.redirect("manage-study-change-member-email");
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("manage-study-change-member-permissions");
    }
});

// Manage study - change member (permissions)
router.post('/manage-study-change-member-permissions', function(req, res) {
    let permissions = req.session.data['change-permissions'];

    if (permissions == "read-only" || permissions == "editor") {
        res.redirect("manage-study-change-member-cya")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-change-member-permissions")
    }
});

// Manage study - delete member 
router.post('/manage-study-delete-member', function(req, res) {
    let deleteMember = req.session.data['delete-member']

    if (deleteMember == "yes") {
        res.redirect("manage-study-delete-member-complete")
    } else if (deleteMember == "no") {
        res.redirect("view-my-study")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("manage-study-delete-member")
    }
})

// Register study - are you the chief investigator?
router.post('/are-you-chief-investigator', function(req, res) {
    let ci = req.session.data['chief-investigator']

    if (ci == "yes") {
        res.redirect("what-is-the-short-title")
    } else if (ci == "no") {
        res.redirect("we-could-not-register-study")
    } else {
        res.redirect("are-you-chief-investigator")
    }
})

// Register study - what is the short title of the study?
router.post('/what-is-the-short-title', function(req, res) {
    let title = req.session.data['short-title']

    if (!title || title.trim() === "") {
        res.redirect("what-is-the-short-title")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-additional-study-members")
    }
})

// Register study - do you need to add additional study members?
router.post('/add-additional-study-members', function(req, res) {
    let add = req.session.data['add-members']

    if (add == "yes") {
        res.redirect("add-study-member-name")
    } else if (add == "no") {
        res.redirect("check-your-answers")
    } else {
        res.redirect("add-additional-study-members")
    }
})

// Register study - add additional member (name)
router.post('/add-study-member-name', function(req, res) {
    let name = req.session.data['add-full-name']

    if (!name || name.trim() === "") {
        res.redirect("add-study-member-name")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-email")
    }
})

// Register study - add additional member (email)
router.post('/add-study-member-email', function(req, res) {
    let email = req.session.data['add-member-email']

    if (!email || email.trim() === "") {
        res.redirect("add-study-member-email")
        // add proper error functionality in future versions instead of redirect
    } else {
        res.redirect("add-study-member-permissions")
    }
})

// Register study - add additional member (permissions)
router.post('/add-study-member-permissions', function(req, res) {
    let permissions = req.session.data['add-member-permissions']

    if (permissions == "read-only" || permissions == "editor") {
        res.redirect("add-study-member-check-answers")
    } else {
        // add proper error functionality in future versions instead of redirect
        res.redirect("add-study-member-permissions")
    }
})

// Register study - add additional member (completed)
router.post('/add-study-member-completed', function(req, res) {
    let more = req.session.data['add-more-members']

    if (more == "yes") {
        res.redirect("add-study-member-name")
    } else if (more == "no") {
        res.redirect("check-your-answers")
    } else {
        // no option selected - add proper error functionality in future versions instead of redirect
        res.redirect("add-study-member-completed")
    }
})

module.exports = router