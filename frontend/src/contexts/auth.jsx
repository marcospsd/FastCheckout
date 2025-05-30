import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {api } from "../services/api";




export const AuthContext = createContext();


export const AuthProvicer = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [printRede, setPrintRede] = useState(true)

    useEffect(() => {
        setUser(null)
        const recoveredUser = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const rede = localStorage.getItem('printrede') ? JSON.parse(localStorage.getItem('printrede')) : true
        if(recoveredUser && token) {
            if (rede) { setPrintRede(rede)}
            api.defaults.headers.Authorization = `token ${token}`
            api.get(`/auth/user/${recoveredUser}/`)
            .then((res) => {
                setUser(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                api.defaults.headers.Authorization = null;
            })
        } else {
            setLoading(false)
        }

        
    }, []);


    const login = async (auth) => {
        await api.post('/auth/', auth)
        .then((res) => {
            const token = res.data.token
            const id = res.data.id
            localStorage.setItem("token", token);
            localStorage.setItem("id", JSON.stringify(id));
            localStorage.setItem("printrede", true);
            api.defaults.headers.Authorization = `token ${token}`
            setUser(res.data)
            setLoading(false)
            switch (res.data.tipouser) {
                case "C":
                    navigate("/")
                    break
                case "V":
                    navigate("/")
                    break
                case "E":
                    navigate("/estoque")
                    break
                case "A":
                    navigate("/")
                    break
            }

    

        })
        .catch((err) => {
            console.log(err)
            setError(err.response.data)

        })
        return error
    };
    
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        localStorage.removeItem("printrede")
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, printRede, setPrintRede }}>{children}</AuthContext.Provider>
    )
}