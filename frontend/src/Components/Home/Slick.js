import React, { useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Computer, Home, Smartphone, TimeToLeave, TvRounded } from '@mui/icons-material'



const Slick = ({searchParams,setCategory }) => {
    const settings = {
      infinite: false,
      speed: 500,
      dots: true,
      slidesToShow: 6,
      slidesToScroll: 6,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
        
      };


      const handleCategoryClick = (newCategory) => {
        setCategory(newCategory);
        searchParams.set('category', newCategory);
        searchParams.toString();
        window.history.replaceState(null, null, '?' + searchParams);
    
      };
    

  return (
    <Slider {...settings}>
        <div>   
               <div className='cursor-pointer text-[rgb(174,174,174)] flex items-center gap-2.5 justify-center hover:text-[rgb(143,143,143)] hover:scale-110'>  
    <Computer/>   
      <span onClick={() => handleCategoryClick('Ordinateur')}>Ordinateur</span>
        </div>

        </div>

        <div>
        <div className='cursor-pointer text-[rgb(174,174,174)] flex items-center gap-2.5 justify-center hover:text-[rgb(143,143,143)] hover:scale-110'>  
    <Smartphone/>   
      <span onClick={() => handleCategoryClick('SmartPhone')} >SmartPhone</span>
    </div>
        </div>

        <div>
        <div className='cursor-pointer text-[rgb(174,174,174)] flex items-center gap-2.5 justify-center hover:text-[rgb(143,143,143)] hover:scale-110'>  
    <Home/>   
      <span onClick={() => handleCategoryClick('immobilier')} >immobilier</span>
    </div>
        </div>


        <div>
        <div className='cursor-pointer text-[rgb(174,174,174)] flex items-center gap-2.5 justify-center hover:text-[rgb(143,143,143)] hover:scale-110'>  
    <TvRounded/>   
      <span onClick={() => handleCategoryClick('TV')} >TV</span>
    </div>
        </div>

      <div>
        <div className='cursor-pointer text-[rgb(174,174,174)] flex items-center gap-2.5 justify-center hover:text-[rgb(143,143,143)] hover:scale-110'>
    <TimeToLeave/>
      <span onClick={() => handleCategoryClick('Véhicules')} >Véhicules</span>
</div>
</div>



       
  </Slider>
  )
}

export default Slick
