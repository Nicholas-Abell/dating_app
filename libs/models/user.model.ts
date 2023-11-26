import mongoose, { Schema } from "mongoose";
import * as userOptions from "../../constants/userOptions";

const userSchema = new Schema({
  username: { type: String, require: true },
  bio: { type: String },
  onboarded: { type: Boolean, default: false },
  age: { type: Number },
  height: { feet: { type: Number }, inches: { type: Number } },
  weight: { type: Number },
  relationshipstatus: {
    type: String,
    enum: userOptions.enumRelationshipstatus,
    default: "Single",
  },
  sexualOrientation: {
    type: String,
    enum: userOptions.enumSexualOrientation,
  },
  lookingfor: {
    type: String,
    enum: userOptions.enumLookingFor,
    default: "Dates",
  },
  gender: {
    type: String,
    enum: userOptions.enumGender,
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
  pets: { type: String, enum: userOptions.enumPets },
  kids: {
    type: String,
    enum: userOptions.enumKids,
  },
  alcohol: {
    type: String,
    enum: userOptions.enumAlcohol,
  },
  smoking: {
    type: String,
    enum: userOptions.enumSmoking,
  },
  marijuana: {
    type: String,
    enum: userOptions.enumMarijuana,
  },
  religion: {
    type: String,
    enum: userOptions.enumReligion,
  },
  politicalViews: {
    type: String,
    enum: userOptions.enumPoliticalViews,
  },
  preferences: {
    preferencesSet: { type: Boolean, default: false },
    age: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 100 },
    },
    distance: { type: Number, default: 9000 },
    relationshipstatus: [
      {
        type: String,
        enum: userOptions.enumRelationshipstatus,
      },
    ],
    pets: [{ type: String, enum: userOptions.enumPets }],
    kids: [
      {
        type: String,
        enum: userOptions.enumKids,
      },
    ],
    alcohol: [
      {
        type: String,
        enum: userOptions.enumAlcohol,
      },
    ],
    smoking: [
      {
        type: String,
        enum: userOptions.enumSmoking,
      },
    ],
    marijuana: [
      {
        type: String,
        enum: userOptions.enumMarijuana,
      },
    ],
    religion: [
      {
        type: String,
        enum: userOptions.enumReligion,
      },
    ],
    politicalViews: [
      {
        type: String,
        enum: userOptions.enumPoliticalViews,
      },
    ],
    desires: [
      {
        type: String,
        enum: userOptions.enumLookingFor,
      },
    ],
    gender: [
      {
        type: String,
        enum: userOptions.enumGender,
      },
    ],
    race: [
      {
        type: String,
        enum: userOptions.enumRace,
      },
    ],
    sexualOrientation: [
      {
        type: String,
        enum: userOptions.enumSexualOrientation,
      },
    ],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
