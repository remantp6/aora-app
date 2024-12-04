import { getCurrentUser } from "@/libs/appwrite";
import { createContext, useContext, useState, useEffect } from "react";

// Create a context
const GlobalContext = createContext<any>(null);

// Create a provider
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res: any) => {
        if (res) {
          setUser(res);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
