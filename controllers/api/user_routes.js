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

// Route to get one user
router.get("/:id", (req,res) => {
    User.findOne({
        attribute: { exclude: ["[password]"] },
        where: {
            id: req.params.id
        },
        include: [
        {
        model: Post,
        attributes: [
            "id",
            "post_text",
            "title",
            "user_id"
            ]
        },
        {
            model: Comment,
            attributes: [
                "id",
                "comment_text",
                "post_id"
            ],
            include: {
                model: Post,
                attributes: ["title"]
            }
        }
    ]
    })
    .then(userPostData => {
        if (!userPostData) {
            res.status(404).send("You got another problem");
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});

// Route to create a new user
router.post("/", (req, res) => {
    User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    })
    .then(userPostData => {
        req.session.save(() => {
            // Session Variables
            req.session.user_id = userPostData.id;
            req.session.user_name = userPostData.user_name;
            req.session.logged_in = true;
        });
    });
});

// Route to verify user
router.get("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userPostData => {
        if (!userPostData) {
            res.status(404).send("Oh No!");
            return;
        }

        // Verifying password
        const validatePassword = userPostData.checkPassword(req.body.password);
        if (!validatePassword) {
            res.status(404).send("That is not the right password");
            return;
        }
        req.session.save(() => {
            // Session Variables
            req.session.user_id = userPostData.id;
            req.session.user_name = userPostData.user_name;
            req.session.logged_in = true;

            res.json.send("You are logged in!");
        });
    });
});