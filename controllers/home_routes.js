// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");

// Once User logins, this route will direct them to the homepage
router.get("/login", (req, res) => {
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup");
})