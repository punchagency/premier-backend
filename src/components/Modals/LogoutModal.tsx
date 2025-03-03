const LogoutModal = ({
    open,
    setOpen,
    handleLogout,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleLogout: () => void;
  }) => {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center ${
          open ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <div className="bg-white p-[1.042vw]  rounded-md">
          <h1 className="text-[1.042vw] text-premier-blue font-semibold mb-[0.833vw]">Logout</h1>
          <p className="text-[0.833vw] text-[#677B94] mb-[1.833vw]">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-end">
          <button
            className="text-premier-blue p-[0.625vw] rounded-[0.833vw]"
            onClick={() => {
              setOpen(false);
          }}
          >
            No
          </button>
          <button
            className="text-premier-blue p-[0.625vw] rounded-[0.833vw]"
            onClick={() => {
                setOpen(false);
                handleLogout();
            }}
          >
            Yes
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoutModal;
