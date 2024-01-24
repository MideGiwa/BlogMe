const express = require('express');
const { createNewPost, getAllPosts, getSinglePost, updatePost, deletePost } = require('../controllers/postControllers');
const { verifyToken, ownsPost } = require("../middlewares/auth");
const router = express.Router();

// Create a New Post
router.post('/', verifyToken, createNewPost);

// Get All Posts
router.get('/', verifyToken, getAllPosts);

// Get a Single Post
router.get('/:postId', verifyToken, getSinglePost);

// Update a Post
router.put('/:postId', verifyToken, ownsPost, updatePost);

// Delete a Post
router.delete('/:postId', verifyToken, ownsPost, deletePost);

module.exports = router;