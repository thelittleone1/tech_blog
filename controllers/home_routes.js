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
        if (!userPostData) {
            res.statusCode(404).send("Could not find data");
            return;
        }

        // Serialize data so the template can read it
        const postedData = userPostData.get({ plain: true });

        // Pass serialized data and session flag into template
        res.render("single_post", { post, logged_in: req.session.logged_in})
    })
})

// Once User logins, this route will direct them to the homepage
router.get("/login", (req, res) => {
    if(req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("signup");
})