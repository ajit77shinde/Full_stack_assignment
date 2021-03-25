const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    id:{
        type: Number
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    status: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'user'
})

module.exports = mongoose.model('User', userSchema)