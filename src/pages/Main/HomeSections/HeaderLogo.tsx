import React from "react";
import logo from "@/assets/logo.png";

const HeaderLogo = () => {
  return (
    <div className=" top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-4 border-rose-500">
      <div className="p-3 text-center">

        <div className="flex items-center justify-center gap-3 mb-1">
          <img 
            src={logo} 
            alt="SMBOSS Logo" 
            className="h-10 w-auto drop-shadow"
          />

          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600">
            SMBOSS.NET
          </h1>
        </div>

        <p className="text-xs text-rose-600 font-bold tracking-wide">
          India's #1 Matka Result Website
        </p>
      </div>
    </div>
  );
};

export default HeaderLogo;
