import React, { useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import { API_BASE_URL } from '../../constant/constant';
import axios from 'axios';
import { Pagination, Spinner } from 'flowbite-react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';


const Category = () => {

  function asyncList() {
    return axios.get(API_BASE_URL+'/category',{withCredentials: true} );
  }
  const [categoryName, setCategoryName] = useState("")
  const [editCategoryName, setEditCategoryName] = useState("")
  const [success , setSuccess] = useState("")
  const [error , setError] = useState("")
  const [loading , setLoading] = useState(false)

  const { data, isLoading } = useFetch(asyncList);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?"))
    {
    axios.delete(API_BASE_URL+'/category/'+id,{withCredentials: true} ).then((res)=>{
      window.location.reload();
    });
  }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [userPerPage, setUserPerPage] = useState(5);
  const totalPages = Math.ceil(data?.length / userPerPage);



  const addCategory = (e) => { 
    e.preventDefault();
    setLoading(true)
    axios.post(API_BASE_URL+'/category/', {categoryName},{withCredentials: true} ).then((res)=>{
        setSuccess(res.data.message)
        setError("")
        setLoading(false)
        window.location.reload();
    }).catch((err)=>{
        setSuccess("")
        setError(err.response.data.message)
        setLoading(false)
    })
  }

  const handelEddit = (id) => {
    axios.patch(API_BASE_URL+'/category/'+id,{categoryName:editCategoryName},{withCredentials: true} ).then((res)=>{
    
        window.location.reload();
    });
  }



  return (

    <div className='flex flex-col md:flex-row gap-4'>
     
    <div className='flex flex-col md:m-20 gap-4'>
      <h1 className='text-xl font-bold'>List des Categories : </h1>
      {
        isLoading ? <div>Loading...</div> : 
      
      <table className="max-w-fit divide-y divide-gray-200 overflow-x-auto">
  <thead className="bg-gray-50">
    <tr>
    <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        #
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Category Name
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
       ).map((category,index)=>(
        <tr key={category._id}>
            <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
         <span>
           {index+1}
         </span>
         
       </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="ml-4">
              <input type='text' onChange={(e)=> setEditCategoryName(e.target.value)} defaultValue={category.categoryName} className="text-sm font-medium text-gray-900"/>
            </div>
          </div>
        </td>
        
       
        <td className="px-6 py-4 whitespace-nowrap flex  text-sm font-medium">
         
          <div onClick={() => handleDelete(category._id)} className="ml-2 text-red-600 hover:text-red-900 cursor-pointer">
          <DeleteOutlinedIcon/>
          </div>
          <div onClick={() => handelEddit(category._id)} className="ml-2 text-green-600 hover:text-green-900 cursor-pointer">
            <EditIcon/>
          </div>

        </td>
      </tr>
      ))

    }
  
  <Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />

   
   
  </tbody>
</table>}


    </div>

    <div className='flex flex-col m-20 gap-4'>
        <h1 className='text-xl font-bold'>Ajouter une Category : </h1>
        <form className='flex flex-col gap-4'>
            <input onChange={(e)=>setCategoryName(e.target.value)} className='border-2 border-gray-300 p-2 rounded-lg' type='text' placeholder='Category Name' />
           {
                success && <div className='text-green-500'>{success}</div>
            }
            {
                error && <div className='text-red-500'>{error}</div>
            }
            {
                loading &&  <div className="text-center">
                    <Spinner/>
                </div>
            
           }
            <button onClick={addCategory} className='bg-blue-500 text-white p-2 rounded-lg'>Ajouter</button>
        </form>
        </div>

    </div>
  )
}

export default Category