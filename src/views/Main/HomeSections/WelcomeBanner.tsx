import React from "react";
import laxmiDevi from "@/assets/god.jpeg";


const WelcomeBanner = () => {
  return (
    <div className="flex justify-center ">

      <div className="w-full max-w-[420px] border-[3px] border-red-500 rounded-[15px] bg-[#f3c08c] p-1 flex items-center">

        {/* Image */}
        <img
          src={laxmiDevi?.src || laxmiDevi}
          alt="Laxmi Devi"
          className="w-[90px] h-[68px]  object-contain"
        />

        {/* Text */}
        <div className="leading-tight text-center flex-1">
          <p
            className="font-bold italic text-black text-md"
            style={{
              textShadow: '0 0 1px white, 0 0 1px white, 0 0 1px white',
            }}
          >
            !! Welcome to dpboss international <br />
            !! Satta Matka Fast Result
          </p>
        </div>

      </div>

    </div>
  );
};

export default WelcomeBanner;