// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const authorize = require("../utils/auth");

// Route to display one post
router.get("/edit/:id", authorize, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.user_id
        },
        attributes: 
        [
            "id",
            "post_text",
            "title",
            "user_id",
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                ],
                include: {
                    model: User,
                    attributes: ["user_name"]
                }
            }
        ]
    })
    .then(userPostData => {
        // Serialize data so the template can read it
        const postedData = userPostData.get({ plain: true });
        // Pass serialized data and session flag into template
        res.render("display_posts", { postedData, logged_in: true});
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});

// Route to edit posts
router.get("/edit/:id", authorize, (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: 
        [
            "id",
            "post_text",
            "title",
            "user_id",
        ],
        include: [
            {
                model: User,
                attributes: ["user_name"],
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                ],
                include: {
                    model: User,
                    attributes: ["user_name"]
                }
            }
        ]
    })
    .then(userPostData => {
        // Serialize data so the template can read it
        const postedData = userPostData.get({ plain: true });
        // Pass serialized data and session flag into template
        res.render("edit_posts", { postedData, logged_in: true});
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});

// need to render the new posts somehow
router.get("/new_post", (res,req) => {
    res.render("new_posts");
});

module.exports = router;