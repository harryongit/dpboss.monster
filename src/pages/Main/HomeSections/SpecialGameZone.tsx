import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* SPECIAL GAME ITEMS */
const specialGameItems = [
 
  "SpdpBoss Guessing Forum (New)",
  "All market free fix game",
  "Ratan Khatri Fix Panel Chart",
  "Matka Final Number Trick Chart",
  "EverGreen Trick Zone And Matka Tricks By SpdpBoss",
];

/* MATKA JODI ITEMS */
const matkaJodiItems = [

  "Matka Jodi Count Chart",
  "Dhanvarsha Daily Fix Open To Close",
  "Matka Jodi Family Chart",
  "Penal Count Chart",
  "Penal Total Chart",
  "All 220 Card List",
  
 
];

import { useNavigate } from "react-router-dom";

const SpecialGameZone = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* SPECIAL GAME ZONE CARD */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-2">
          <CardTitle className="text-center text-xl font-extrabold tracking-wide">
            🏆 SPECIAL GAME ZONE
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
              }}
              className={`w-full px-1 py-1 text-center text-lg font-bold animate-gradient-text
                ${index !== specialGameItems.length - 1 ? "border-b border-orange-400" : ""}
              `}
            >
              {item}
            </button>




          ))}
        </CardContent>
      </Card>

      {/* MATKA JODI CARD */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2">
          <CardTitle className="text-center text-xl font-extrabold tracking-wide">
            🎯 MATKA JODI LIST
          </CardTitle>
        </CardHeader>

               <CardContent className="p-0">
          {matkaJodiItems.map((item, index) => (
            <div
              key={index}
              className={`px-1 py-1 text-center text-lg font-bold text-gray-800  animate-gradient-text
                ${index !== matkaJodiItems.length - 1 ? "border-b border-blue-400" : ""}
              `}
            >
              {item}
            </div>
          ))}
        </CardContent>

      </Card>
    </div>
  );
};

export default SpecialGameZone;
