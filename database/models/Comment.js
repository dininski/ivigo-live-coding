const mongoose = require('mongoose');
const CommentsSchema = new mongoose.Schema({
    body: String,
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    }
});

module.exports = mongoose.model('comments', CommentsSchema);