import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../firebase";
import { postBlog } from "../service/api";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate= useNavigate()
  //image uplaod function
  const hanleUploadImage = async () => {
    // console.log('uplaod cliecked')
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      // const fileName = new Date().getTime()+file.name;
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  //handle submit function
  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log(formData);
    try {
      const res= await postBlog(formData)
      const data= await res.json()
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log('error is', error.message)
      setPublishError('Something went wrong');
    }
  };
  //
  // console.log("form data", formData)
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>{
              // console.log('Selected category:', e.target.value);
              setFormData({ ...formData, category: e.target.value })
            }}
          >
            <option value="uncategorized">Select a category</option>
            <option value="General">General</option>
            <option value="CSS">CSS</option>
            <option value="HMTL">HTML</option>
            <option value="JavaScrip">JavaScript</option>
            <option value="ReactJs">ReactJs</option>
            <option value="React-Native">React-Native</option>
            <option value="Database">Database</option>
            <option value="NodeJs">NodeJs</option>
            <option value="Entertainmet">Entertainment</option>
            <option value="Sports">Sports</option>
          </Select>
        </div>
        <div className="flex gap-3 items-center justify-between border-2 border-teal-500 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onClick={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            size="sm"
            onClick={hanleUploadImage}
            disabled={imageUploadProgress}
          >
          {imageUploadProgress ?(
            <div><CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress ||0}%`}/></div>
          ):
          ('Upload Image')}
           
          </Button>
        </div>
        {
          imageUploadError &&(
            <Alert color='failure'>{imageUploadError}</Alert>
          )
        }
        {formData.image&&(
          <img src={formData.image} alt="" className="w-full h-72 object-cover"/>
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something...."
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};
export default CreatePost;
