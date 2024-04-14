import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSide from '../components/DashSide'
import DashProfile from '../components/DashProfile'
import Dashpost from '../components/Dashpost'
import DashUser from '../components/DashUser'
const Dashboard = () => {
  const location=useLocation()
  const [tab, setTab]= useState('')
  useEffect(()=>{
    const  urlParams= new URLSearchParams(location.search)
    const tabFromUrl=urlParams.get('tab')
    console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  })
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* sidebar dash board */}
   <div className="sidebar md:w-56">
<DashSide />
   </div>
   {/* side profile */}
   <div className='w-full'>
{tab==='profile' && <DashProfile />}
{tab==='posts' && <Dashpost  />}
{tab==='users' && <DashUser  />}
   </div>
    </div>
  )
}

export default Dashboard
