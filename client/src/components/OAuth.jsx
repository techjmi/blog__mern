import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import{GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { GoogleLogin } from '../service/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure } from '../redux/user/userSlice';
// import app from ''
const OAuth = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const auth=getAuth(app)
    const handleGoogleClick=async()=>{
const Provider= new GoogleAuthProvider()
Provider.setCustomParameters({prompt:"select_account"})
try {
    const resultFromGoogle=await signInWithPopup(auth, Provider)
    const user_info={
        name:resultFromGoogle.user.displayName,
        email:resultFromGoogle.user.email,
        photoURL:resultFromGoogle.user.photoURL
    }
    // console.log(user_info)
  const res=await GoogleLogin(user_info)
  const data= await res.json()
  if (data.success === false) {
    dispatch(signInFailure(data.message))
    // return setErrorMessage(data.message);
  }
  if(res.ok){
    navigate('/')
  }
  // console.log(res)
} catch (error) {
    console.log('the error while getting', error.message)
}

    }
  return (
   <>
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
   </>
  )
}

export default OAuth
