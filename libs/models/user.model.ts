import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, require: true},
  bio: { type: String },
  onboarded: { type: Boolean, default: false },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  relationshipstatus: {
    type: String,
    enum: [
      "No Response",
      "Committed",
      "Dating",
      "Engaged",
      "Exclusive",
      "Married",
      "Open Relationship",
      "Partnered",
      "Single",
    ],
    default: "Single",
  },
  lookingfor: {
    type: String,
    enum: ["Chat", "Dates", "Friends", "Hookups", "Relationship"],
    default: "Dates",
  },
  gender: {
    type: String,
    enum: [
      "Man",
      "Cis Man",
      "Trans Man",
      "Woman",
      "Cis Woman",
      "Trans Woman",
      "Non-Binary",
    ],
  },
  likes: [{type: String, unique: true}],
  likedBy: [{type: String, unique: true}],
  viewedBy: [{type: String, unique: true}],
  id: { type: String, require: true },
  convsersationIds: [{type: String, unique: true}],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
