"use client";
import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { useRouter } from "next/navigation";
import SideBar from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";
import CardSkeleton from "@/components/CardSkeleton";
import { signOut, useSession } from "next-auth/react";
import BlueLogo from "../../../public/images/blueLogo";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthenticated, setUser } from "@/redux/features/userSlice";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<string>("dashboard");

  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session.user));
      dispatch(setAuthenticated(true));
    }
  }, [session, status, dispatch]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data);
      setProperties(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
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
          body: JSON.stringify({ slug }),
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
      await signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading)
    return (
      <div>
        <div className="animate-pulse flex">
          <div className="h-screen w-[18.177vw] bg-gray-400 rounded-md"></div>
          <div className="flex flex-col">
            <div className="h-[1.7vw] w-[15vw] m-[3vw] mt-[3.5vw] mb-0 bg-gray-400 rounded-md mt-10"></div>
            <div className="h-[1.7vw] w-[10vw] ml-[3vw] bg-gray-400 rounded-md mt-10"></div>
            <div className="grid m-[3vw] w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen w-40">
        <BlueLogo />
        <div className="text-premier-blue text-[1vw] my-[1.5vw] font-light">
          Error: {error}{" "}
        </div>
      </div>
    );

  return (
    <div className="flex w-full h-full">
      <SideBar handleLogout={handleLogout} setTab={setTab} tab={tab} />

      <DashboardContent
        tab={tab}
        properties={properties}
        handleDelete={handleDelete}
      />
    </div>
  );
}
