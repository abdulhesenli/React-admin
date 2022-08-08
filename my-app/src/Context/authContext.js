import React, { createContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { date } from "yup";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const Navigate=useNavigate();

    const [admin, setAdmin] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        let token=localStorage.getItem('token');
        if(token){
            setAdmin(token);
            setIsLogin(true);
        }else{
            Navigate('/login');
          
        }

    }, [])

    const login = (data) => {

        setAdmin(data.idtoken);
        setIsLogin(true);
        localStorage.setItem("token", data.idToken);
        Navigate('/list');

    };

    const Logout =()=>{
        setIsLogin(false);
        localStorage.removeItem('token')
        Navigate('/login')
    }



 const values ={
     admin,isLogin,login,Logout
 };





    return (
        <div>
            <AuthContext.Provider value={values} >
                {children}

            </AuthContext.Provider>

        </div>
    )

}


export default AuthContextProvider;