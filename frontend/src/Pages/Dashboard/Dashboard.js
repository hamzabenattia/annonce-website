import axios from 'axios';
import React from 'react'
import { API_BASE_URL } from '../../constant/constant';
import useFetch from '../../Hooks/useFetch';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { PieChart } from '@mui/x-charts/PieChart';
import { Spinner } from 'flowbite-react';


const Dashboard = () => {

  function asyncList() {
    return axios.get(API_BASE_URL + '/admin/dashboard/', { withCredentials: true });
}

const { data, isLoading } = useFetch(asyncList);

console.log(data)

  return (
    <>
   { 
    isLoading ? <div className='text-center'>
    <Spinner/>
    </div> :
    
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-2 justify-between items-center'>

             <div className='flex flex-col text-center bg-white shadow-sm w-36 rounded-lg mx-2 p-4'>
             <span className="icon icon-sm rounded-circle alert-primary">
              <PersonIcon  className="text-primary" />
            </span>
                <div className='text-gray-700 text-sm'>Total User</div>
                <div className='text-blue-300 text-2xl font-bold'>{data?.totalUser}</div>
              </div>

              <div className='flex flex-col text-center bg-white shadow-sm w-36 rounded-lg mx-2 p-4'>
             <span className="icon icon-sm rounded-circle alert-primary">
              <CategoryOutlinedIcon  className="text-primary" />
            </span>
                <div className='text-gray-700 text-sm'>Total Category</div>
                <div className='text-blue-300 text-2xl font-bold'>{data?.totalCategory}</div>
              </div>

              <div className='flex flex-col text-center bg-white shadow-sm w-36 rounded-lg mx-2 p-4'>
             <span className="icon icon-sm rounded-circle alert-primary">
              <DescriptionOutlinedIcon  className="text-primary" />
            </span>
                <div className='text-gray-700 text-sm'>Total Ads</div>
                <div className='text-blue-300 text-2xl font-bold'>{data?.totalAds}</div>
              </div>

              <div className='flex flex-col text-center bg-white shadow-sm w-36 rounded-lg mx-2 p-4'>
             <span className="icon icon-sm rounded-circle alert-primary">
              <DescriptionOutlinedIcon  className="text-green-500" />
            </span>
                <div className='text-gray-700 text-sm'>Accepted Ads</div>
                <div className='text-green-300 text-2xl font-bold'>{data?.acceptedAds}</div>
              </div>

              <div className='flex flex-col text-center bg-white shadow-sm w-36 rounded-lg mx-2 p-4'>
             <span className="icon icon-sm rounded-circle alert-primary">
              <DescriptionOutlinedIcon  className="text-yellow-300" />
            </span>
                <div className='text-gray-700 text-sm'>Pending Ads</div>
                <div className='text-yellow-200 text-2xl font-bold'>{data?.pendingAds}</div>
              </div>

              <div className='flex flex-col text-center bg-white shadow-sm w-36 rounded-lg mx-2 p-4'>
             <span className="icon icon-sm rounded-circle alert-primary">
              <DescriptionOutlinedIcon  className="text-danger" />
            </span>
                <div className='text-gray-700 text-sm'>Rejected Ads</div>
                <div className='text-red-300 text-2xl font-bold'>{data?.rejectedAds}</div>
              </div>






      
        </div>

<div className='flex flex-wrap m-11 justify-around'>
  <div className='shadow-sm rounded-lg '>
  <PieChart
      series={[
        {
          data: [
            { id: 0, value: data.acceptedAds || 0, label: 'Accepted' , color: '#0E9F6E' },
            { id: 1, value: data.rejectedAds|| 0, label: 'Refused' , color: '#DC3545' },
            { id: 2, value: data.pendingAds|| 0, label: 'Pending' , color: '#F9E79F'},
          ],
        },
      ]}
      width={400}
      height={200}
    />
  </div>

  <div className='shadow-sm rounded-lg'>
  <PieChart
      series={[
        {
          data: [
            { id: 0, value: data.acceptedAds || 0, label: 'Accepted' },
            { id: 1, value: data.rejectedAds|| 0, label: 'Refused' },
            { id: 2, value: data.pendingAds|| 0, label: 'Pending' },
          ],
        },
      ]}
      width={400}
      height={200}
    />


  </div>
</div>

    </div>}
    </>
  )
}

export default Dashboard