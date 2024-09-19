// backend/models/index.js
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    birthdate: {type: String, require: true},
    photourl: {type: String, require: true},
    address: {type: String, required: true},
    career: {type: String, require: true},
    matches: {type: String, require: true},
    score: {type: String, require: true},
    fifties: {type: String, require: true},
    centuries: {type: String, require: true},
    wickets: {type: String, require: true},
    average: {type: String, require: true},
})
export const Users = mongoose.model("Users",UserSchema);