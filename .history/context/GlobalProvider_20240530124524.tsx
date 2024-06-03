import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
interface UserContextValue {
  user: any;
  setUser: (user: any) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: any) => void;
}

interface User {
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}
const GlobalContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  isLoading: false,
  isLoggedIn: false,
  setIsLoading: () => {},
  setIsLoggedIn: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

 const GlobalProvider = ({ children }: UserProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider