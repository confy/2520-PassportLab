const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const userController = require("../controllers/userController")
const router = express.Router();


router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
    })
);

router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
});

module.exports = router;