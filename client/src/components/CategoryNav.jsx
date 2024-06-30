import React from 'react'

const CategoryNav = ({ categories, onSelectCategory }) => {
  return (
   <>
   <div className="navbar border-t-2 border-b-2 overflow-x-auto flex flex-row gap-2 px-4 md:px-10 py-4">
   <ul className="flex flex-wrap justify-center items-center mx-auto gap-4">
        <li>
          <button onClick={() => onSelectCategory(null)} className="text-blue-500">
            All
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => onSelectCategory(category)} className="text-blue-500">
              {category}
            </button>
          </li>
        ))}
      </ul>
   </div>
   </>
  )
}

export default CategoryNav