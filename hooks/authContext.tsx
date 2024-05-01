import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

interface IAuthContext {
    token: string;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    isLoading: boolean

}
const AuthContext = createContext<IAuthContext>({
    token: '',
    login: async () => {},
    register: async () => {},
    isLoading: false
})



export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [token, setToken] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        AsyncStorage.getItem('token')
        .then(value => {
            if (value !== null) {
                
                setToken(value)
            }
        })
        .finally(() => {setIsLoading(false)})
    }, []);

    useEffect(() => {
        console.log("Token:", token);
    }, [token]);
    

    const handleLogin = async (email: string, password: string) => {
        console.log("email, password")
        try {
            const result = await login(email, password);
            console.log(result);
            setToken(result);
            await AsyncStorage.setItem('token', result);
 
        } catch (error) {
            console.log(error)
        }
    };
    const handleRegister = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            console.log(result);
            
        } catch (error) {
            console.log(error)
        }
    };

    const getToken = async() =>{
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            setToken(value)
        }
    }

    return (

        <AuthContext.Provider value={{
            token,
            login: handleLogin,
            register: handleRegister,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
