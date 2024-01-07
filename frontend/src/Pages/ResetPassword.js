import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import FooterComponent from '../Components/FooterComponent';
import { Spinner } from 'flowbite-react';

const ResetPassword = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setErr("Password Doesn't Match");
      setIsLoading(true);

    }
    else{
        setIsLoading(true);
        await axios.put('http://localhost:1000/api/auth/password/reset/'+params.token, {password} , {withCredentials: true} 
          )
        .then((res) => {
            setIsLoading(false);
            navigate('/login');

        }).catch((err) => {
            setErr(err.response.data.message);
            setIsLoading(false);
        }
        );
    }
  }



  return (
<>
<Header/>
<section >
  <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Change Password
      </h2>
      <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
        
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="confirm-password"
            name="confirm-password"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
          />
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}

        {isLoading && <div className="text-center"><Spinner/></div>}

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-orange-300 hover:bg-orange-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Reset passwod
        </button>
      </form>
    </div>
  </div>
</section>

<FooterComponent/>

</>

  

  )
}

export default ResetPassword