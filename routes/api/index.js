// import dependencies - express + though and user routes
const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtsRoutes = require("./thoughts-routes");

// use middleware to simplify routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtsRoutes);

// export routes to routes to be called on in routes folder
module.exports = router;
