// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const authorize = require("../utils/auth");

// Rendering the homepage
router.get("/", (res, req) => {
    console.log(req.session);

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
        // Pass serialized data and session flag into template
        res.render("homepage", { postedData, logged_in: req.session.logged_in});
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
})

// Once User logins, this route will direct them to the homepage
router.get("/login", (req, res) => {
    if(req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

// LOL you need to reder the sign up page to tesst 
router.get("/signup", (req, res) => {
    res.render("signup");
});

// rendering a single post
router.get("/post/:id", (req,res) => {
    Post.findOne({
        where: {
            id: req.session.id
        },
        attributes: [
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
                    attributes: ["user_name"],
                }
            },
            {
                model: User,
                attributes: [ "user_name"],
            }
        ]
    })
    .then(userPostData => {
        if (!userPostData) {
            res.status(404).send("Could not find a post");
            return;
        }
        // Serialize data so the template can read it
        const postedData = userPostData.get({ plain: true });
        // Pass serialized data and session flag into template
        res.render("single_post", { postedData, logged_in: req.session.logged_in});
    })
    .catch(err => {
        console.log(err);
        res.statusCode(500).json(err);
    });
});

module.exports = router;