import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import FooterComponent from '../Components/FooterComponent'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../constant/constant';
import { Pagination, Select, Spinner } from 'flowbite-react'
import Card from '../Components/Home/Card';
import CardSkeleton from '../Components/CardSkeleton';
import useFetch from '../Hooks/useFetch';
import { Search } from '@mui/icons-material';


function Filter() {
  const [searchParams] = useSearchParams();
  const [searchKeywords, setSearchKeywords] = useState(searchParams.get('title') || "")
  const [Annonce, setAnnonce] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || "");
  const [locationFilter, setLocationFilter] = useState("");


  const { data: category } = useFetch(asyncList);
  function asyncList() {
    return axios.get(API_BASE_URL + '/category', { withCredentials: true });
  }


  const handelSearch = (e) => {
    setSearchKeywords(e.target.value)
    searchParams.set('title', e.target.value);
    searchParams.toString();
    window.history.replaceState(null, null, '?' + searchParams);
  };


  const handelCategoryChange = (e) => {
    setCategoryFilter(e.target.value)
    searchParams.set('category', e.target.value);
    searchParams.toString();
    window.history.replaceState(null, null, '?' + searchParams);
  };


  const handelLoationChange = (e) => {
    setLocationFilter(e.target.value)
    searchParams.set('location', e.target.value);
    searchParams.toString();
    window.history.replaceState(null, null, '?' + searchParams);
  };


  useEffect(() => {


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
  }, [searchKeywords, categoryFilter, locationFilter])



  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [adsPerPage, setAdsPerPage] = useState(10);
  const totalPages = Math.ceil(Annonce?.length / adsPerPage);



  return (
    <>
      <Header />
      <div className="mb-8 w-full">
        <div className="rounded-lg border border-light bg-tg-bg px-4 py-4 shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card sm:px-6 md:px-8 md:py-5">
          <ul className="flex items-center">
            <li className="flex items-center">
              <a
                href="/"
                className="flex items-center text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
              >
                <span className="pr-2">
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 15 15"
                    className="fill-current"
                  >
                    <path d="M13.3503 14.6503H10.2162C9.51976 14.6503 8.93937 14.0697 8.93937 13.3729V10.8182C8.93937 10.5627 8.73043 10.3537 8.47505 10.3537H6.54816C6.29279 10.3537 6.08385 10.5627 6.08385 10.8182V13.3497C6.08385 14.0464 5.50346 14.627 4.80699 14.627H1.62646C0.929989 14.627 0.349599 14.0464 0.349599 13.3497V5.24431C0.349599 4.89594 0.535324 4.5708 0.837127 4.385L6.96604 0.506501C7.29106 0.297479 7.73216 0.297479 8.05717 0.506501L14.1861 4.385C14.4879 4.5708 14.6504 4.89594 14.6504 5.24431V13.3265C14.6504 14.0697 14.07 14.6503 13.3503 14.6503ZM6.52495 9.54086H8.45184C9.14831 9.54086 9.7287 10.1215 9.7287 10.8182V13.3497C9.7287 13.6052 9.93764 13.8142 10.193 13.8142H13.3503C13.6057 13.8142 13.8146 13.6052 13.8146 13.3497V5.26754C13.8146 5.19786 13.7682 5.12819 13.7218 5.08174L7.61608 1.20324C7.54643 1.15679 7.45357 1.15679 7.40714 1.20324L1.27822 5.08174C1.20858 5.12819 1.18536 5.19786 1.18536 5.26754V13.3729C1.18536 13.6284 1.3943 13.8374 1.64967 13.8374H4.80699C5.06236 13.8374 5.2713 13.6284 5.2713 13.3729V10.8182C5.24809 10.1215 5.82848 9.54086 6.52495 9.54086Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.51145 1.55106L13.465 5.33294V13.3497C13.465 13.412 13.4126 13.4644 13.3503 13.4644H10.193C10.1307 13.4644 10.0783 13.412 10.0783 13.3497V10.8182C10.0783 9.92832 9.34138 9.19112 8.45184 9.19112H6.52495C5.63986 9.19112 4.89529 9.92522 4.9217 10.8237V13.3729C4.9217 13.4352 4.86929 13.4877 4.80699 13.4877H1.64967C1.58738 13.4877 1.53496 13.4352 1.53496 13.3729V5.33311L7.51145 1.55106ZM1.27822 5.08174L7.40714 1.20324C7.45357 1.15679 7.54643 1.15679 7.61608 1.20324L13.7218 5.08174C13.7682 5.12819 13.8146 5.19786 13.8146 5.26754V13.3497C13.8146 13.6052 13.6057 13.8142 13.3503 13.8142H10.193C9.93764 13.8142 9.7287 13.6052 9.7287 13.3497V10.8182C9.7287 10.1215 9.14831 9.54086 8.45184 9.54086H6.52495C5.82848 9.54086 5.24809 10.1215 5.2713 10.8182V13.3729C5.2713 13.6284 5.06236 13.8374 4.80699 13.8374H1.64967C1.3943 13.8374 1.18536 13.6284 1.18536 13.3729V5.26754C1.18536 5.19786 1.20858 5.12819 1.27822 5.08174ZM13.3503 15H10.2162C9.32668 15 8.58977 14.2628 8.58977 13.3729V10.8182C8.58977 10.7559 8.53735 10.7035 8.47505 10.7035H6.54816C6.48587 10.7035 6.43345 10.7559 6.43345 10.8182V13.3497C6.43345 14.2396 5.69654 14.9768 4.80699 14.9768H1.62646C0.736911 14.9768 0 14.2396 0 13.3497V5.24431C0 4.77131 0.251303 4.33591 0.651944 4.08836L6.77814 0.211575C7.21781 -0.0705255 7.80541 -0.0705251 8.24508 0.211576C8.24546 0.211821 8.24584 0.212066 8.24622 0.212311L14.3713 4.08838C14.7853 4.34424 15 4.78759 15 5.24431V13.3265C15 14.2587 14.2671 15 13.3503 15ZM14.1861 4.385L8.05717 0.506501C7.73216 0.297479 7.29106 0.297479 6.96604 0.506501L0.837127 4.385C0.535324 4.5708 0.349599 4.89594 0.349599 5.24431V13.3497C0.349599 14.0464 0.929989 14.627 1.62646 14.627H4.80699C5.50346 14.627 6.08385 14.0464 6.08385 13.3497V10.8182C6.08385 10.5627 6.29279 10.3537 6.54816 10.3537H8.47505C8.73043 10.3537 8.93937 10.5627 8.93937 10.8182V13.3729C8.93937 14.0697 9.51976 14.6503 10.2162 14.6503H13.3503C14.07 14.6503 14.6504 14.0697 14.6504 13.3265V5.24431C14.6504 4.89594 14.4879 4.5708 14.1861 4.385Z"
                    />
                  </svg>
                </span>
                Home
              </a>
              <span className="px-3 text-body-color dark:text-dark-6"> / </span>
            </li>
            <li className="flex items-center">
              <a
                href="/search"
                className="text-base font-medium text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"
              >
                Search
              </a>
              <span className="px-3 text-body-color dark:text-dark-6"> / </span>
            </li>
            <li className="text-base font-medium text-body-color dark:text-dark-6">
              {categoryFilter || "All Category"}
            </li>
          </ul>
        </div>
      </div>

      <section className="py-10 flex flex-col justify-center items-center">


<div className="flex w-1/2 justify-center flex-col md:flex-row items-center">
 
<Select className='flex-shrink-0 z-10 inline-flex items-center ' onChange={handelCategoryChange} id="category" name='category' required>
              <option value={''}>Select your Category</option>
              {category?.map((item) => (
                <option key={item._id} value={item.categoryName}>{item.categoryName}</option>
              ))}
            </Select>

<Select className='flex-shrink-0 z-10 inline-flex items-center ' onChange={handelLoationChange} id="location" name='location' required>
              <option value={''}>Select your Location</option>
              <option value="Tunis">Tunis</option>
              <option value="Sfax">Sfax</option>
              <option value="Sousse">Sousse</option>
              <option value="Kairouan">Kairouan</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Gabes">Gabes</option>
              <option value="Ariana">Ariana</option>
              <option value="Mannouba">La Mannouba</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Zaghouan">Zaghouan</option>
              <option value="Beja">Béja</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Kebili">Kebili</option>
              <option value="Siliana">Siliana</option>
              <option value="Gafsa">Gafsa</option>
              <option value="Tozeur">Tozeur</option>
              <option value="Kasserine">Kasserine</option>
              <option value="Kef">Le Kef</option>
              <option value="Mahdia">Mahdia</option>
              <option value="Medenine">Medenine</option>
              <option value="Monastir">Monastir</option>
              <option value="Tataouine">Tataouine</option>

            </Select>



  <div className="relative w-full">
    <input
      type="search"
      defaultValue={searchKeywords} onChange={handelSearch}
      id="search-dropdown"
      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border-s-gray-50 border-s-2 border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-s-gray-700"
      placeholder="Search Lenovo, Infinix HOT 30, MERCEDES..."
      required=""
      name='title'
    />
    <button
      type="submit"
      disabled
      className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-600 rounded-e-lg border border-orange-300 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
    >
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <span className="sr-only">Search</span>
    </button>
  </div>
</div>


        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-3 p-6 md:grid-cols-2 lg:grid-cols-4">
          {
            isLoading ? <div className='flex justify-center flex-wrap gap-3'><CardSkeleton /> </div>
              : error ? <div className='text-center text-red-500 '>{error}</div> :
                Annonce?.length < 1 ? <div className='flex text-center font-bold text-slate-900'>Aucune annonce trouvée</div> :
                  Annonce?.slice(
                    (currentPage - 1) * adsPerPage,
                    currentPage * adsPerPage
                  ).map((item, index) => <Card key={index} data={item} />)
          }
        </div>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />
        </div>
      </section>



      <FooterComponent />
    </>
  )
}

export default Filter