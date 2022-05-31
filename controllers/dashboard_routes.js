// Constants for the routes that the user interacts directly with
const router = require('express').Router();
const sequelize = require("../config/connection");
const { Comment, Post, User } = require("../models");
const authorize = require("../utils/auth");

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
            }
        ]
    })
})