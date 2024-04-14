import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import{Link} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { signOutUser, updateData } from "../service/api";
import { signOutSccess, updateFailure, updateStart, updateSucess } from "../redux/user/userSlice";
import DeleteModal from "./DeleteModal.jsx";
//main code

const DashProfile = () => {
  const { currentUser , loading} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const[formData, setFormData]= useState({})
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const[showModal, setShowModal]= useState(false)
  const dispatch= useDispatch()
  // console.log(imageFileUploadProgress, imageFileUploadError);
  //modal dislplaying code
  const handleModal = () => {
    console.log("click")
    setShowModal(true);
  };
  //image handle code
  const handleImgeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log(imageFile, imageFileUrl);
  //hide image choosing and choose with profile image
  const ImageFilePicRef = useRef();
  //image upload to firebase code

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);

        });
      }
    );
  };
  //handlechange function
  const handlechange=(e)=>{
    const id= e.target.id
    const value=e.target.value
    setFormData({...formData,[id]:value})
  }
  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      const id= currentUser._id
      dispatch(updateStart());
     const res= await updateData(id, formData)
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSucess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
 //logout function
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

  //useEffect function to upload image
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImgeChange}
          ref={ImageFilePicRef}
          hidden
        />
        <div className="relative w-24 h-24 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]${
              imageFileUploadProgress &&
              imageFileUploadProgress <100 &&
              `opacity-10`
            }`}
            onClick={() => ImageFilePicRef.current.click()}
          />
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handlechange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handlechange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="*****"
          onChange={handlechange}
          //   defaultValue={currentUser.username}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      {currentUser && currentUser.isAdmin &&(
      <Link to='/create-post'>
 <Button type="button" gradientDuoTone="purpleToBlue" outline className="w-full mt-3">
          Create Post
        </Button>
      </Link>
      )}
      <div className="text-red-500 flex justify-between mt-3">
        <span className="cursor-pointer" onClick={handleModal}>Delete Account</span>
        <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
      </div>
      {updateUserSuccess &&(
        <Alert color="success" className="mt-5">{updateUserSuccess}</Alert>
      )}
         {updateUserError &&(
        <Alert color="failure" className="mt-5">{updateUserError}</Alert>
      )}
      {
        showModal && (
         <DeleteModal showModal={showModal} setShowModal={setShowModal}/>
        )
      }
    </div>
  );
};

export default DashProfile;