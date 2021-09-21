// import dependencies -- Schema and model from mongoose
const { Schema, model } = require("mongoose");

// create new User Schema
const User = new Schema(
  {
    username: {
      type: String,
      //   username must be unique - cannot be two identical in database
      unique: true,
      //   field input is required
      required: "A username is required!",
      //   white space on both ends is removed
      trim: true,
    },
    email: {
      type: String,
      //   email must be unique - cannot be two identical in database
      unique: true,
      //   field input is required
      required: "An email address is required!",
      //   uses regex to validate email - copied from NoSQL section class excercises - solved folder
      match: [/.+\@.+\..+/, "Please use a valid email"],
    },
    thoughts: [
      // array of _id values referencing the "Thought" model
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      // array of _id values referencing the "User model"
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      // allow for virtual data
      virtuals: true,
    },
    id: false,
  }
);

// create virtual that retrieves the length of the user's friends array field on query
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

// export userSchema through User model
module.exports = User;
