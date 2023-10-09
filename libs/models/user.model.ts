import mongoose, { Schema } from "mongoose";
import { string } from "zod";

const userSchema = new Schema({
  username: { type: String, require: true },
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
  race: {
    type: String,
  },
  pronouns: {
    type: String,
  },
  likes: [{ type: String }],
  likedBy: [{ type: String }],
  viewedBy: [{ type: String }],
  id: { type: String, require: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
