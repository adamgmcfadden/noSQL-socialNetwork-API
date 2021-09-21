// import dependencies - express and /api folder
const router = require("express").Router();
const apiRoutes = require("./api");

// use middleware to simplify api routes
router.use("./api", apiRoutes);

// catch error - copied from NoSQL module project
router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

// export routes to be used in server.js
module.exports = router;
