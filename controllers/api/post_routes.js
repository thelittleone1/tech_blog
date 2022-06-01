// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const authorize = require("../utils/auth");

// Do a route to get all posts
// Editing route from home_routes
// Rendering the homepage
router.get("/", (res, req) => {
    Post.findAll({
        attributes: [
            "id",
            "post_text",
            "title",
            "user_id",
        ], 
            include: [
                {
                model: Comment,
                attributes: 
                    [
                        "id",
                        "comment_text",
                        "post_id",
                        "user_id",
                    ],
                        include: {
                            model: User,
                            attributes: "user_name"
                        }
                    }
                    ]
    })
    .then(userPostData => {
        // Serialize data so the template can read it
        const postedData = userPostData.get({ plain: true });
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});

// Route to display one post
// Editing route from dashboard_routes and home_routes
router.get("/:id", (req,res) => {
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
                attributes: [
                    "user_name",
            ]},
            {
                model: Comment,
                attributes: 
                [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                ],
                include: {
                    model: User,
                    attributes: [ "user_name"]
                }}
        ]
    })
    .then(userPostData => {
        if(!userPostData) {
            res.status(404).send("You got a problem");
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});