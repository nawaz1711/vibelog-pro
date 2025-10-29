const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Notification = require('../models/Notification');

const getPosts = async (req, res) => {
  try {
    const { category, tag, type } = req.query;
    let query = { isPublished: true };
    
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (type) query.type = type;
    
    const posts = await Post.find(query)
      .populate('authorId', 'name profilePic bio')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrendingPosts = async (req, res) => {
  try {
    // Trending = high likes + views within last 7 days
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const posts = await Post.find({
      isPublished: true,
      createdAt: { $gte: weekAgo }
    })
      .populate('authorId', 'name profilePic')
      .sort({ likes: -1, views: -1 })
      .limit(10);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, type, tags, category, coverImage } = req.body;
    const post = new Post({
      authorId: req.user.id,
      title,
      content,
      type,
      tags: tags || [],
      category,
      coverImage
    });
    await post.save();
    const populatedPost = await Post.findById(post._id).populate('authorId', 'name profilePic');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    // Increment view count
    await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    
    const post = await Post.findById(req.params.id)
      .populate('authorId', 'name profilePic bio skills socialLinks')
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name profilePic' }
      });
    
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    // Also delete all comments
    await Comment.deleteMany({ postId: req.params.id });
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    const userId = req.user.id;
    const liked = post.likes.includes(userId);
    
    if (liked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      res.json({ message: 'Post unliked', likes: post.likes });
    } else {
      post.likes.push(userId);
      await post.save();
      
      // Create notification if not the author
      if (post.authorId.toString() !== userId) {
        await Notification.create({
          userId: post.authorId,
          message: `${req.user.name} liked your post`,
          type: 'like',
          link: `/blog/${post._id}`
        });
      }
      
      res.json({ message: 'Post liked', likes: post.likes });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = new Comment({
      postId: req.params.id,
      userId: req.user.id,
      text
    });
    await comment.save();
    
    // Add comment to post
    await Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } });
    
    // Get the author of the post
    const post = await Post.findById(req.params.id).populate('authorId');
    
    // Create notification if not the author
    if (post.authorId._id.toString() !== req.user.id) {
      await Notification.create({
        userId: post.authorId._id,
        message: `${req.user.name} commented on your post`,
        type: 'comment',
        link: `/blog/${req.params.id}`
      });
    }
    
    const populatedComment = await Comment.findById(comment._id).populate('userId', 'name profilePic');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  getPosts, 
  getTrendingPosts,
  createPost, 
  getPostById, 
  updatePost, 
  deletePost,
  likePost,
  addComment
};
