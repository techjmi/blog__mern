import { Button, Modal, } from 'flowbite-react'
import React, { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import { deleteData } from '../service/api';
import { deleteFailure, deleteSuccess } from '../redux/user/userSlice';
const DeleteModal = ({showModal,setShowModal}) => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch= useDispatch()
    //delete function
    const handleDeleteUser=async()=>{
setShowModal(false);
    try {
        const id= currentUser._id
        const res=await deleteData(id)
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
    }
  return (
    <>
    <Modal show={showModal} onClose={()=>setShowModal(false)} size='md'>
        <Modal.Header />
        <Modal.Body>
        <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-2 mx-auto' />
            <h3 className='mb-2 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-2'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default DeleteModal
