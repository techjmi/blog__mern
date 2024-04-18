import moment from "moment";
import React, { useEffect, useState } from "react";
// import { deleteComment, editComment, fetchUserById } from "../service/api";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import { editComment, fetchUserById } from "../service/api";
const Comment = ({ comment, onLike, onEdit,onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(commentIdToDelete)
  //get user Based On thier id
  const UserId = comment.userId;
  const fetchUserByID = async () => {
    try {
      const res = await fetchUserById(UserId);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (error) {
      setEditing(false);
    }
  };
  useEffect(() => {
    fetchUserByID();
  }, [UserId]);
  //edit comment code
  const handleChange = () => {
    setEditing(true);
    setEditedContent(comment.content)
  };
//save and send the edited 
const handleSave=async()=>{
  try {
    const res= await editComment(comment._id,{content:editedContent})
    if(res.ok){
setEditing(false)
onEdit(comment, editedContent)
    }
  } catch (error) {
    console.log(error.message)
  }
}
  return (
    <div className="flex p-4 border-b-2 dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <Link to={"/dashboard?tab=profile"}>
          <img
            className="w-10 h-10 rounded-full bg-gray-200"
            src={user.profilePicture}
            alt={user.username}
          />
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
           <Textarea
            className="mb-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
           <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
         
        ) : (
          <>
            <p className="pb-2">{comment.content}</p>
            <div className="flex gap-2 items-center pt-1 text-xs border-t dark:border-gray-700  ">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                  <button
                    className="text-gray-400 hover:text-blue-500"
                    type="button"
                    onClick={handleChange}
                  >
                    Edit
                  </button>
                     <button
                     className="text-gray-400 hover:text-blue-500"
                     type="button"
                     onClick={()=>{onDelete(comment._id)}}
                   >
                     Delete
                   </button>
                   </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
