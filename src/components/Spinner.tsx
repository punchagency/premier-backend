const Spinner = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 pt-8">
        <div className="w-8 h-8 border-2 border-gray-300/25 rounded-full animate-spin border-t-white"></div>
      </div>
    );
  };
  
  export default Spinner;