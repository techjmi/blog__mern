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
import NavBar from './components/NavBar'

function App() {
  

  return (
   <BrowserRouter>
   <Header />
   {/* <NavBar /> */}
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
