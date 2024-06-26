// const url='http://localhost:8000/api/auth'
// const url="https://blogapp-backend-nadb.onrender.com/api/auth"
// const userURL="https://blogapp-backend-nadb.onrender.com/api/user"
// const postURL="https://blogapp-backend-nadb.onrender.com/api/post"
// const commentUrl="https://blogapp-backend-nadb.onrender.com/api/comment"

const url="/api/auth"
const userURL="/api/user"
const postURL="/api/post"
const commentUrl="/api/comment"

export const postData=async(data)=>{
    try {
             const res = await fetch(`${url}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
          return res
    } catch (error) {
        console.log('the error while podting the data is', error.message)
    }
}
//login logic
export const postLogin=async(data)=>{
    try {
             const res = await fetch(`${url}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        // credentials: 'include',
      });
          return res
    } catch (error) {
        console.log('the error while Logging in is the data is', error.message)
    }
}
//login by google logic
export const GoogleLogin=async(data)=>{
    try {
             const res = await fetch(`${url}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    return res
    } catch (error) {
        console.log('the error while Logging in is the data is', error.message)
    }
}
export const updateData=async(id, data)=>{
    try {
        const res= await fetch(`${userURL}/update/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),})
        // console.log('update res',res)
        return res
    } catch (error) {
        console.log('the error while updating the data is', error.message)
    }
}

//delete user function
export const deleteData = async (id) => {
    try {
        const res = await fetch(`${userURL}/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        // console.log('delete', res);
        return res; // Return the response object
    } catch (error) {
        console.log('the error while deleting the data is', error.message);
        throw error; 
    }
}
//signout function
export const signOutUser= async()=>{
    try {
        const res= await fetch(`${userURL}/signout`,{
            method: 'POST',
        })
return res
    } catch (error) {
        console.log('the error while logout the user is', error.message);
        throw error; 
    }
}
//post blogPost data
export const postBlog=async(data)=>{
    try {
             const res = await fetch(`${postURL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        // credentials: 'include',
      });
    //   console.log('post res',res)
          return res
    } catch (error) {
        console.log('the error while podting the data is', error.message)
    }
}
//fetch all post
export const fetchAllpost= async()=>{
    try {
        const res = await fetch(`${postURL}/getposts`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the all post is', error.message)
    }
}
//fetch more post by all users
export const AllmorePosts= async(startIndex)=>{
    try {
        const res = await fetch(`${postURL}/getposts?startIndex=${startIndex}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//fetch post by user id to show admin dashboard
export const fetchPost= async(id)=>{
    try {
       
        const res = await fetch(`${postURL}/getposts?userId=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//fetch post by passing limit and show in dashboard
export const fetchPostLimit= async(id)=>{
    try {
        const res = await fetch(`${postURL}/getposts?limit=5`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//fetch more post
export const morePosts= async(id,startIndex)=>{
    try {
        const res = await fetch(`${postURL}/getposts?userId=${id}&startIndex=${startIndex}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//delete post api calling
export const deletePosts= async(id,Id)=>{
   
    try {
        const res = await fetch(`${postURL}/deletPost/${id}/${Id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        // console.log('delete', res);
        return res; // Return the response object
    } catch (error) {
        console.log('the error while deleting the data is', error.message);
        throw error; 
    }
}
//fetch single  post by id to update it 
export const singlePost= async(id)=>{
    // console.log('single', id)
    try {
        const res = await fetch(`${postURL}/getposts?postId=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//const update post logic code
export const updatePost= async(id,Id,data)=>{
//    console.log(id, Id)
    try {
        const res = await fetch(`${postURL}/updatepost/${id}/${Id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        // console.log('delete', res);
        return res; // Return the response object
    } catch (error) {
        console.log('the error while deleting the data is', error.message);
        throw error; 
    }
}

//getusers logic
export const fetchUser= async()=>{
    try {
        const res = await fetch(`${userURL}/getusers`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the user data is', error.message)
    }
}
//fetch user based on the limit
export const fetchUserLimit= async()=>{
    try {
        const res = await fetch(`${userURL}/getusers?limit=5`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the user data is', error.message)
    }
}
//fetch more users
export const moreUsers= async(startIndex)=>{
    try {
        const res = await fetch(`${userURL}/getusers?startIndex=${startIndex}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the User is', error.message)
    }
}
//fetch user based on their ID
export const fetchUserById= async(id)=>{
    try {
        const res = await fetch(`${userURL}/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the User is', error.message)
    }
}
//delete user based on their Id
export const deleteUser= async(id)=>{
   
    try {
        const res = await fetch(`${userURL}/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        // console.log('delete', res);
        return res; // Return the response object
    } catch (error) {
        console.log('the error while deleting the data is', error.message);
        throw error; 
    }
}
//fetch post based on slug.... or individual post
export const fetchSlugPost= async(postSlug)=>{
    try {
        const res = await fetch(`${postURL}/getposts?slug=${postSlug}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log('slug', res.data)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//call post based on their limit or set limit to 3
export const fetchlimitPost= async()=>{
    try {
        const res = await fetch(`${postURL}/getposts?limit=3`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log('slug', res.data)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//get post by passing search parameters
export const fetchSearchPost= async(searchQuery)=>{
    try {
        const res = await fetch(`${postURL}/getposts?${searchQuery}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log('search', res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//post comment api calling
export const postComment= async({data})=>{
    try {
        const res= await fetch(`${commentUrl}/create`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
         return res
    } catch (error) {
        console.log('The Error While Posting Comment', error.message)
    }
}
//getcomments api calling
export const getcomments= async(id)=>{
    try {
        const res= await fetch(`${commentUrl}/getPostComments/${id}`,{
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })
        return res
    } catch (error) {
        console.log('The Error While Getting The Comment', error.message)
    }
}
//put comments api for adding like
export const commentLike= async(commentId)=>{
    try {
        const res= await fetch(`${commentUrl}/likecomment/${commentId}`,{
            method:"PUT"
        })
        return res
    } catch (error) {
        console.log('The Error While Getting The Comment', error.message)
    }
}
//edit or update the comment
export const editComment= async(commentId,data)=>{
    // console.log('the data edit', data)
    try {
        const res= await fetch(`${commentUrl}/editcomment/${commentId}`,{
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        // console.log('delete', res);
        return res
    } catch (error) {
        console.log('The Error While Getting The Comment', error.message)
    }
}
//delete comment
export const deleteComment= async(commentId)=>{
    // console.log('the data edit', data)
    try {
        const res= await fetch(`${commentUrl}/deletecomment/${commentId}`,{
            method:"DELETE",
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify(data),
        })
        // console.log('delete', res);
        return res
    } catch (error) {
        console.log('The Error While Deleting The Comment', error.message)
    }
}
