// import dependencies - /models
const { User, Thought } = require("../models");

const userController = {
  // get all users - remove __v
  getAllUsers(req, res) {
    // get all method
    User.find({})
      // leave __v out of selection
      .select("-__v")
      //   return all user data
      .then((dbUserData) => res.json(dbUserData))
      // catch error if exists
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   get one user by _id + populate with thoughts and friends
  getSingleUser(req, res) {
    //   get single method - search params.id
    User.findOne({ _id: params.id })
      // populate with "thoughts", leave out __v
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      // populate with "friends", leave out __v
      .populate({
        path: "friends",
        select: "-__v",
      })
      //   leave out __v
      .select("-__v")

      .then((dbUserData) => {
        //   if user id not found, return 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // respond with user data
        res.json(dbUserData);
      })
      //   if error exists, log and respond with error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   create a new user
  createUser({ body }, res) {
    //   use create method
    User.create(body)
      // create user
      .then((dbUserData) => res.json(dbUserData))
      //   if error exists, catch and return error
      .catch((err) => res.status(400).json(err));
  },

  //   update user by their id
  updateUser({ params, body }, res) {
    //   use find one and update method - search by id
    User.findOneAndUpdate({ _id: params.id }, body, {
      // return new (updated) user after update
      new: true,
      //   run validators
      runValidators: true,
    })
      .then((dbUserData) => {
        //   if id does not match any user, return 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that id!" });
          return;
        }
        // return updated user
        res.json(dbUserData);
      })
      //   catch and return error if exists
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   delete a user and their associated thoughts
  deleteUser({ params }, res) {
    //   use the find one and delete method - search by id
    User.findOneAndDelete({ _id: params.id })
      .then((userToDelete) => {
        //   if no user with id - return 404
        if (!userToDelete) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // return deletedData
        return userToDelete;
      })
      .then((userToDelete) => {
        //   using userToDelete info, deleteMany thoughts by username
        Thought.deleteMany({ username: userToDelete.username }).then(() => {
          // user and thoughts are deleted - send success message
          res
            .json({
              message: "The user and their thoughts have been deleted!",
            })
            // if error, return error
            .catch((err) => {
              console.log(err);
              res.status(400).json(err);
            });
        });
      });
  },
  //   add a friend to friend's list
  addFriend({ params }, res) {
    //   user findoneandupdate method to update friends list
    User.findOneAndUpdate(
      // find friend by id
      { _id: params.id },
      //   push new friend to friends array
      { $push: { friends: params.friendId } },
      //   return updated list, run validators
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        //   if no user with id - return 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // return updated friends list
        res.json(dbUserData);
      })
      //   if error exists, return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   remove friend from friends list
  removeFriend({ params }, res) {
    //   user findoneandupdate method to update friends list
    User.findOneAndUpdate(
      // find friend by id
      { _id: params.id },
      //   pull friend to friends array to remove
      { $pull: { friends: params.friendId } },
      //   return updated list, run validators
      { new: true }
    )
      .then((dbUserData) => {
        //   if no user with id - return 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // return updated friends list
        res.json(dbUserData);
      })
      //   if error exists, return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
