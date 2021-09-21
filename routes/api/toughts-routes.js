// import dependencies - express and thoughts-controller.js
const router = require("express").Router();
// deconstruct thoughts-controller
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

// api/thoughts/userId routes
router.route("/:userId").post(postThought);

// api/thoughts/:thoughtsId routes
router
  .route("/:id")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  api/thoughts/:thoughtsId/reactions routes
router.route("/:thoughtId/reactions").post(postReaction);

// /api/thoughts/:thoughtId/reactions/reactionId routes
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// export to /index.js
module.export = router;
