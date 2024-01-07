import axios from 'axios';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("user")));
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        phonenum: '',
    })



    const login = async () => {
        try {
            setIsLoading(true);
            await axios.post('http://localhost:1000/api/auth/login', formData , {withCredentials: true} 
              )
            .then((res) => {
                window.localStorage.setItem('isLoggedIn', true);
                window.localStorage.setItem('user',JSON.stringify(res.data.user));
                setIsLoading(false);
                setLoggedIn(true);
                setError("");
            }).catch((err) => {
                setError(err.response.data.message);
                setIsLoading(false);
            }
            );

        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };

    const signup = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await axios.post('http://localhost:1000/api/auth/signup', formData , {withCredentials: true} 
              )
            .then((res) => {
                setIsLoading(false);
                window.location.href = '/login';
                setError("");

            }).catch((err) => {
                setError(err.response.data.message);
                setIsLoading(false);
            }
            );

        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
        }
    };




    const logout = async () => {
      await axios.get('http://localhost:1000/api/auth/logout',{withCredentials: true} );
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('user');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn,isLoading,error,formData,signup, login, logout, setFormData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
