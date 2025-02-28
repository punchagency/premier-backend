const CardSkeleton = () => {
  return (
    <div className="mb-[3vw]">
      <div className="h-[13.333vw] w-[22vw] bg-gray-400 rounded-md"></div>
      <div className="flex flex-col">
        <div className="h-[1.7vw] w-[15vw] mt-[2vw] bg-gray-400 rounded-md mt-10"></div>
        <div className="h-[1.7vw] w-[10vw]  bg-gray-400 rounded-md mt-[2vw]"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
