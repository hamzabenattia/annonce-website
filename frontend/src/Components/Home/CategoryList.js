import React, { useState } from 'react'
import Card from './Card'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CardSkeleton from '../CardSkeleton';
import { Pagination } from 'flowbite-react';
import { Link } from 'react-router-dom';


const CategoryList = ({category ,data ,loading, error}) => {


  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [adsPerPage, setAdsPerPage] = useState(10);
  const totalPages = Math.ceil(data?.length / adsPerPage);




  return (
<section className="py-10">
  <div className='flex justify-between'>
  <h1 className="ml-[20px] text-start font-sans text-2xl font-bold text-gray-900">
    {category || "All Category"}<span className="text-orange-600">.</span>
  </h1>
 
  <Link to={`/search?category=${category}`}> <span className='mr-[20px] text-orange-600'>Afficher tous <ArrowCircleRightIcon style={{ color: "#EE493A" }} /></span></Link>
  </div>

  <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-3 p-6 md:grid-cols-2 lg:grid-cols-4">
   {
    loading  ? <div className='flex flex-wrap gap-3'>{Array.from(new Array(4)).map((item,i)=> <CardSkeleton key={i}/> )} </div>
    : error ? <div className='text-centertext-red-500 '>{error}</div> :  
    data?.length <1  ? <div className='text-center  font-bold text-slate-900'>Aucune annonce trouvée</div> :
    data?.slice(
      (currentPage - 1) * adsPerPage,
      currentPage * adsPerPage
     ).map((item,index) =>  <Card key={index} data = {item} />)
   } 
  </div>
  <div className="flex overflow-x-auto sm:justify-center">
      <Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
    </div>
</section>



       
  )
}

export default CategoryList