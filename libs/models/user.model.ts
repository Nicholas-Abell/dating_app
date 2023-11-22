import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, require: true },
  bio: { type: String },
  onboarded: { type: Boolean, default: false },
  age: { type: Number },
  height: { feet: { type: Number }, inches: { type: Number } },
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
  sexualOrientation: { type: String },
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
  images: [{ type: String }],
  id: { type: String, require: true },
  location: {
    city: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
  },
  preferences: {
    age: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 100 },
    },
    distance: { type: Number, default: 9000 },
    relationshipstatus: [{ type: String, default: [] }],
    pets: { type: String, enum: ["Cat(s)", "Dog(s)", "Cats and Dogs"] },
    kids: {
      type: String,
      enum: ["Does not want kids", "Wants kids", "Has kids", "Undecided"],
    },
    alcohol: {
      type: String,
      enum: ["Does not drink", "Drinks Occasionally", "Drinks often"],
    },
    smoking: {
      type: String,
      enum: ["Does not smoke", "Smokes occasionally", "Smokes often"],
    },
    marijuana: {
      type: String,
      enum: ["Does not smoke", "Smokes occasionally", "Smokes often"],
    },
    religion: { type: String },
    politicalViews: { type: String },
    desires: [
      {
        type: String,
        enum: ["Chat", "Dates", "Friends", "Hookups", "Relationship"],
        default: ["Chat", "Dates", "Friends", "Hookups", "Relationship"],
      },
    ],
    gender: [
      {
        type: String,
        enum: ["Man", "Trans Man", "Woman", "Trans Woman", "Non-Binary"],
        default: ["Man", "Trans Man", "Woman", "Trans Woman", "Non-Binary"],
      },
    ],
    race: [{ type: String }],
    sexualOrientation: [{ type: String }],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
