import axios from 'axios';
import React from 'react'
import { API_BASE_URL } from '../../constant/constant';
import useFetch from '../../Hooks/useFetch';

const Dashboard = () => {

  function asyncList() {
    return axios.get(API_BASE_URL + '/admin/dashboard/', { withCredentials: true });
}

const { data, isLoading } = useFetch(asyncList);

console.log(data)

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard