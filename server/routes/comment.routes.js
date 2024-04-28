const express= require("express")
const { verifyToken } = require("../utils/verifyUser")
const { createComment, getPostComments, likeComment, editComment, deleteComment } = require("../controllers/comment.controller")
const router= express.Router()
router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId', getPostComments);
router.put('/likecomment/:commentId', verifyToken, likeComment)
router.put('/editcomment/:commentId', verifyToken, editComment)
router.delete('/deletecomment/:commentId', verifyToken, deleteComment)
module.exports = router;