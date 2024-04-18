import { Alert, Button, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { commentLike, deleteComment, getcomments, postComment } from "../service/api";
import Comment from "./Comment";
import DeleteCommentModal from "./DeleteCommentModal";
import { commentLike, deleteComment, getcomments, postComment } from "../service/api";
const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const[comments, setComments]=useState([])
  const[commentError, setCommentError]= useState(null)
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setcommentIdToDelete] = useState(null);
  const{navigate}= useNavigate()
  // console.log(comments)
  //handle submit function
  const handleSubmit = async (e) => {
    // console.log('called')
    e.preventDefault();
    try {
      const res = await postComment({
        data: {
          content: comment,
          postId,
          userId: currentUser._id
        }
      });
      const data = await res.json();
      if(res.ok){
        setComment('')
        setCommentError(null)
        setComments([data,...comments])
      }
    } catch (error) {
      // Handle error
      setCommentError(error.message)
    }
  }
  //get comments function
  const fetchComment= async()=>{
    try {
      const res= await getcomments(postId)
      if(res.ok){
        const data= await res.json()
        setComments(data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchComment()
  },[postId])
  //like function
  const handleLike= async(commentId)=>{
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res= await commentLike(commentId)
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };
  //handle delete function code
  const handleDelete= async(commentId)=>{
    // console.log("fuction called delte", commentId)
    try {
      // console.log('id', commentIdToDelete)
      const res= await deleteComment(commentIdToDelete)
      if(res.ok){
        const data= await res.json()
        setComments(comments.filter((comment) => comment._id !== commentId));
        setShowModal(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <Textarea
          placeholder={`Comment as @${currentUser.username}`}
            rows="3"
            maxLength="300"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex flex-row justify-between items-center">
            <p className="text-gray-500">{300-comment.length}&nbsp; character remaining</p>
            <Button gradientDuoTone="purpleToBlue" outline className="mt-3" type="submit">
              Submit
            </Button>
          </div>
          {commentError&& (
        <Alert color='failure'>{commentError}</Alert>
      )}
        </form>
      )}
   {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-0 px-1 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setcommentIdToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
            {
          showModal &&(
            <DeleteCommentModal
            showModal={showModal}
            setShowModal={setShowModal}
            // commentIdToDelete={commentIdToDelete}
            handleDelete={handleDelete} 
            />
          )
        }
    </div>
  );
};

export default CommentSection;
