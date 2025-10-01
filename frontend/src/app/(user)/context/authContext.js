"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [cartCount, setCartCount] = useState(0);
  const [isAuthChecking, setIsAuthChecking] = useState(true); 

  useEffect(() => {
    const status = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);

    const id = sessionStorage.getItem("user_id");
    setUserId(id);
    setUserName(sessionStorage.getItem("user_fullname") || "");
    setUserEmail(sessionStorage.getItem("user_email") || "");
    setUserPhone(sessionStorage.getItem("user_phone") || "");

    if (status && id) {
      fetchCartCount(id);
    }
     setIsAuthChecking(false);
  }, []);

  const fetchCartCount = async (uid) => {
    try {
      const res = await fetch(
        `https://shop-sphere.infinityfreeapp.com/api/user/get_cart_count.php?user_id=${uid}`
      );
      const data = await res.json();
      setCartCount(data.count || 0);
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  const login = async (userId, name, email, phone) => {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("user_id", userId);
    sessionStorage.setItem("user_fullname", name);
    sessionStorage.setItem("user_email", email);
    sessionStorage.setItem("user_phone", phone);

    setIsLoggedIn(true);
    setUserId(userId);
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
    // Fetch cart count immediately after login
    await fetchCartCount(userId);
  };

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_fullname");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_phone");

    setIsLoggedIn(false);
    setUserId(null);
    setCartCount(0);
    setUserName("");
    setUserEmail("");
    setUserPhone("");
  };


  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        userName,
        userEmail,
        userPhone,
        login,
        logout,
        cartCount,
        fetchCartCount,
        isAuthChecking
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
