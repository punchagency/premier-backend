"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAccountModal from "../Modals/DeleteAccountModal";

const DeleteAccount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [open, setOpen] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/account", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setLoading(false);
        setMessage({ text: 'Account deleted successfully', type: 'success' });
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: 'Failed to delete account', type: 'error' });
    }
  };

  const showDeleteModal = () => {
    setOpen(true);
  }

  return (
    <>
      {open && <DeleteAccountModal open={open} setOpen={setOpen} handleDelete={handleDeleteAccount} />}
      <div className="w-[47.396vw]">
        <h2 className="text-[1.042vw] font-semibold text-premier-blue mb-[0.833vw]">
          Delete Account
      </h2>
      {message.text && (
        <div className={`mt-4 p-4 rounded-md ${message.type === 'success' ? ' text-green-800' : ' text-red-800'}`}>
          {message.text}
        </div>
      )}
      <div>
        <textarea
          placeholder="Why are you deleting your account?"
          className="w-full p-[1.042vw]  my-2 border border-[#E8EBEF] h-[8.177vw] rounded-[0.833vw] focus:outline-none"
        />
      </div>

      <p className="text-[0.833vw] text-[#677B94]">
        <span className="text-premier-blue mr-2 font-semibold">*Note:</span>
        Deleting your account will remove all your data from our database. This
        cannot be undone.
      </p>

      <button
        onClick={showDeleteModal}
        className="w-[23.906vw] mt-[3.042vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
    </>
  );
};

export default DeleteAccount;
