import React, { ReactNode, useEffect, useState } from 'react';
import SignIn from './SignIn';
//import { Navigate } from 'react-router-dom';
interface RequireAuthProps {
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}



const RequireAuth = ({ children, setJwt }: { children: ReactNode, setJwt: any }) =>{
  

  const [isAuthenticated, setIsAuthenticated] = useState<boolean >(false);
  
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('https://hdnn615p-3000.brs.devtunnels.ms/logincheck', {
          method: 'POST',
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_JWT}`,
          },
        });
        console.log("🚀 ~ validateToken ~ import.meta.env.VITE_REACT_APP_JWT:", import.meta.env.VITE_REACT_APP_JWT)
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    
    validateToken();
  }, []);
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
 
  return isAuthenticated ? <>{children}</> : <SignIn setIsAuthenticated={setIsAuthenticated} setJwt ={setJwt} />;
};

export default RequireAuth;
