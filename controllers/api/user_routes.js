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
            res.status(404).send("Could not find a post");
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
    
})