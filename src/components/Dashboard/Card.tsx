import React from "react";

  const Card = 
  ({ icon: Icon, label, h1, value, colorClass, colorIcon }) => (
    <div
      className={`card1 flex w-40 flex-col items-start rounded-lg py-8 ps-2 shadow-md ${colorClass}`}
    >
      <div
        className={`my-3 flex h-8 w-8 items-center justify-center rounded-full ${colorIcon}`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h3 className="font-bold text-red-500">{h1}</h3>
        <p className="font-sans -my-1 font-bold text-gray-500">{label}</p>
        <p className="font-sans text-sm font-bold">{value}</p>
      </div>
    </div>
  
);
export default React.memo(Card);