import React from 'react'
import Header from './Header'
import { NavLink, Outlet } from 'react-router-dom'
import FooterComponent from './FooterComponent'
import { useAuth } from '../Hooks/AuthContext'

function Sidebar() {

  const {logout} = useAuth();
  return (
    <>
    <Header/>
<div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
<aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
<div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
  <h2 className="pl-3 mb-4 text-2xl font-semibold">Profile</h2>
  <NavLink
    
    to="/profile"
    className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
  >
    Profile information
  </NavLink>
  <NavLink
    to="/profile/mes-annonces"
    className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
  >
    Mes Annonces
      </NavLink>

      <button
      onClick={logout}
    className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"
  >
    Logout
      </button>

  
</div>
</aside>

<main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
<Outlet/> 

</main>






</div>
<FooterComponent/>
</>
  )
}

export default Sidebar