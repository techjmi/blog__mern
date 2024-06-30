import React from 'react'

const CategoryNav = () => {
  return (
   <>
   <div className="navbar border-t-2 bg-slate-50 overflow-x-auto flex flex-row gap-2 px-4 md:px-10 py-4">
<ul className='flex gap-6 w-full mx-auto justify-center'>
    <li className='font-semibold cursor-pointer'>Reactjs</li>
    <li className='font-semibold cursor-pointer'>HTML</li>
    <li className='font-semibold cursor-pointer'>CSS</li>
    <li className='font-semibold cursor-pointer'>NodeJs</li>
   
</ul>
   </div>
   </>
  )
}

export default CategoryNav