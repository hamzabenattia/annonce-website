import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch'
import axios from 'axios'
import { API_BASE_URL } from '../constant/constant'
import { formatDistance } from 'date-fns'
import DeleteModel from '../Components/DeleteModel'
import EditAnnonceModel from '../Components/EditAnnonceModel'
import { Spinner } from 'flowbite-react'

function MesAnnonce() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setEditModal] = useState(false);



  function asyncList() {
    return axios.get(API_BASE_URL+'/annonce/mylist',{withCredentials: true} );
  }

  const { data, isLoading } = useFetch(asyncList);



  return (
    <div className='flex flex-col m-10 items-center justify-center '>
      <h1 className='text-2xl font-bold'>Mes Annonce Publier</h1>
     {
      isLoading ? <div className="text-center"><Spinner/></div> : 
     
      
      <table className="table-auto border-collapse border border-orange-200 m-10">
  <thead>
    <tr>
      <th className="border border-orange-200 px-4 py-2">Image</th>
      <th className="border border-orange-200 px-4 py-2">Title</th>
      <th className="border border-orange-200 px-4 py-2">Posted date</th>
      <th className="border border-orange-200 px-4 py-2">Status</th>
      <th className="border border-orange-200 px-4 py-2">Action</th>
    </tr>
  </thead>
  <tbody>
    
    {
      data?.map((item,index)=>{
        return(
          <tr key={item._id}>
      <td className="border border-orange-200 px-4 py-2"><img className='w-32 h-32' src={item.images[0]}/></td>
      <td className="border border-orange-200 px-4 py-2">{item.title}</td>
      <td className="border border-orange-200 px-4 py-2">{formatDistance(item.createdAt, new Date(), { addSuffix: true })}</td>
     <td className="border border-orange-200 px-4 py-2">  {
            item.status === "accepted" ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Accepter
          </span> : item.status === "refused" ?  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Rejecter
          </span>
          :
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                En Attend
                </span>
          }</td>
      <td  className="border border-orange-200 px-4 py-2 ">
        <Link to={`/annonce/${item._id}`} className='text-slate-100 p-2 bg-blue-600 rounded-lg'>Voir</Link>
        <button  onClick={()=>setEditModal(true)} className='text-slate-100 p-2 bg-green-600 rounded-lg'>Modifier</button>
        <button onClick={()=>setOpenModal(true)} className='text-slate-100 p-2 bg-red-600 rounded-lg'>Delete</button>
        <EditAnnonceModel openModal={openEditModal} setOpenModal={setEditModal} data={item}/>

        <DeleteModel openModal={openModal} setOpenModal={setOpenModal} item={item}/>

      </td>
    </tr>
        )
      })
    }
  
    </tbody>
</table>
}

    </div>
  )
}

export default MesAnnonce