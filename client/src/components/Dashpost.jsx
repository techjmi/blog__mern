import React, { useEffect, useState } from "react";
import { deletePosts, fetchPost, morePosts } from "../service/api";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost.jsx";
const Dashpost = () => {
  const [post, setPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  var id = currentUser._id;
  //get posts
  const getPosts = async () => {
    try {
      const res = await fetchPost(id);
      // console.log('the response is', res)
      const data = await res.json();
      if (res.ok) {
        setPost(data.posts);
        if (data.posts.length < 7) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //fetch more post
  const startIndex = post.length;
  const handleShowMore = async () => {
    try {
      const res = await morePosts(id, startIndex);
      const data = await res.json();
      if (res.ok) {
        setPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 7) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //delte post code
  const handleDelete = async () => {
    setShowModal(false);
    try {
      const Id = currentUser._id;
      const res = await deletePosts(postIdToDelete, Id);
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
        navigate("/"); // Navigate to home page on failure
      } else {
        setPost((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      //   dispatch(deleteFailure(error.message));
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPosts();
  }, [id]);
  // console.log("the post is", post);
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.isAdmin && post.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell> 
            </Table.Head>
            {post.map((post) => (
              <Table.Body className="divide-y"key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-700 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}  
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}

      {showModal && (
        <DeletePost
          showModal={showModal}
          setShowModal={setShowModal}
          postIdToDelete={postIdToDelete}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Dashpost;
