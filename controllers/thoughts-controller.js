// import dependencies -- thought and user model
const { Thought, User } = require("../models");

const thoughtsController = {
  // retrieve all thoughts
  getAllThoughts(req, res) {
    //   user find method to find all thoughts
    Thought.find({})
      // return all thoughts in database
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      //   if error return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //  retrieve a single thought by its id
  getSingleThought({ params }, res) {
    //   find single thought by its if with findOne method
    Thought.findOne({ _id: params.id })
      // leave out __v
      .select("-__v")
      .then((dbThoughtsData) => {
        //   if no thought exists with id, return 404
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // return data associated to single thought
        res.json(dbThoughtsData);
      })
      //   if error, return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   post a thought
  postThought({ params, body }, res) {
    //   use create method to create thought
    Thought.create(body)
      .then(({ _id }) => {
        //   then return find one and update method for selected user
        return User.findOneAndUpdate(
          // search user by id
          { _id: params.userId },
          //   push thought to thoughts array
          { $push: { thoughts: _id } },
          //   return updated information
          { new: true, runValidators: true }
        );
      })
      .then((dbUserData) => {
        //   if no user with id, return 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // return user with new thought
        res.json(dbUserData);
      })
      //   if error return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //   update a thought
  updateThought({ params, body }, res) {
    //   find a thought and update it - search by id ( update body)
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      // return updated thought
      new: true,
      //   run validators
      runValidators: true,
    })
      .then((dbThoughtData) => {
        //   if no thought with id, return 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // return updated thought
        res.json(dbThoughtData);
      })
      //   if error return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //  delete a thought
  deleteThought({ params }, res) {
    //   find one and delete method - search by thought id
    Thought.findOneAndDelete({ _id: params.id })
      .then((deletedThought) => {
        //   if no thought with that id, return 404
        if (!deletedThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // delete thought
        res.json(deletedThought);
      })
      //   if error, return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // post a new reaction
  postReaction({ params, body }, res) {
    //   find one thought and update it
    Thought.findOneAndUpdate(
      // search by thought id
      { _id: params.thoughtId },
      //   push reaction
      { $push: { reactions: body } },
      //   return updated thought, run validators
      { new: true, runValidators: true }
    )
      // leave out -__v
      .select("-__v")
      .then((dbThoughtData) => {
        //   if no thought found with id, return 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // post the new reaction
        res.json(dbThoughtData);
      })
      //   if error, return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // delete a reaction
  deleteReaction({ params }, res) {
    //   find one and update method used
    Thought.findOneAndUpdate(
      // search by thoughtId
      { _id: params.thoughtId },
      //   pull or remove reaction by reaction id
      { $pull: { reactions: { reactionId: params.reactionId } } },
      // return updated thought
      { new: true }
    )

      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // return thought minus reaction
        res.json(dbThoughtData);
      })
      //   if error, return error
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

// export thoughtController to use in API routes
module.exports = thoughtsController;
