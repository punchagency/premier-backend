import { updateUserPreferences } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";


const SubscriptionPreferences = () => {
  const [preferences, setPreferences] = useState({
    newsUpdates: false,
    emailNotifications: false,
    propertyAlerts: false,
  });
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [message, setMessage] = useState({ text: '', type: '' });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const resultAction = await dispatch(updateUserPreferences({
        preferences: preferences,
        email: user?.email || '',
      }));
      console.log(resultAction, "resultAction");
      if (updateUserPreferences.fulfilled.match(resultAction)) {
        setMessage({ text: 'Subscription preferences updated successfully', type: 'success' });
      } else {
        setMessage({ 
          text: resultAction.payload as string || 'Failed to update subscription preferences', 
          type: 'error' 
        });
      }
    } catch (error) {
      setMessage({ text: 'Failed to update subscription preferences', type: 'error' });
      console.error('Error updating subscription preferences:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setPreferences(user.preferences || {
        newsUpdates: false,
        emailNotifications: false,
        propertyAlerts: false,
      });
    }
  }, [user]);

  return (
    <div className="">
      <h2 className="text-[1.042vw] font-semibold text-premier-blue mb-[3.042vw]">
        Change your subscription preferences
      </h2>

      {message.text && (
        <div className={`mb-8 ${message.type === 'success' ? ' text-green-700' : 'text-red-700'}`}>
          {message.text}
        </div>
      )}

<div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleToggle("newsUpdates")}
          className={`relative inline-flex h-[0.938vw] w-[2.24vw] items-center rounded-full transition-colors duration-300 
      ${preferences.newsUpdates ? "bg-[#F2D5C5]" : "bg-[#B9C2CE]"}`}
        >
          <span
            className={`inline-block h-[1.042vw] w-[1.042vw] transform rounded-full bg-premier-blue transition-transform duration-300
        ${preferences.newsUpdates ? "translate-x-6 bg-premier-orange" : "translate-x-[0.01vw]"}`}
          />
        </button>
        <label className="text-[1.042vw] text-premier-blue ml-2">
          Subscribe to news and updates
        </label>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => handleToggle("emailNotifications")}
          className={`relative inline-flex h-[0.938vw] w-[2.24vw] items-center rounded-full transition-colors duration-300 
      ${preferences.emailNotifications ? "bg-[#F2D5C5]" : "bg-[#B9C2CE]"}`}
        >
          <span
            className={`inline-block h-[1.042vw] w-[1.042vw] transform rounded-full bg-premier-blue transition-transform duration-300
        ${preferences.emailNotifications ? "translate-x-6 bg-premier-orange" : "translate-x-[0.01vw]"}`}
          />
        </button>
        <label className="text-[1.042vw] text-premier-blue ml-2">
          Agree to receive email notifications
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleToggle("propertyAlerts")}
          className={`relative inline-flex h-[0.938vw] w-[2.24vw] items-center rounded-full transition-colors duration-300 
      ${preferences.propertyAlerts ? "bg-[#F2D5C5]" : "bg-[#B9C2CE]"}`}
        >
          <span
            className={`inline-block h-[1.042vw] w-[1.042vw] transform rounded-full bg-premier-blue transition-transform duration-300
        ${preferences.propertyAlerts ? "translate-x-6 bg-premier-orange" : "translate-x-[0.01vw]"}`}
          />
        </button>
        <label className="text-[1.042vw] text-premier-blue ml-2">
          Agree to receive property alerts
        </label>
      </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-[23.906vw] mt-[3.442vw] text-white bg-premier-blue p-[0.625vw] rounded-[0.833vw] hover:bg-premier-blue"
      >
        Submit
      </button>
    </div>
  );
};

export default SubscriptionPreferences;
