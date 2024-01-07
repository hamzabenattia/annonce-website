import React, { useEffect } from 'react'
import Header from '../Components/Header'
import FooterComponent from '../Components/FooterComponent'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/AuthContext'
import { Spinner } from 'flowbite-react'

const Signup = () => {

  const { isLoggedIn,isLoading,error,formData, signup, setFormData  } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
   if (isLoggedIn)
   {
    navigate('/')
   }
   
  }, [isLoggedIn]);

  return (
    <>
    <Header/>
    <div className="flex justify-center items-center text-slate-800">
    <div className="flex w-full flex-col md:w-1/2">
      <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
        <p className="text-center text-2xl font-bold md:text-left md:leading-tight">
          Create your free account
        </p>
        <p className="mt-6 text-center font-medium md:text-left">
          Already using Tayara? {" "}
          <Link to="/login" className="whitespace-nowrap font-semibold text-orange-500">
            Login
          </Link>
        </p>
      
        <form className="flex flex-col items-stretch pt-3 mb-10 md:pt-8">
          <div className="flex flex-col pt-4">
          <div className="relative mt-2 w-full">
          <input
            type="text"
            id="email"
            name='email'
            onChange={handleChange}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0"
            placeholder=""
          />
          <label
            htmlFor="email"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-orange-600"
          >
            Enter Your Email
          </label>
        </div>
            <div>
       
      </div>
          </div>
         
          <div className="flex flex-col pt-4">
          <div className="relative mt-2 w-full">
          <input
            type="text"
            id="firstname"
            name='firstname'
            onChange={handleChange}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0"
            placeholder=""
          />
          <label
            htmlFor="firstname"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-orange-600"
          >
            Enter Your First Name
          </label>
        </div>
            <div>
       
      </div>
          </div>

          <div className="flex flex-col pt-4">
          <div className="relative mt-2 w-full">
          <input
            type="text"
            id="lastname"
            name='lastname'
            onChange={handleChange}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0"
            placeholder=""
          />
          <label
            htmlFor="lastname"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-orange-600"
          >
            Enter Your Last Name
          </label>
        </div>
            <div>
       
      </div>
          </div>

          <div className="flex flex-col pt-4">
          <div className="relative mt-2 w-full">
          <input
            type="text"
            id="phonenum"
            name='phonenum'
            onChange={handleChange}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0"
            placeholder=""
          />
          <label
            htmlFor="phonenum"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-orange-600"
          >
            Enter Your Phone Number
          </label>
        </div>
            <div>
       
      </div>
          </div>

          <div className="flex flex-col pt-4">
          <div className="relative mt-2 w-full">
          <input
            type="password"
            id="password"
            name='password'
            onChange={handleChange}
            
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0"
            placeholder=""
          />
          <label
            htmlFor="password"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-orange-600"
          >
            Enter Your Passsword
          </label>
        </div>
            <div>
       
      </div>
          </div>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {
            isLoading && <div className="text-center"><Spinner/></div>
          }

          <button
            onClick={signup}
            type='submit'
      
            className="my-2 mx-auto rounded-lg items-center bg-orange-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-orange-500 ring-offset-2 transition hover:bg-orange-700 focus:ring-2 md:w-32"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  </div>
  <FooterComponent/>
  </>
  )
}

export default Signup