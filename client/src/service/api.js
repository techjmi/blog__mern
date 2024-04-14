// const url='http://localhost:8000/api/auth'
const url="/api/auth"
const userURL="/api/user"
const postURL="/api/post"
// const url='api/auth'
import axios from 'axios';
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
    //   const jsonData = await res.json(); 
    //     return jsonData;
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
        console.log('update res',res)
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
        console.log('delete', res);
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

//fetch post
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
        console.log('delete', res);
        return res; // Return the response object
    } catch (error) {
        console.log('the error while deleting the data is', error.message);
        throw error; 
    }
}
//fetch single post
export const singlePost= async(id)=>{
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
//const update logic code
export const updatePost= async(id,Id,data)=>{
   
    try {
        const res = await fetch(`${postURL}/updatepost/${id}/${Id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        console.log('delete', res);
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
//fetch more users
export const moreUsers= async(id,startIndex)=>{
    try {
        const res = await fetch(`${userURL}/getusers?startIndex=${startIndex}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}
//delete user based on their Id
export const deleteUser= async(id)=>{
   
    try {
        const res = await fetch(`${userURL}/delete/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('delete', res);
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
        //   console.log(res)
          return res
    } catch (error) {
        console.log('the error in getting the post is', error.message)
    }
}