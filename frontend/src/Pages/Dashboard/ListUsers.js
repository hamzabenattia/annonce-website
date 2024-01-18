import React, { useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import { API_BASE_URL } from '../../constant/constant';
import axios from 'axios';
import { Pagination, Spinner } from 'flowbite-react';


const ListUsers = () => {

  function asyncList() {
    return axios.get(API_BASE_URL+'/admin/users',{withCredentials: true} );
  }

  const { data, isLoading } = useFetch(asyncList);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?"))
    {
    axios.delete(API_BASE_URL+'/admin/users/'+id,{withCredentials: true} ).then((res)=>{
      window.location.reload();
    });
  }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [userPerPage, setUserPerPage] = useState(10);
  const totalPages = Math.ceil(data?.length / userPerPage);

    const handelUserEdit = (id,isActive,isAdmin) => {
      axios.put(API_BASE_URL+'/admin/users/'+id,{isActive,isAdmin},{withCredentials: true} ).then((res)=>{
        window.location.reload();
       });
    }




  return (
    <div className='flex flex-col m-20 gap-4'>
      <h1 className='text-xl font-bold'>List des Utilisateur : </h1>
      {
        isLoading ? <div className='text-center'><Spinner/></div> : 
      
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Name
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Phone
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Status
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Role
      </th>
      
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {
      data?.slice(
        (currentPage - 1) * userPerPage,
        currentPage * userPerPage
       ).map((user)=>(
        <tr key={user._id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={user.picture?.url || "https://www.w3schools.com/howto/img_avatar.png"} 
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{user.firstname} {user.lastname}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {user.phonenum}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <select onChange={(e) => handelUserEdit(user._id ,e.target.value,user.isAdmin) } className={`font-semibold text-sm ${user.isActive && 'bg-green-100 text-green-800'} ${!user.isActive && 'bg-red-100 text-red-800'}` }   defaultValue={user.isActive}>
              <option className='rounded-full bg-green-100 text-green-800'  value={true}>Active</option>
              <option  className='bg-red-100 text-red-800' value={false}>Desactive</option>
            </select>

  
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <select onChange={(e) => handelUserEdit(user._id ,user.isActive, e.target.value) } className={`font-semibold text-sm ${user.isAdmin && 'bg-blue-100 text-blue-800'} ${!user.isAdmin && 'bg-gray-100 text-gray-800'}` }   defaultValue={user.isAdmin}>
              <option className='rounded-full bg-blue-100 text-blue-800'  value={true}>Admin</option>
              <option  className='bg-gray-100 text-gray-800' value={false}>User</option>
            </select>
        
        </td>
       
        <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
          <div onClick={() => handleDelete(user._id)} className="ml-2 text-red-600 hover:text-red-900 cursor-pointer">
            Delete
          </div>
        </td>
      </tr>
      ))

    }
  

   
   
  </tbody>
</table>}
<Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />


    </div>
  )
}

export default ListUsers