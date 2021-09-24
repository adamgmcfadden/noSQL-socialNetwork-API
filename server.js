// import dependencies --- express and mongoose
const express = require("express");
const mongoose = require("mongoose");

// create variable for express()
const app = express();
// PORT variable for listener
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(require("./routes"));

// mongoose connection - mostly copied over from module project
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-API",
  {
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

// listener
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
