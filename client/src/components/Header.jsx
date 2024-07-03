import { Button, Navbar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  // console.log(searchTerm);
  const location = useLocation();
  const navigate = useNavigate();
  //handle function to set text in url enterd by serach field

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  //useEffects function
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const setSearchTermFromUrl = urlParams.get("searchTerm");
    if (setSearchTermFromUrl) {
      setSearchTerm(setSearchTermFromUrl);
    }
  }, [location.search]);
  return (
    <Navbar className="border-b-2 w-full px-1 md:px-6">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
          Shamim
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size='small'
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <Link to='/search'>
        <AiOutlineSearch onClick={()=>setShowSearchInput(true)}/>
        </Link>
      </Button>
      <div className="flex gap-2 md:order-2 justify-center items-center">
        <button onFocus='none'
          className="hidden md:inline  text-black right-3 rounded-full p-2 hover:bg-transparent hover:bg-slate-400 focus:outline-none"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <MdOutlineLightMode size='24'/> : <MdDarkMode size='24' color="white"/>}
        </button>
        <UserProfile />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
