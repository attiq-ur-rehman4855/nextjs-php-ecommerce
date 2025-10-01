"use client";
import { useEffect, useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shop-sphere.infinityfreeapp.com/api/admin/get_customers.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCustomers(data.customers);
        } else {
          alert(data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Registered On</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((cust) => (
                <tr key={cust.id}>
                  <td className="p-2 border text-center">{cust.id}</td>
                  <td className="p-2 border text-center">
                    {cust.image ? (
                      <img
                        src={`https://shop-sphere.infinityfreeapp.com/api/user/user_images/${cust.image}`}
                        alt={cust.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="p-2 border">{cust.name}</td>
                  <td className="p-2 border">{cust.email}</td>
                  <td className="p-2 border">{cust.phone}</td>
                  <td className="p-2 border">
                    {new Date(cust.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
