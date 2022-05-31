const router = require("express").Router();

// Connecting to all routes files
//WORK ON THESE ROUTES NEXT
const apiRoutes = require("./api");
const dashboardRoutes = require("./dashboard_routes");
const homeRoutes = require("./home_routes");

router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);

router.use((req, res) => {
    res.status(404).send("Yo something is wrong");
});
