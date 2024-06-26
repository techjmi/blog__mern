
const { Post } = require("../models/post.model");
const { errorHandler } = require("../utils/error");



const createPost=async(req,res, next)=>{
    // console.log('the user',req.user)
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
      }
      if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }
      const slug = req.body.title
        .split(' ') 
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
      const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id, 
      });
      try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        next(error);
      }
    
}

//get post logic or code
 const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 7; //for limit
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    console.log(error.message)
    next(error);
  }
};

//delete post code
const deletePosts= async(req, res, next)=>{
  if(!req.user.isAdmin||req.user.id!==req.params.userId){
    return next(errorHandler(403,'You are not allowed to delete this posts'))
  }
  try {
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json('posts deleted successfully')
  } catch (error) {
    next(error)
  }
}
//update post

const updatePost = async (req, res, next) => {
  try {
    // Ensure user is authorized to update the post
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
// console.log(req.body.title,req.body.content,req.body.category,req.body.imagecl)
    // Check if all required fields are provided in the request body
    if (!req.body.title || !req.body.content || !req.body.category || !req.body.image) {
      return next(errorHandler(400, 'Please provide title, content, category, and image'));
    }
 
    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image
        }
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    // Send the updated post as response
    res.status(200).json(updatedPost);
  } catch (error) {
    // Handle any errors
    next(error);
  }
};

module.exports={createPost, getposts, deletePosts,updatePost}