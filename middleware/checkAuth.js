const getUserById = require("../controllers/userController").getUserById

module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/auth/login");
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/dashboard");
    },
    isAdmin: function(req, res, next) {
        sessionUser = req.user
        if (sessionUser) {
            let user = getUserById(sessionUser.id)
            if (user.role == "admin") {
                return next()
            }
            res.redirect("/dashboard")
        } else {
            res.redirect("/")
        }
    },
};