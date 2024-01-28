const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  userpass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
  refreshToken: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
