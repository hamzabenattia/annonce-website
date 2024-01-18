import { formatDistance } from 'date-fns';
import { Carousel } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
 return (
  <article className="rounded-xl bg-white p-3 shadow-sm hover:shadow-md">

    <div className="relative flex items-end overflow-hidden h-60 rounded-xl">
    <Carousel>
            {
              data.images.map((item,index) => (
                <img key={index} src={item} alt=""/>
              ))
            }
          </Carousel>
    </div>
    <Link to={`/annonce/${data._id}`} >
    <div className="mt-1 p-2">
      <h2 className="text-slate-700">{data.title}</h2>
      <p className="text-slate-600 mt-1 text-sm">{data.category.categoryName}</p>
      <p className="text-slate-400 mt-1 text-sm">{data.location}</p>

      <div className="mt-2 flex items-end justify-between">
        <p>
          <span className="text-lg font-bold text-orange-500">{data.price}DT</span>
        </p>
        <span className="px-2.5 py-0.5 text-xs text-orange-500 bg-orange-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                {formatDistance(data.createdAt, new Date(), { addSuffix: true })}
              </span>
        
      </div>
    </div>
    </Link>
 
</article>



 );
};

export default Card;