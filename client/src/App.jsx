import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Project from './pages/Project'
import Header from './components/Header'
import FooterCom from './components/Foote'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import SearchPage from './pages/SearchPage'
import { Button } from 'flowbite-react'
import { toggleTheme } from './redux/theme/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
// import NavBar from './components/NavBar

function App() {
  const dispatch= useDispatch()
  const { theme } = useSelector((state) => state.theme);

  return (
   <BrowserRouter>
    <Header />
   <>
   <button
      className="md:hidden inline fixed top-22 z-40 backdrop-blur-xl bg-slate-300 text-black right-3 rounded-full p-3 shadow-lg focus:outline-none"
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? <MdOutlineLightMode size='24' /> : <MdDarkMode size='24' />}
    </button>
   </>
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Login />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/search' element={<SearchPage />} />
    <Route element={<PrivateRoute />}>
    <Route path='/dashboard' element={<Dashboard />} />  
    </Route>
    <Route element={<AdminRoute />}>
    <Route path='/create-post' element={<CreatePost />} />
    <Route path='/update-post/:postId' element={<UpdatePost />} />
    </Route>
    <Route path='/about' element={<About />} />
    <Route path='/projects' element={<Project />} />
    <Route path='/post/:postSlug' element={<PostPage />} />
   </Routes>
   <FooterCom />
   </BrowserRouter>
  )
}

export default App
