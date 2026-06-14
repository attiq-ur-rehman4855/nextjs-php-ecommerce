"use client";
import { useEffect, useState } from "react";

// Aapka AwardSpace Live Subdomain URL
const BASE_URL = "http://attiq-ecommerce-api.atwebpages.com";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Updated to AwardSpace Admin Area Endpoint
    fetch(`${BASE_URL}/admin_area/api/get_customers.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCustomers(data.customers || []);
        } else {
          alert(data.message || "Failed to load customers.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading Customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-indigo-600 text-left">
          Customers List
        </h1>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold text-gray-900 border-b">ID</th>
                <th className="p-3 font-semibold text-gray-900 border-b text-center">Image</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Name</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Email</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Phone</th>
                <th className="p-3 font-semibold text-gray-900 border-b">Registered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200">
              {customers.length > 0 ? (
                customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="p-3 text-gray-700 font-medium">{cust.id}</td>
                    <td className="p-3 text-center">
                      {cust.image ? (
                        <img
                          /* Updated to AwardSpace User Images Directory */
                          src={`${BASE_URL}/user_area/user_images/${cust.image}`}
                          alt={cust.name}
                          className="w-10 h-10 rounded-full mx-auto object-cover border border-gray-200"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/100x100?text=User";
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-gray-500 text-xs font-semibold">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-medium text-gray-900">{cust.name}</td>
                    <td className="p-3 text-gray-600">{cust.email}</td>
                    <td className="p-3 text-gray-600">{cust.phone || "N/A"}</td>
                    <td className="p-3 text-gray-600">
                      {cust.created_at ? new Date(cust.created_at).toLocaleDateString() : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500 italic">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}