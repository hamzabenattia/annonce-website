import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Dropdown } from 'flowbite-react';
import { useAuth } from '../Hooks/AuthContext';
import CreateAnnonceModel from './Home/CreateAnnonceModel';
import axios from 'axios';
import { API_BASE_URL } from '../constant/constant';


const Header = () => {

  const { logout, isLoggedIn } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchInput , setSearchInput] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(API_BASE_URL + '/user/', { withCredentials: true });
        setData(data);
      } catch (error) {
        setData(user);
      }
    }
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);


  const fullname = data?.firstname + " " + data?.lastname;


  return (
    <nav className='flex pb-0 md:pb-3 flex-1 flex-row md:flex-col flex-wrap justify-between items-center bg-white sticky top-0 z-50'>
      <div className='flex items-center'>
        <a href='/'>
          <img
            className="object-contain h-[30px] m-4"
            src="https://www.tayara.tn/media/tayara-logo.svg"
            alt=""
          />
        </a>
        <span className='font-normal text-[13px] text-[gray] '>Acheter et vendre gratuitement près de chez vous</span>
      </div>

      <div className='hidden md:flex mx-4 items-center border h-4 w-1/4 flex-1 p-4 rounded-[60px] border-solid border-[lightgray];'>
       <Link replace to={`/search?title=${searchInput}`}> <SearchIcon className='cursor-pointer' /></Link>
        <input onChange={(e) => setSearchInput(e.target.value)} className='outline-none border-none w-full' type="text" placeholder='Search...' />
      </div>
     <div className='flex flex-col md:flex-row items-center justify-center m-auto text-center gap-2'>
     <div className='flex gap-2'>   

        <Button onClick={() => isLoggedIn ? setOpenModal(true) : navigate("/login")} variant="contained" style={{ color: "#ffffff", backgroundColor: "#EE493A" }} startIcon={<AddCircleIcon />}>
          Publier une annonce
        </Button>
        {
          isLoggedIn ? <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img={data?.picture?.url} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{fullname}</span>
              <span className="block truncate text-sm font-medium">{data?.email}</span>
            </Dropdown.Header>
            {data?.isAdmin &&
              <Link to={"/dashboard"}> <Dropdown.Item>Dashboard</Dropdown.Item></Link>
            }
            <Link to={"/profile"}> <Dropdown.Item>Profile</Dropdown.Item> </Link>
            <Link to={"/profile/mes-annonces"}> <Dropdown.Item>Mes Annonce</Dropdown.Item> </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
            :
            <Link to='/login'>
              <Button variant="contained" style={{ color: "#ffffff", backgroundColor: "#EE493A" }} startIcon={<AccountCircleIcon />}>
                Ce connecter
              </Button>
            </Link>
        }
        <CreateAnnonceModel openModal={openModal} setOpenModal={setOpenModal} />

      </div>
      </div>

    </nav>
  )
}

export default Header