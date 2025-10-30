const express = require('express');
const { getPosts, getTrendingPosts, createPost, getPostById, updatePost, deletePost, likePost, addComment } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/trending', getTrendingPosts);
router.get('/', getPosts);
router.post('/', protect, createPost);
router.get('/:id', getPostById);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);

module.exports = router;
