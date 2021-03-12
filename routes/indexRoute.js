const express = require("express");
const { session } = require("passport");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const userModel = require("../models/userModel").userModel;


router.get("/", (req, res) => {
    res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user,
    });
});

router.get("/admin", isAdmin, (req, res) => {
    let activeSessions = {}
    Object.keys(req.sessionStore.sessions).forEach(sessionID => {
        let decodedSession = JSON.parse(req.sessionStore.sessions[sessionID])
        let userID = decodedSession.passport.user
        let user = userModel.findById(userID)

        activeSessions[sessionID] = [userID, user.name]
    })
    let adminUser = req.user.name
    res.render("admin", {
        sessions: activeSessions,
        adminUser: adminUser
    })
})

router.get("/admin/destroy/:sessionID", isAdmin, (req, res) => {
    let sessionID = req.params.sessionID
    let store = req.sessionStore
    store.destroy(sessionID, (err) => {
        console.log("Error while destroying the session")
    })
    res.redirect("/admin")
})

module.exports = router;