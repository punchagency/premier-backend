const DropdownIcon = ({ active }: { active: boolean }) => {
    return (
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: active ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <path
          d="M1 1.5L8 8.5L15 1.5"
          stroke="#1C3A60"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  export default DropdownIcon;
  