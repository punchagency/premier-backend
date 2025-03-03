"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

export default function Error() {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(decodeURIComponent(error));
      setIsVisible(true);
    }
  }, [searchParams]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <span className="mr-2">{errorMessage}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="text-red-700 hover:text-red-900"
      >
        <AiOutlineClose size={18} />
      </button>
    </div>
  );
}