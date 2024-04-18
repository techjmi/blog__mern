import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserById } from "../service/api";
// import { fetchUserById } from "../service/api";
const PostCard = ({ post }) => {
    const[userData, setUserData]= useState({})
    // console.log('by', userData)
    const id= post.userId
    const user= async()=>{
        try {
            const res= await fetchUserById(id)
            if(res.ok){
                const data= await res.json()
                // console.log('post user', data)
                setUserData(data)
            }
        } catch (error) {
           console.log(error.message) 
        }
    }
    useEffect(()=>{
        user()
    },[id])
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[250px] transition-all'">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post-image"
          className="h-[200px] w-full object-cover group-hover:h-[180px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-gray-500">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <span className="text-gray-300 text-sm font-semibold">By &nbsp;{userData.username}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-180px] left-0 right-0 border border-teal-500 text-center py-1 rounded-md !rounded-tl-none m-2"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
