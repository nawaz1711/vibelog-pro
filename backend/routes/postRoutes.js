const express = require('express');
const { getPosts, getTrendingPosts, createPost, getPostById, updatePost, deletePost, likePost, addComment } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/trending', getTrendingPosts);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, addComment);

module.exports = router;
