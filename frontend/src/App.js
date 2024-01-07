import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Notfound from "./Pages/Notfound";
import SingleAds from "./Pages/SingleAds";
import MesAnnonce from "./Pages/MesAnnonce";
import Protected from "./Protected";
import { useAuth } from "./Hooks/AuthContext";
import Sidebar from "./Components/Sidebar";
import Settings from "./Pages/Settings";
import Filter from "./Pages/Filter";
import ConfirmeEmail from "./Pages/ConfirmeEmail";
import AdminSideBar from "./Components/AdminSideBar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ListUsers from "./Pages/Dashboard/ListUsers";
import ListAnnonces from "./Pages/Dashboard/ListAnnonces";
import AnnonceModel from "./Pages/Dashboard/AnnonceModel";




function App() {
  const {isLoggedIn} = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <Notfound/>,
    },
     {
      path: "login",
      element: <Login/>,
    },
    {
      path: "signup",
      element: <Signup/>,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword/>,
    },
    {
      path: "reset-password/:token",
      element: <ResetPassword/>,
    },{
      path: "annonce/:id",
      element: <SingleAds/>,
    },
    {
      path: 'search',
      element: <Filter/>

    },
    {
      path: "confirme/:token",
      element: <ConfirmeEmail/>
    },
    {
      element:<Protected isSignedIn={isLoggedIn}>
     <Sidebar/>
    </Protected>,
    children: [
      {
        path: "/profile",
        element: <Settings/>,
      },
      {
        path: "/profile/mes-annonces",
        element: <MesAnnonce/>,
      },
    ],
    },
    {
      path: "*",
      element: <Notfound/>,
    },

    {
      element:<Protected isSignedIn={isLoggedIn}>
        <AdminSideBar/>
        </Protected>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/dashboard/users",
        element: <ListUsers/>,
      } ,
      {
        path: "/dashboard/annonces",
        element: <ListAnnonces/>,
      },
      {
        path: "/dashboard/annonces/:id",
        element: <AnnonceModel/>,
      }

     
    ],
    },
    
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
