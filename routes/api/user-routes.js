// import dependencies -- express and user-controller.js
const router = require("express").Router();

// deconstruct userController
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users routes
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id routes
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

// export to ./index.js
module.exports = router;
