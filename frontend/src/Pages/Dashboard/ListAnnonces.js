import React, { useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import { API_BASE_URL } from '../../constant/constant';
import axios from 'axios';
import { Pagination } from 'flowbite-react';
import { formatDistance } from 'date-fns';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from 'react-router-dom';

const ListAnnonces = () => {

  function asyncList() {
    return axios.get(API_BASE_URL+'/admin/annonce',{withCredentials: true} );
  }

  const { data, isLoading } = useFetch(asyncList);



  // Delete Annonce

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this annonce?"))
    {
    axios.delete(API_BASE_URL+'/admin/annonce/'+id,{withCredentials: true} ).then((res)=>{
      window.location.reload();
    });
  }
  }


  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [annoncePerPage, setannoncePerPage] = useState(10);
  const totalPages = Math.ceil(data?.length / annoncePerPage);






  return (
    <div className='flex flex-col m-20 gap-4'>
      <h1 className='text-xl font-bold'>List des Annonces : </h1>
      {
        isLoading ? <div>Loading...</div> : 
      
      <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Titre
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Date de publication

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
        Annonceur
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
        (currentPage - 1) * annoncePerPage,
        currentPage * annoncePerPage
       ).map((annonce)=>(
    

        <tr key={annonce._id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">{annonce.title}</div>
              <div className="text-sm text-gray-500">{annonce.category.categoryName}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
          {formatDistance(annonce.createdAt, new Date(), { addSuffix: true })}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {
            annonce.status === "accepted" ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Acceptée
          </span> : annonce.status === "refused" ?  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Rejetée
          </span>
          :
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                En attente
                </span>
          }
       
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {annonce.createdBy.firstname} {" "}{annonce.createdBy.lastname}
        </td>
       
        <td className="px-6 flex py-4 whitespace-nowrap  text-sm font-medium">
         
          <div onClick={() => handleDelete(annonce._id)} className="ml-2 text-red-600 hover:text-red-900 cursor-pointer">
          <DeleteOutlineOutlinedIcon/>
          </div>
          <Link to={annonce._id}>
          <div className="ml-2 text-green-600 hover:text-red-900 cursor-pointer">
            <VisibilityOutlinedIcon/>
          </div>
          </Link>
        </td>
      </tr>
     
      
      ))

    }

  <Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />

   
   
  </tbody>
</table>}


    </div>
  )
}

export default ListAnnonces