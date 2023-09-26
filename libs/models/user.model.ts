import mongoose, { Schema } from "mongoose";

const userSchema = new Schema ({
    id: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    bio: {type: String},
    onboarded: {type: Boolean, default: false}
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;