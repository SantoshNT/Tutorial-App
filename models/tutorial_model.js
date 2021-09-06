const mongoose = require("mongoose");
const schema = mongoose.Schema;
const tutorialSchema = new schema({
  // id: { type: String, require: true },
  tName: { type: String, require: true },
  tDesc: { type: String, require: false },
  tStatus: { type: String, require: false },
});
const Tutorial = mongoose.model("tutorials", tutorialSchema);

module.exports = Tutorial;
