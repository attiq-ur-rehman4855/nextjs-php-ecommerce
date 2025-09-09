"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("admin_name");
    const storedAdminId = sessionStorage.getItem("admin_id");

    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (err) {
        setAdmin(storedAdmin);
      }
    }

    if (storedAdminId) {
      setAdminId(storedAdminId);
    }
  }, []);

  const login = (name, id) => {
    sessionStorage.setItem("admin_name", JSON.stringify(name));
    sessionStorage.setItem("admin_id", id);
    setAdmin(name);
    setAdminId(id);
  };

  const logout = () => {
    sessionStorage.removeItem("admin_name");
    sessionStorage.removeItem("admin_id");
    setAdmin(null);
    setAdminId(null);
  };

  const updateAdmin = (name) => {
    sessionStorage.setItem("admin_name", JSON.stringify(name));
    setAdmin(name);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, adminId, login, logout, updateAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
