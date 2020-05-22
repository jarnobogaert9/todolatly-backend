const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);