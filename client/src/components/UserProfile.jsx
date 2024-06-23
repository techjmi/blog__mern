import { Avatar, Button, Dropdown } from 'flowbite-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutUser } from '../service/api'
import { signOutSccess } from '../redux/user/userSlice'
const UserProfile = () => {
    const {currentUser}=useSelector((state)=>state.user)
    const dispatch= useDispatch()
    const handleLogout=async()=>{
      const res=await signOutUser()
      const data= await res.json()
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signOutSccess())
      }
     }
  return (
    <div>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
    </div>
  )
}

export default UserProfile