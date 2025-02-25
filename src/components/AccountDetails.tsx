import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomPhoneInput from "./PhoneInput";
import { updateUserDetails } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const AccountDetailsDashboard = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  console.log(user, "user");
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const resultAction = await dispatch(updateUserDetails({
        name: formData.name,
        phone: formData.phone,
      }));
      console.log(resultAction, "resultAction");
      if (updateUserDetails.fulfilled.match(resultAction)) {
        setMessage({ text: 'Account details updated successfully', type: 'success' });
      } else {
        setMessage({ 
          text: resultAction.payload as string || 'Failed to update account details', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ text: 'Failed to update account details', type: 'error' });
      console.error('Error updating account details:', error);
    }
  };
  

  return (
    <div className="w-[47.396vw]">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="">
          <h2 className="text-[1.042vw] text-premier-blue font-semibold mb-2">
            Your Details
          </h2>
          
          {message.text && (
            <div className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}
          
          <div className="space-y-[0.521vw]">
            <div className="mt-10">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name *"
                className="w-full p-[1.042vw] my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
              />
            </div>
            <div className="">
              <input
                type="text"
                disabled
                value={user?.email}
                placeholder="Your Email *"
                className="w-full p-[1.042vw] my-2 border border-[#E8EBEF] h-[3.177vw] rounded-[0.833vw] focus:outline-none"
              />
            </div>
            <div className="">
              <CustomPhoneInput 
                value={formData.phone || ''} 
                onChange={(value) => setFormData({ ...formData, phone: value })} 
                placeholder="Your Number *" 
              />
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-[23.906vw] mt-[3.042vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AccountDetailsDashboard;