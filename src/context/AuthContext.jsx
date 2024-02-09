import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      localStorage.setItem('token', res.headers.authorization)
      setUser(res.data);
      setIsAuthenticated(true);
       
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      localStorage.setItem('token', res.headers.authorization)
      setIsAuthenticated(true);
      setUser(res.data);
    } catch(error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  }

  const logOut = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
 
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
        
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
      
    }
    checkLogin();
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        signUp,
        signIn,
        logOut,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};