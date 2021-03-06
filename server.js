const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;


// added packages
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

  // Add routes, both API and view*********
app.use(routes);


// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongo ds063439.mlab.com:63439/heroku_czzb0tx3 -u <dbuser> -p <dbpassword>",
  // "mongodb://localhost/reactclientlist",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
