import React, { useEffect } from 'react'
import FooterComponent from '../Components/FooterComponent'
import Header from '../Components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/AuthContext'

const Login = () => {
  const { isLoggedIn,isLoading,error,formData, login, setFormData  } = useAuth();
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
  <div className="p-10">
    <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-md mx-auto">
      <div className="mx-auto mb-2 space-y-3">
        <h1 className="text-3xl font-bold text-gray-700">Log into <span className='text-orange-500'>Tayara</span></h1>
        <p className="text-gray-500">Login to access your account</p>
      </div>
      <div>
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
      </div>
      <div>
        <div className="relative mt-2 w-full">
          <input
          name='password'
            type="password"
            id="password"
            onChange={handleChange}
            className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-orange-600"
          >
            Enter Your Password
          </label>
        </div>
      </div>
      <Link to="/forgot-password" className="text-end text-sm text-gray-700">
      <p>Forgot Password ? </p>
      </Link>
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <button type='submit' disabled={isLoading} onClick={login} className="rounded-lg bg-orange-500 py-2 font-bold text-white hover:bg-orange-600">
       {isLoading ? <> Logingin...</> : <>Login</>}
      </button>
      <p className='text-center'>
        Don't have an account ? <Link to="/signup" className="text-orange-500">Sign Up</Link>
      </p>
    </div>
  </div>
  

<FooterComponent/>

</>
  )
}

export default Login