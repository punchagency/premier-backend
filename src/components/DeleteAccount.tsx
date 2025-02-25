"use client"
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
    const router = useRouter();

    const handleDeleteAccount = async () => {
        try {
          const response = await fetch("/api/auth/account", {
            method: "DELETE",
            credentials: "include",
          });
          const data = await response.json();
          if (data.success) {
            router.push("/login");
          }
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };

  return (
    <div className="w-[47.396vw]">
      <h2 className="text-[1.042vw] font-semibold text-premier-blue mb-4">
        Delete Account
      </h2>

      <div>
     <textarea placeholder="Why are you deleting your account?" className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[8.177vw] rounded-[0.833vw] focus:outline-none" />
      </div>

      <p className="text-[0.833vw] text-[#677B94]">
        <span className="text-premier-blue mr-2 font-semibold">
            *Note: 
        </span>
        Deleting your account will remove all your data from our
        database. This cannot be undone.
      </p>  

      <button
        onClick={handleDeleteAccount}
        className="w-[23.906vw] mt-[3.042vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
