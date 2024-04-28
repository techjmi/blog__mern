import { TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { fetchSearchPost } from "../service/api";
const SearchPage = () => {
    //state to hold the form data
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
      });
      console.log(sidebarData)
      const [posts, setPosts] = useState([]);
      const [loading, setLoading]= useState(false)
      const[showMore, setShowMore]= useState(false)
      //get the post based on passing search term
      const getSearchPost = async (urlParams) => {
        try {
          setLoading(true)
          const searchQuery = urlParams.toString();
          const res = await fetchSearchPost(searchQuery);
          console.log('the search', res);
          if(!res.ok){
            setLoading(false)
            return ;
          }
          if(res.ok){
            const data= await res.json()
            console.log('the search post data is', data)
            setLoading(false)
            setPosts(data.posts)
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
          const sortFromUrl = urlParams.get('sort');
          const categoryFromUrl = urlParams.get('category');
          setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl || sidebarData.searchTerm,
            sort: sortFromUrl || sidebarData.sort,
            category: categoryFromUrl || sidebarData.category,
          });
          getSearchPost(urlParams);
        }
      }, [location.search]);
      
  const handleSubmit = () => {};
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
            //   onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
