// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const authorize = require("../utils/auth");

// Route to get all comments
router.get("/", (req, res) => {
    Comment.findAll({})
    .then(userPostData => res.json(userPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to Create new comments
router.post("/", authorize, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(userPostData => res.json(userPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// Route to delete comments
router.delete("/:id", authorize, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userPostData => {
        if (!userPostData) {
            res.status(404).send("You got no comment with that id");
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});

module.exports = router;