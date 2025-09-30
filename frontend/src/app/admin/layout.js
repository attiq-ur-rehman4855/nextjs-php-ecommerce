"use client";
import "../globals.css";
import AdminSidebar from "@/components/adminSidebar";
import { AdminAuthProvider } from "./context/AdminAuthContext";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col md:flex-row w-full relative">
        <AdminAuthProvider>
          {/* Sidebar (toggle logic ab sirf AdminSidebar ke andar hai) */}
          <div className="min-h-full">  
            <AdminSidebar />  
          </div>

          {/* Content */}
          <div className="flex-1 bg-gray-100 p-6 mt-12 md:mt-0">{children}</div>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
