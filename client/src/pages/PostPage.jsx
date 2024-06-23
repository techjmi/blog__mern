import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSlugPost, fetchlimitPost } from "../service/api";
import { Button, Spinner } from 'flowbite-react';
import AdsPart from "../components/AdsPart";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
const PostPage = () => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(false);
  const[recentPosts, settRecentPosts]= useState([])
  const { postSlug } = useParams();
  //fetch post based on slug
  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetchSlugPost(postSlug);
      const data = await res.json();
      // console.log("the slug", data);
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setPostData(data.posts[0]);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error.meassage);
    }
  };
  //fetch post based on limit condition
  const fetchLimitPost= async()=>{
    try {
      const res= await fetchlimitPost()
      if(res.ok){
        const data= await res.json()
        // console.log('lll', data)
        settRecentPosts(data.posts)
      }
    } catch (error) {
      console.log(error.meassage)
    }
  }
  useEffect(() => {
    // console.log(postSlug);
    fetchPost();
    fetchLimitPost()
  }, [postSlug]);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}
      {!loading && (
        
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          {postData && postData.title}
        </h1>
        <Link
          to={`/search?category=${postData && postData.category}`}
          className='self-center mt-5'
        >
          {/* <Button color='gray' pill size='xs'>
            {postId && postData.category}
          </Button> */}
        </Link>
        <img
          src={postData && postData.image}
          alt={postData && postData.title}
          className='mt-10 p-3 max-h-[400px] w-full object-contain'
        />
        <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
          <span>{postData && new Date(postData.createdAt).toLocaleDateString()}</span>
          <span className='italic'>
            {postData && (postData.content.length / 1000).toFixed(0)} mins read&nbsp;(<span className="italic">Approx</span>)
          </span>
        </div>
        <div
          className='p-3 max-w-2xl mx-auto w-full post-content'
          dangerouslySetInnerHTML={{ __html: postData && postData.content }}
        ></div>
        <div className='max-w-4xl mx-auto w-full'>
        <AdsPart />
        </div>
        <CommentSection postId={postData._id} />
  
        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>Recent articles</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
            {recentPosts &&
              recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </main>
      )}
    </>
  );
};

export default PostPage;
