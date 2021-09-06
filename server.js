const express = require("express");
const users = require("./routes/api/users");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const app = express();
var bodyParser = require("body-parser");
const Tutorial = require("./models/tutorial_model");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//database connection
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("clientnew/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "clientnew", "build", "index.html"));
  });
}
app.get("/abc", (req, res) => {
  res.send("Hello!!!");
});
// add tutorial
app.post("/tutorial", urlencodedParser, (req, res) => {
  const addTutorial = new Tutorial({
    tId: req.body.tId,
    tName: req.body.tName,
    tDesc: req.body.tDesc,
    tStatus: req.body.tStatus,
  });
  addTutorial
    .save(addTutorial)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => console.log(err));
});

app.get("/tutorial", (req, res) => {
  Tutorial.find().then((data) => {
    res.end(JSON.stringify(data));
  });
});

app.get("/tutorial/:id", (req, res) => {
  const tutorialId = req.params.id;
  // console.log("tutorialId", tutorialId);
  Tutorial.findById(tutorialId)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => console.log(err));
});

// update tutorial
app.put("/tutorial/:id", (req, res) => {
  const tutorialId = req.params.id;
  console.log("tutorialId", tutorialId);
  Tutorial.findByIdAndUpdate(
    { _id: tutorialId },
    {
      $set: {
        tId: req.body.tId,
        tName: req.body.tName,
        tDesc: req.body.tDesc,
        tStatus: req.body.tStatus,
      },
    }
  )
    .then((data) => {
      console.log("Updtaed");
      console.log("data===", JSON.stringify(data));
      res.end(JSON.stringify(data));
    })
    .catch((err) => console.log(err));
});

//Delete tutorial
app.delete("/tutorial/:id", (req, res) => {
  const tutorialId = req.params.id;
  console.log("tutorialId", tutorialId);
  Tutorial.findOneAndDelete(
    { _id: tutorialId },
    {
      $set: {
        tId: req.body.tId,
        tName: req.body.tName,
        tDesc: req.body.tDesc,
        tStatus: req.body.tStatus,
      },
    }
  )
    .then((data) => {
      console.log("Deleted");
      console.log("data===", JSON.stringify(data));
      res.end(JSON.stringify(data));
    })
    .catch((err) => console.log(err));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port: ${port}`));
