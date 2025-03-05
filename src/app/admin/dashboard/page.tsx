"use client";
import PropertiesTable from "@/components/PropertiesTable";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [fetching, setFetching] = useState(false);
  const handleFetchNewProperties = async () => {
    setFetching(true);
    const response = await fetch("/api/properties/fetch_new_properties");
    const data = await response.json();
    console.log(data, "data");
    setProperties(data.items);
    setFetching(false);
  };
  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 m-8 py-2 rounded-md ml-auto">logout</button>
      <div className=" text-center mb-6">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
        <h2 className="text-lg font-medium">Properties</h2>
        <p className="text-sm text-gray-500">View and manage all properties</p>
        <button
          className="bg-blue-500 text-white px-4 my-8 py-2 rounded-md"
          onClick={handleFetchNewProperties}
        >
         {fetching ? "Fetching..." : "Fetch New Properties"}
        </button>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <PropertiesTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
