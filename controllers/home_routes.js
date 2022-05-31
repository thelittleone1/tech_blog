// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");

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
        res.render("homepage", { postedEData, logged_in: req.session.logged_in});
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
})