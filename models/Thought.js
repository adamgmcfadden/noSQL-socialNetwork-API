// import dependencies -- Schema, model and type from mongoose
// --dateformat helper function located in utils/ -- copied from module project
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create new ReactionSchema Schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      // mongoose's Object id data type
      type: Schema.Types.ObjectId,
      //   default value set to ObjectId
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      //   field input is required
      required: "A reaction is required!",
      //   280 characters maximum
      maxlength: 280,
    },
    username: {
      type: String,
      //   field input is required
      required: "A username is required!",
    },
    createdAt: {
      //  data type: date
      type: Date,
      //   set default value to current timestamp
      default: Date.now,
      // getters method used to format the timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      // to allow getter method
      getters: true,
    },
    id: false,
  }
);

// create new ThoughtSchema schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      //   field input is required
      required: "A though is required here!",
      //   minimum length of 1 character
      minlength: 1,
      //   max length of 280 characters
      maxlength: 280,
    },
    createdAt: {
      //  data type: date
      type: Date,
      //   set default value to current timestamp
      default: Date.now,
      // getters method used to format the timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      //   field input is required
      required: "Please enter a Username!",
    },
    // array of nested documents created with reactionSchema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      // allow virtual data
      virtuals: true,
      // allow getter methods
      getters: true,
    },
    id: false,
  }
);

// retrieves the length of the thought's reaction array field on query
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

// export Schemas as "Thought" model
module.exports = Thought;
