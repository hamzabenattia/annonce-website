import { Done } from '@mui/icons-material'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import { API_BASE_URL } from '../constant/constant';
import { Spinner } from 'flowbite-react';

function ConfirmeEmail() {

    const params = useParams();

    function asyncList() {
        return axios.get(API_BASE_URL+'/auth/confirme/'+params.token,{withCredentials: true} );
      }

    
      const { data, isLoading , error } = useFetch(asyncList);
    

  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >

{
    isLoading ? <div className='text-center'> <Spinner/> </div> :

    data ? < >
    <Done style={{ fontSize: 100, color: "green" }} /> 

    <p className='mt3'>
    {data}
    </p>
    <Link to="/login">
        <button className='p-3 mt-10 bg-orange-500  rounded-xl text-white'>
            Go to Login page
            </button></Link>

    </>
    :   error && <> <ErrorIcon style={{ fontSize: 100, color: "red" }} />
    <p className='mt-3'>{error}</p>
<Link to="/login">
    <button className='p-3 mt-10 bg-orange-500  rounded-xl text-white '>Go to Login page</button></Link>
</> 
}

  </div>
  )
}

export default ConfirmeEmail