// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const authorize = require("../utils/auth");

// route to get users
router.get("/", (req,res) => {
    User.findAll({
        attribute: { exclude: ["[password]"] }
    })
    .then(userPostData => res.json(userPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});