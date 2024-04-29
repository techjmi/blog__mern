import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { fetchSearchPost } from "../service/api";
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from "../components/PostCard";
const SearchPage = () => {
    //state to hold the form data
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
      });
      console.log(sidebarData)
      const [posts, setPosts] = useState([]);
      const [loading, setLoading]= useState(false)
      const[showMore, setShowMore]= useState(false)
      const location = useLocation();
      const navigate = useNavigate(); 
      //get the post based on passing search term
      const getSearchPost = async (urlParams) => {
        try {
          setLoading(true)
          const searchQuery = urlParams.toString();
          const res = await fetchSearchPost(searchQuery);
          // console.log('the search', res);
          if(!res.ok){
            setLoading(false)
            return ;
          }
          if(res.ok){
            const data= await res.json()
            // console.log('the search post data is', data)
            setLoading(false)
            setPosts(data.posts)
            setSidebarData('')
            if (data.posts.length === 7) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log('The Error While Getting The Search Post', error.message);
        }
      };
      //useEffect function to get the term from url and to call the function getSerachpost
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        if (urlParams) {
          const searchTermFromUrl = urlParams.get('searchTerm');
          setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl || sidebarData.searchTerm,
          });
          getSearchPost(urlParams);
        }
      }, [location.search]);
      
//handle change function
const handleChange = (e) => {
  if (e.target.id === 'searchTerm') {
    setSidebarData({ ...sidebarData, searchTerm: e.target.value });
  }
};
//handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
          <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">Search</Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center sm:border-b border-gray-500 p-3 mt-2">
          Search Post
        </h1>
        <div className='p-7 flex flex-wrap gap-4 items-center justify-center'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {/* {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
