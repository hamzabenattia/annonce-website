import React from 'react'
import { Link } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { formatDistance } from 'date-fns'


const AnnonceTable = ({annonce, handleDelete}) => {
  return (
   

             <tr key={annonce?._id} className='hover:bg-slate-100'>
             <td className="px-6 py-4 whitespace-nowrap">
               <div className="flex items-center">
                 <div>
                   <div className="text-sm font-medium text-gray-900">{annonce?.title}</div>
                   <div className="text-sm text-gray-500">{annonce?.category?.categoryName}</div>
                 </div>
               </div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               <div className="text-sm text-gray-900">
               {formatDistance(annonce?.createdAt, new Date(), { addSuffix: true })}
               </div>
             </td>
             <td className="px-6 py-4 whitespace-nowrap">
               {
                 annonce?.status === "accepted" ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                 Acceptée
               </span> : annonce?.status === "refused" ?  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                 Rejetée
               </span>
               :
                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                     En attente
                     </span>
               }
            
             </td>
             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                 {annonce?.createdBy?.firstname} {" "}{annonce?.createdBy?.lastname}
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
          
           

  )
}

export default AnnonceTable