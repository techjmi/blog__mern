import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import { postLogin } from "../service/api";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSucess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
const Login = () => {
  const[formData, setFormData]= useState({})
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const {loading, error:errorMessage}= useSelector((user)=>user.user)
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value.trim();
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart())
      const res= await postLogin(formData)
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        // return setErrorMessage(data.message);
      }
      // setLoading(false);
      if(res.ok) {
        dispatch(signInSucess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      // setErrorMessage(error.message);
      // setLoading(false);
    }
  };
  return (
    <div className=" className='min-h-screen mt-20'">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link
            to="/"
            className="font-bold dark:text-white text-4xl flex items-center"
          >
            <div className="rounded-full overflow-hidden mr-2">
              <img
                src="logotube.jpg"
                alt="Blog Logo"
                className="w-12 h-12"
              />
            </div>
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Blog
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up either by entering your
            email and password or by using Google authentication.
          </p>
        </div>
        {/* right part */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
           
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage &&(
            <Alert className="mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

