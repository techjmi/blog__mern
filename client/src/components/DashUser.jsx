import React, { useEffect, useState } from "react";
import { deleteUser, fetchUser,  moreUsers } from "../service/api";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import DeleteUserModal from "./DeleteUserModal.jsx";
import { FaCheck, FaTimes } from 'react-icons/fa';
const DashUser = () => {
  const [post, setPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userIdToDelete, setuserIdToDelete] = useState("");
  var id = currentUser._id;
  //get user
  const getPosts = async () => {
    try {
      const res = await fetchUser();
      const data = await res.json();
      // console.log('the response is', data)
      if (res.ok) {
        setPost(data.users);
        if (data.users.length < 7) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //fetch more user
  const startIndex = post.length;
  const handleShowMore = async () => {
    try {
      const res = await moreUsers(startIndex);
      const data = await res.json();
      if (res.ok) {
        setPost((prev) => [...prev, ...data.users]);
        if (data.users.length < 7) {
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
      // const Id = currentUser._id;
      const res = await deleteUser(userIdToDelete);
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
        navigate("/");
      } else {
        setPost((prev) =>
          prev.filter((post) => post._id !==userIdToDelete)
        );
        setShowModal(false)
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
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Profile image</Table.HeadCell>
              <Table.HeadCell>UserName</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              {/* <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell> */}
            </Table.Head>
            {post.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                      <img
                        src={post.profilePicture}
                        alt={post.title}
                        className="w-20 h-20 object-cover bg-gray-500 rounded-full"
                      />
                  </Table.Cell>
                  <Table.Cell>
                {post.username}

                  </Table.Cell>
                  <Table.Cell>{post.email}</Table.Cell>
                  {/* <Table.Cell>{post.isAdmin?"yes":"no"}</Table.Cell> */}
                  <Table.Cell>
                    {post.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setuserIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
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
        <p>You have No Users</p>
      )}

      {showModal && (
        <DeleteUserModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default DashUser;
