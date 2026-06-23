import React from "react";
import dpboss from "@/assets/dpboss.png";

const HeaderLogo = () => {
  return (
    <div className="top-0 z-50">
      <div className="p-1 flex justify-center">

        <h1 className="border-[3px] border-red-500 rounded-[15px] px-6 py-3 bg-[#f3c08c] font-bold flex items-center justify-center gap-3 w-full max-w-[420px] m-0">

          {/* Logo */}
          <img
            src={typeof dpboss === 'object' ? dpboss.src : (dpboss as string)}
            alt="DP BOSS Fastest Satta Matka Result Logo"
            className="h-12 w-auto"
          />
          <span className="text-2xl">BOSS.MONSTER</span>


        </h1>

      </div>
    </div>
  );
};

export default HeaderLogo;