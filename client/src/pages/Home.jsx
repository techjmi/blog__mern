import React, { useEffect, useState } from 'react'
// import AdsPart from '../components/AdsPart'
// import { fetchAllpost } from '../service/api';
import PostCard from '../components/PostCard';
import AdsPart from './AdsPart';
import { fetchAllpost } from '../service/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const fetchPost= async()=>{
    try {
      const res= await fetchAllpost()
      if(res.ok){
        const data= await res.json()
        // console.log(data)
        setPosts(data.posts)
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    fetchPost()
  },[])
  return (
    <div>
      <div className="flex flex-col gap-4 p-12 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl mt-5 text-center'>Welcome to my blog</h1>
        <p className='md:mx-9 mx-4 text-justify'>Are you interested in learning web development? Explore a variety of articles and tutorials covering web development, software engineering, and programming languages. Click here to browse my portfolio and delve into my GitHub and projects for hands-on learning. Contact me to get started!</p>
      </div>
      <div className="md:w-3/6 md:mx-auto w-full mb-5 p-4">
        <AdsPart />
      </div>
      <div className='flex flex-col justify-center items-center mb-5 p-4'>
          <h1 className='text-2xl font-semibold text-center'>See Recent articles</h1>
          <div className='flex flex-wrap gap-5 mt-5 justify-center'>
            {posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
    </div>
  )
}

export default Home
