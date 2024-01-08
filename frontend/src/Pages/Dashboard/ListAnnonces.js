import React, { useState } from 'react'
import useFetch from '../../Hooks/useFetch';
import { API_BASE_URL } from '../../constant/constant';
import axios from 'axios';
import { Pagination, Spinner } from 'flowbite-react';
import AnnonceTable from '../../Components/Dashboard/AnnonceTable';

const ListAnnonces = () => {

  function asyncList() {
    return axios.get(API_BASE_URL+'/admin/annonce',{withCredentials: true} );
  }

  const { data, isLoading } = useFetch(asyncList);

  function CategotyFetch() {
    return axios.get(API_BASE_URL+'/category/',{withCredentials: true} );
  }

  const { data:category } = useFetch(CategotyFetch);


  // Delete Annonce

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this annonce?"))
    {
    axios.delete(API_BASE_URL+'/admin/annonce/'+id,{withCredentials: true} ).then((res)=>{
      window.location.reload();
    });
  }
  }


  //Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [annoncePerPage, setannoncePerPage] = useState(10);
  const totalPages = Math.ceil(data?.length / annoncePerPage);



  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return  value.title.toLowerCase().includes(searchWord.toLowerCase()) ||
              value.status.toLowerCase().includes(searchWord.toLowerCase()) ||
              value.category.categoryName.toLowerCase().includes(searchWord.toLowerCase())
  
            });
  
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };







  return (
    <div className='flex flex-col md:m-20 gap-4'>
      <h1 className='text-xl font-bold'>List des Annonces : </h1>

      {
        isLoading ? <div className='text-center'>
          <Spinner/>
          </div> :
<>
<header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
              onChange={handleFilter}
                type="text"
                placeholder="Recherche..."
                className="form-control p-2 border border-orange-200"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={(e) => setannoncePerPage(e.target.value)} className="form-select">
                <option value={10}>Afficher 10</option>
                <option value={20}>Afficher 20</option>
                <option value={30}>Afficher 30</option>
                <option value={data?.length}>Afficher tout</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={handleFilter} className="form-select">
                <option value={""}>Status</option>
                <option value={"Pending"}>En Attent</option>
                <option value={"Refused"}>Refusée</option>
                <option value={"Accepted"}>Acceptée</option>
              </select>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={handleFilter} className="form-select">
                <option value={""}>Category</option>
                {
                  category?.map((cat)=>(
                    <option key={cat._id} value={cat.categoryName}>{cat.categoryName}</option>
                  ))
                }
              </select>
            </div>
            
          </div>
        </header>
        <table className="min-w-full divide-y divide-gray-200 ">
  <thead className="bg-gray-50">
    <tr>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Titre
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Date de publication

      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Status
      </th>
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Annonceur
      </th>
      
      <th
        scope="col"
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">

    {wordEntered ==="" ? (<> 
      {
        data?.slice(
             (currentPage - 1) * annoncePerPage,
             currentPage * annoncePerPage
            ).map((annonce)=>(
              <AnnonceTable key={annonce._id} annonce={annonce} handleDelete={handleDelete}/>
            ))
      }
    </>): (<> 
      {
        filteredData?.slice(
             (currentPage - 1) * annoncePerPage,
             currentPage * annoncePerPage
            ).map((annonce)=>(
              <AnnonceTable key={annonce._id} annonce={annonce} handleDelete={handleDelete}/>
            ))
      }
    </>)}

   
  </tbody>
</table>
<Pagination layout="navigation" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} showIcons />



</>

      



}


    </div>
  )
}

export default ListAnnonces