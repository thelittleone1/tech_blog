const router = require("express").Router();

// Connecting to all routes files
const userRoutes = require("./user_routes");
const commentRoutes = require("./comment_routes");
const postRoutes = require("./post_routes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/posts", postRoutes);

router.use((req, res) => {
    res.status(404).send("Yo something is wrong");
});

module.exports = router;
