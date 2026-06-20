import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* SPECIAL GAME ITEMS */
const specialGameItems = [

  "All market free fix game",
  "Ratan Khatri Fix Panel Chart",
  "Matka Final Number Trick Chart",

];


import { useNavigate } from "@/lib/router-compat";

const SpecialGameZone = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* SPECIAL GAME ZONE CARD */}
      <Card className="bg-peach border-2 border-blue-900 shadow-lg rounded-lg">
        <CardHeader className="bg-red-600 text-white py-2">
          <CardTitle className="text-center text-xl font-extrabold tracking-wide">
            DPBOSS SPECIAL GAME ZONE
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {specialGameItems.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => {
                if (item.toLowerCase() === "all market free fix game") {
                  navigate("/matka-free-open");
                }
                if (item.toLowerCase() === "ratan khatri fix panel chart") {
                  navigate("/khatris-favourite-panna-chart");
                }
                if (item.toLowerCase() === "matka final number trick chart") {
                  navigate("/matka-final-number-chart");
                }
              }}
              className={`w-full px-1 py-2 text-center text-lg font-bold text-pink-700
                ${index !== specialGameItems.length - 1 ? "border-b border-red-400" : ""}
              `}
            >
              {item}
            </button>

          ))}
        </CardContent>
      </Card>


    </div>
  );
};

export default SpecialGameZone;