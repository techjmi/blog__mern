import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPostLimit, fetchUserLimit } from "../service/api";
import{Button, Table} from 'flowbite-react'
import{Link} from 'react-router-dom'
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
const Dashboardcomp = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const fetchLimitUser = async () => {
    try {
      const res = await fetchUserLimit();
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
        // console.log('limit user', data)
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //fetch limit post
  const fetchLimitPost = async () => {
    try {
      const res = await fetchPostLimit();
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
        // console.log("limit user", data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchLimitUser();
    fetchLimitPost();
  }, []);
  return (
    <div className="p-3 md:mx-auto">
      <div className="top_part  p-5 flex-wrap flex gap-4 justify-center">
        <div className="part_1 bg-slate-100 text-black flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
          <div className="">
          <h3 className="text-gray-500 text-md uppercase">Total User</h3>
          <p className="text-2xl text-gray-500">{totalUsers}</p>
        </div>
        <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className="part_1 bg-slate-100 text-black flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
          <div className="">
          <h3 className="text-gray-500 text-md uppercase">Total Post</h3>
          <p className="text-2xl text-gray-500">{totalPosts}</p>
        </div>
        <HiDocumentText className="bg-indigo-500 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
        {/* after top part means table part  where recant user and post*/}
      <div className="flex flex-wrap py-3  gap-10 justify-center">
        {/* table1 part for user */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="font-semibold text-center p-2">Recent User</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=users'}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        {/* table 2 part.. means post part */}
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="font-semibold text-center p-2">Recent Post</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=posts'}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell className="w-96">Post Tiltle</Table.HeadCell>
              <Table.HeadCell className="w-5">Post Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={user.image}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Link to={`/post/${user.slug}`}> <Table.Cell>{user.title}</Table.Cell></Link>
                    <Table.Cell>{user.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboardcomp;
