import React from 'react'
import { createContext } from 'react';
import { getLoggededUserData } from '../services/UserServices';
import { useState, useEffect } from 'react';
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userData, setuserData] = useState("");
    const [isLoading, setisLoading] = useState(false);
    async function fetchUserData() {
        try{
            const response = await getLoggededUserData();
            setuserData(response);
            console.log("User data fetched:", response);
        } catch (err) {
            console.error("Error fetching user data:", err);
        } finally {
            setisLoading(false);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) return;
        setisLoading(true);
        fetchUserData();
    }, []);

  return (
    <UserContext.Provider value={{ userData, isLoading }}>
      {children} 
    </UserContext.Provider>
  )
}
