import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatDistance } from "date-fns";
import { Button, Carousel,Modal } from 'flowbite-react';
import { API_BASE_URL } from '../../constant/constant';
import useFetch from '../../Hooks/useFetch';
import { HiOutlineExclamationCircle } from "react-icons/hi";


const AnnonceModel = () => {
    const params = useParams();
    const navigate = useNavigate();
    function asyncList() {
        return axios.get(API_BASE_URL + '/admin/annonce/' + params.id, { withCredentials: true });
    }

    const { data, isLoading } = useFetch(asyncList);

    console.log(data)


    const [openRejectModel, setRejectModel] = useState(false);
    const [openAcceptModel, setAcceptModel] = useState(false);


    const handelAccept = () => {
   axios.get(API_BASE_URL + '/admin/annonce/accept/' + params.id, { withCredentials: true }).then((res) => {
          setAcceptModel(false)
            navigate(-1)
        });
    }

    
   const handelReject = () => {
        axios.get(API_BASE_URL + '/admin/annonce/refuse/' + params.id, { withCredentials: true }).then((res) => {
          setRejectModel(false)
            navigate(-1)
        });
    }

    console.log(data)

    return (
        <>

            {isLoading ?
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
                :
                <section className="py-10 font-poppins dark:bg-gray-800">
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="sticky top-0 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-96">
                                        <div className="object-contain w-full lg:h-full">
                                            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                                                <Carousel>
                                                    {
                                                        data.images.map((item, index) => (
                                                            <img key={index} src={item} alt="" />
                                                        ))
                                                    }

                                                </Carousel>
                                            </div>
                                        </div>




                                    </div>

                                    <div className='flex justify-center items-center gap-8'>
                                        <Button color="success" onClick={() => setAcceptModel(true)}>Accepter</Button>
                                        <Button color="failure" onClick={() => setRejectModel(true)}>Rejecter</Button>


                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6">
                                        <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                            {formatDistance(data.createdAt, new Date(), { addSuffix: true })}
                                        </span>
                                        <span className="px-2.5  py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                            <Link to={`/search?category=${data.category.categoryName}`}>   {data.category.categoryName}</Link>
                                        </span>

                                        <span className="px-2.5  py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                            <Link to={`/search?location=${data?.location}`}> {data.location} </Link>

                                        </span>
                                        <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {data.title}
                                        </h2>

                                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                            <span>{data.price} DT</span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                            Publisher info :
                                        </h2>
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                                            <div className="p-3 lg:p-5 ">
                                                <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                                                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                        <div className="w-full mb-4 md:w-2/5">
                                                            <div className="flex ">
                                                                <span className="mr-3 text-gray-500 dark:text-gray-400">


                                                                    <svg fill='currentColor' xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" className='bi bi-diagram-3 w-7 h-7'><path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm280-194q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm80-80h400v-10q-42-35-93-52.5T480-280q-56 0-107 17.5T280-210v10Zm200-320q-25 0-42.5-17.5T420-580q0-25 17.5-42.5T480-640q25 0 42.5 17.5T540-580q0 25-17.5 42.5T480-520Zm0 17Z" /></svg>

                                                                </span>
                                                                <div>
                                                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        Nom
                                                                    </p>
                                                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                        {data.createdBy.firstname} {" "} {data.createdBy.lastname}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                                            <div className="flex ">
                                                                <span className="mr-3 text-gray-500 dark:text-gray-400">


                                                                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" className="bi bi-clock-history w-7 h-7">
                                                                        <path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-200v120h400v-120H280Zm200 100q17 0 28.5-11.5T520-180q0-17-11.5-28.5T480-220q-17 0-28.5 11.5T440-180q0 17 11.5 28.5T480-140ZM280-320h400v-400H280v400Zm0-480h400v-40H280v40Zm0 560v120-120Zm0-560v-40 40Z" />
                                                                    </svg>


                                                                </span>
                                                                <div>
                                                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                        Phone
                                                                    </p>
                                                                    <h2 typeof='Phone' className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                        {data.createdBy.phonenum}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                        <span className="text-base text-gray-600 dark:text-gray-400">
                                            Description
                                        </span>
                                        <div className="m-2" dangerouslySetInnerHTML={{ __html: data?.description }} />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}

{/* reject model */}
                <Modal show={openRejectModel} size="md" onClose={() => setRejectModel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Etes-vous sûr de vouloir refuser cette Annonce ?            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handelReject}>
                {"Oui"}
              </Button>
              <Button color="gray" onClick={() => setRejectModel(false)}>
                Non, annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>


{/* Accept Model */}

<Modal show={openAcceptModel} size="md" onClose={() => setAcceptModel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Etes-vous sûr de vouloir Accepter cette Annonce ?            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handelAccept}>
                {"Oui"}
              </Button>
              <Button color="gray" onClick={() => setAcceptModel(false)}>
                Non, annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>



        </>

    )
}

export default AnnonceModel