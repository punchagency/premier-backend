import { useState, useEffect } from "react";

const NotifyToast = ({ message, type }: { message: string; type: string }) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 2, 0));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 w-80 rounded-md shadow-lg transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`p-4 rounded-md ${
          type === "success"
            ? "bg-white border border-green-800 text-green-800"
            : "bg-white border border-red-600 text-red-600"
        }`}
      >
        {message}
        <div className="h-1 mt-2 bg-white/50 rounded-full">
          <div
            className="h-full bg-red-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NotifyToast;
