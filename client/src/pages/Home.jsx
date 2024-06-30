import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import AdsPart from './AdsPart';
import { AllmorePosts, fetchAllpost } from '../service/api';
import CategoryNav from '../components/CategoryNav';
import { Spinner } from 'flowbite-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // Get all the posts irrespective of user
  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetchAllpost();
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length < 7) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // Handle show more function
  const startIndex = posts.length;
  const handleShowMore = async () => {
    try {
      const res = await AllmorePosts(startIndex);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 7) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <CategoryNav posts={posts} />
      <div className="flex flex-col gap-4 p-12 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl mt-5 text-center">Welcome to my blog</h1>
        <p className="md:mx-9 mx-4 text-justify">
          Are you interested in learning web development? Explore a variety of articles and tutorials covering web development, software engineering, and programming languages. Click here to browse my portfolio and delve into my GitHub and projects for hands-on learning. Contact me to get started!
        </p>
      </div>
      <div className="md:w-3/6 md:mx-auto w-full mb-5 p-4">
        <AdsPart />
      </div>
      <div className="flex flex-col justify-center items-center mb-5 p-4">
        <h1 className="text-2xl font-semibold text-center">See Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {loading ? (
            <Spinner />
          ) : (
            posts && posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      </div>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default Home;
