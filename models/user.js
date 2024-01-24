const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true, minLength: 8 },
    profile: {
        name: { type: String },
        bio: { type: String },
        profilePictureURL: { type: String },
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    token: { type: String },
});

module.exports = mongoose.model("User", userSchema);