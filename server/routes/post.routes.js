const express=require('express');
const { verifyToken } = require('../utils/verifyUser');
const { createPost, getposts, deletePosts, updatePost } = require('../controllers/post.controller');
const router = express.Router();

router.post('/create', verifyToken,createPost)
router.get('/getposts', getposts)
router.delete('/deletPost/:postId/:userId',verifyToken, deletePosts)
router.put('/updatepost/:postId/:userId',verifyToken, updatePost)

module.exports = router;