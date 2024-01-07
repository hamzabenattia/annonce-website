import React, { useState } from 'react'
import Header from '../Components/Header'
import FooterComponent from '../Components/FooterComponent'
import axios from 'axios'
import { API_BASE_URL } from '../constant/constant'
import { Spinner } from 'flowbite-react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success , setScuccess] = useState("");
  const [error , setError] = useState("");
  const [loading , setLoading]= useState(false);



  const handelSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    await axios.post(`${API_BASE_URL}/auth/password/forgot`, { email })
    .then((res) => { 
      setError("");
      setScuccess(res.data.message);
      setLoading(false);
    }).catch((err) => {
      setError(err.response.data.message);
      setLoading(false);
    })
  }
  



  return (
    <>
    <Header/>
    <div className="mx-auto max-w-md max-h-min my-10">
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full bg-orange-500 p-2 text-orange-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="block text-2xl font-bold text-gray-800">
            Forgot password?
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Don't worry we'll send you reset instructions.
          </p>
        </div>
        <div className="mt-6">
          <form>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-gray-600"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                   
                    type="email"
                    id="email"
                    name="email"
                    className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500"
                    required=""
                    aria-describedby="email-error"
                  />
                  <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                    <svg
                      className="h-5 w-5 text-rose-500"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                  <p
                    className="mt-2 hidden text-xs text-rose-600 peer-invalid:block"
                    id="email-error"
                  >
                    Valid email address required for the account recovery process
                  </p>
                </div>
              </div>
              <button
                type="submit"
                onClick={handelSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-orange-400 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Reset password
              </button>
              <div className="text-center mt-2">
             {loading && <div className="text-center"><Spinner/></div>}
             {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-green-600">{success}</p>}
                </div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent/>
  </>
  )
}

export default ForgotPassword