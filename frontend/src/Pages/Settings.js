import axios from 'axios';
import React, { useState } from 'react'
import { API_BASE_URL } from '../constant/constant';
import useFetch from '../Hooks/useFetch';
import { Spinner } from 'flowbite-react';

function Settings() {

const [formData , setFormData] = useState({
  firstname:'',
  lastname:'',
  email:'',
  phonenum:'',
  picture:''
});

const [suceess , setSuccess] = useState(""); 
const [error , setError] = useState("");
const [loading , setLoading] = useState(false);

  function asyncList() {
    return axios.get(API_BASE_URL+'/user/',{withCredentials: true} );
  }

  const { data, isLoading } = useFetch(asyncList);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(API_BASE_URL+'/user/update',formData,{withCredentials: true} ).then((res) => {  
        setLoading(false);
        setSuccess(res.data.message);
          setError("");
      }).catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
        setSuccess("");
      }
      );
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }



  const handleDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
        setFormData({
          ...formData,
          picture:reader.result
        });
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	}



  return (
    <>
    {
      isLoading ? 
      <div className="text-center">
      <Spinner aria-label="Center-aligned spinner example"/>
    </div>
    :
    <div className="p-2 md:p-4">
    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
      <div className="grid max-w-2xl mx-auto mt-8">
        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
          
          <img
            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-orange-500"
            src={data?.picture?.url || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"}
            alt="Bordered avatar"
          />
          <div className="flex flex-col space-y-5 sm:ml-8">
        
            <input
            
            onChange={handleDataChange}
              type="file"
              className="py-3.5 px-7 text-base font-medium text-orange-900 focus:outline-none bg-white rounded-lg border border-orange-200 hover:bg-orange-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-orange-200 "
            />
              
          
          
          </div>
        </div>
        <div className="items-center mt-8 sm:mt-14 text-[#202142]">
          <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
              >
                Your first name
              </label>
              <input
                type="text"
                onChange={handleChange}
                id="first_name"
                name='firstname'
                className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                placeholder="Your first name"
                defaultValue={data?.firstname}
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
              >
                Your last name
              </label>
              <input
                 onChange={handleChange}
                type="text"
                name='lastname'
                id="last_name"
                className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                placeholder="Your last name"
                defaultValue={data?.lastname}
                required=""
              />
            </div>
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              onChange={handleChange}

              id="email"
              name='email'
              className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="your.email@mail.com"
              required=""
              defaultValue={data?.email}
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="profession"
              className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name='phonenum'
              onChange={handleChange}

              defaultValue={data?.phonenum}

              id="profession"
              className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="your profession"
              required=""
            />
          </div>
         {
            suceess && <div className="text-green-500 text-center">{suceess}</div>
          }
          {
            error && <div className="text-red-500 text-center">{error}</div>
          }
          {
            loading && <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example"/>
          </div>
         }
         
         
          <div className="flex justify-end">
            <button 
            onClick={handleSubmit}
              type="submit"
              className="text-white bg-orange-600  hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

    }
   </>
  )
}

export default Settings