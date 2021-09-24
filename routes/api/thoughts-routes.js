// import dependencies -- express and thoughts-controller
const router = require("express").Router();

// deconstruct thoughtsController
const {
  getAllThoughts,
  getSingleThought,
  postThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

//  /api/thoughts routes
router.route("/").get(getAllThoughts);

//  /api/thoughts/userId routes
router.route("/:userId").post(postThought);

//  /api/thoughts/:thoughtId routes
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions routes
router.route("/:thoughtId/reactions").post(postReaction);

//  /api/thoughts/:thoughtId/reactions/reactionId routes
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// export to ./index.js
module.exports = router;
