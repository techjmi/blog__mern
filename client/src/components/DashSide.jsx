import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { MdDashboard } from "react-icons/md";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../service/api";
import { signOutSccess } from "../redux/user/userSlice";
const DashSide = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    // console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  });
  //logout function
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const res = await signOutUser();
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      dispatch(signOutSccess());
    }
  };
  return (
    <>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-3">
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=dash">
                <Sidebar.Item
                  active={tab === "dash"}
                  icon={MdDashboard}
                  as="div"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
            )}
            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === "profile"}
                icon={HiUser}
                label={currentUser.isAdmin ? "Admin" : "User"}
                labelColor="dark"
                as="div"
              >
                Profile
              </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  as="div"
                >
                  Posts
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  User
                </Sidebar.Item>
              </Link>
            )}
            <Sidebar.Item icon={HiArrowSmRight} as="div">
              <Link to="/" onClick={handleLogout}>
                Sign Out
              </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default DashSide;
