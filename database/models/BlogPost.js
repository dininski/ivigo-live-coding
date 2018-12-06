const mongoose = require('mongoose');

const BlogPostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Users'
    }
});

const BlogPosts = mongoose.model('BlogPosts', BlogPostsSchema);

module.exports = BlogPosts;