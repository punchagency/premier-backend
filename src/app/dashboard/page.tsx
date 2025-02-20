"use client";
import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import PropertyCard from "@/components/PropertyCard";
import { useRouter } from "next/navigation";
import SideBar from "@/components/Sidebar";
import ProfileDashboard from "@/components/ProfileDashboard";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<string>("saved");

  const router = useRouter();

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data);
      setProperties(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      // Change err to error and add type
      setError("Failed to load properties");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (slug: string) => {
    if (window.confirm("Are you sure you want to remove this property?")) {
      try {
        const response = await fetch("/api/properties/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }), // Send slug in the request body
        });
        if (response.ok) {
          setProperties((prev) =>
            prev.filter((p) => p.fieldData.slug !== slug)
          );
        } else {
          const data = await response.json();
          setError(data.message || "Failed to delete property");
        }
      } catch (error: unknown) {
        setError("Failed to delete property");
        console.error("Error:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        credentials: "include",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full h-full">
      <SideBar
        handleLogout={handleLogout}
        setTab={setTab}
        tab={tab}
      />
      {/* <div className="fixed top-0 left-0 right-0 bg-blue-800 text-white px-8 py-4 shadow-md z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Saved Properties</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleRedirect}
              className="hover:text-green-300 transition-colors duration-200"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="hover:text-orange-300 transition-colors duration-200"
            >
              Logout
            </button>
            <button
              onClick={handleRedirectToChangePassword}
              className="hover:text-blue-300 transition-colors duration-200"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccount}
              className="hover:text-red-300 transition-colors duration-200"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div> */}
     {tab === "saved" && <div className="grid w-full  p-16 pb-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onDelete={handleDelete}
          />
        ))}
      </div>}
     {tab === "profile" && <ProfileDashboard />}
    </div>
  );
}
