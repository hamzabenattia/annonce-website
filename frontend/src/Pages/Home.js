import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import AdsPic from '../images/ads.jpeg'
import CategoryList from '../Components/Home/CategoryList'
import FooterComponent from '../Components/FooterComponent'
import { Banner } from 'flowbite-react'
import { CloseOutlined } from '@mui/icons-material'
import axios from 'axios'
import { API_BASE_URL } from '../constant/constant'
import CreateAnnonceModel from '../Components/Home/CreateAnnonceModel'
import { useSearchParams } from 'react-router-dom';
import Slick from '../Components/Home/Slick'



const Home = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("");
  const [Annonce, setAnnonce] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {

    searchParams.toString();

    const fetchAnnonce = async () => {

      try {
        setLoading(true)
        const { data } = await axios.get(API_BASE_URL + '/annonce/search?' + searchParams, { withCredentials: true });
        setAnnonce(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }

    }
    fetchAnnonce()
  }, [category, searchParams])




  return (
    <>
      <Header />
      <div className='border p-3 m-3'>
        <Slick setCategory={setCategory} searchParams={searchParams} />
      </div>

      <div className='flex justify-center items-center p-[20px]'>
        <Banner>
          <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400 ">
            <CloseOutlined className="h-4 w-4 items-end" />
            <img className='object-cover cursor-pointer rounded-[30px]' src={AdsPic} alt="" />
          </Banner.CollapseButton>
        </Banner>
      </div>

      <CategoryList category={category} data={Annonce} loading={isLoading} error={error} />
      <CreateAnnonceModel />
      <FooterComponent />

    </>

  )
}

export default Home