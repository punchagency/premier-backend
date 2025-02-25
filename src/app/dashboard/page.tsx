"use client";
import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { useRouter } from "next/navigation";
import SideBar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<string>("dashboard");

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
      <SideBar handleLogout={handleLogout} setTab={setTab} tab={tab} />
  
   <DashboardContent tab={tab} properties={properties} handleDelete={handleDelete} />
    </div>
  );
}
