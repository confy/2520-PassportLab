const userModel = require("../models/userModel").userModel;
const database = require("../models/userModel").database;

const getUserByEmailIdAndPassword = (email, password) => {
    let user = userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};
const getUserById = (id) => {
    let user = userModel.findById(id);
    if (user) {
        return user;
    }
    return null;
};

function isUserValid(user, password) {
    return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
    let user = database.find((user) => user.id === profile.id)
    if (typeof user != "undefined") {
        return user
    }
    newUser = {
        id: profile.id,
        name: profile.name,
        role: "admin"
    }
    database.push(newUser)
    return newUser
}

module.exports = {
    getUserByEmailIdAndPassword,
    getUserById,
    getUserByGitHubIdOrCreate
};