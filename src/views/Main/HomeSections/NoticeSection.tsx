import React from "react";
import { Phone, MessageCircle } from "lucide-react";

const NoticeSection = () => {
  const countryCode = "+91";
  const phoneNumber = "";
  const fullNumber = `${countryCode}${phoneNumber}`;

  return (
    <div className="w-full mt-2">

      <div className="w-full border-2 border-red-600 rounded-lg overflow-hidden">

        {/* Header */}
        <div className="bg-red-700 text-white text-center font-bold text-[16px] py-[2px]">
          ☆ NOTICE ☆
        </div>

        {/* Content */}
        <div className="text-center px-2 py-2">

          <p className="text-[16px] font-bold text-black leading-[1.3]">
            अपना बाजार <span className="font-extrabold">dpboss.monster</span> वेबसाइट में डलवाने
            के लिए आज ही हमें कॉल या WhatsApp करें
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-[4px]">

            <a
              href={`tel:${fullNumber}`}
              className="flex items-center gap-1 px-3 py-[4px] bg-green-600 text-white text-[12px] font-bold rounded-[6px]"
            >
              <Phone className="w-3 h-3" />
              कॉल करें
            </a>

            <a
              href={`https://wa.me/${countryCode.replace("+", "")}${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-[4px] bg-green-500 text-white text-[12px] font-bold rounded-[6px]"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp करें
            </a>

          </div>

          <p className="text-blue-700 font-bold text-[13px] mt-[4px]">
            Email : support@dpboss.monster
          </p>

          <p className="text-[13px] font-bold text-black mt-[2px]">
            शर्ते लागु
          </p>

        </div>
      </div>
    </div>
  );
};

export default NoticeSection;