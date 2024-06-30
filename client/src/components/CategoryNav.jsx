import React from 'react'

const CategoryNav = () => {
  return (
   <>
   <div className="navbar border-t-2 border-b-2 overflow-x-auto flex flex-row gap-2 px-4 md:px-10 py-4">
<ul className='flex gap-6 w-full mx-auto justify-center'>
    <li className='font-semibold cursor-pointer'>Reactjs</li>
    <li className='font-semibold cursor-pointer'>HTML</li>
    <li className='font-semibold cursor-pointer'>CSS</li>
    <li className='font-semibold cursor-pointer'>NodeJs</li>
    <li className='font-semibold cursor-pointer'>MongoDB</li>
    <li className='font-semibold cursor-pointer text-nowrap'>React Native</li>
    <li className='font-semibold cursor-pointer'>Javascript</li>
    <li className='font-semibold cursor-pointer'>ExpressJs</li>
   
</ul>
   </div>
   </>
  )
}

export default CategoryNav