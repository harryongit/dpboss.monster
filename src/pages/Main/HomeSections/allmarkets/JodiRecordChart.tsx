import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data = [
  ["69","14","11","21","73","23","12"],
  ["87","60","76","65","94","09","28"],
  ["87","44","11","69","60","11","21"],
  ["56","69","96","90","92","20","18"],
  ["10","88","05","83","32","80","37"],
  ["09","99","23","78","70","10","00"],
  ["13","16","68","81","43","77","73"],
  ["31","62","86","98","90","16","61"],
  ["52","09","65","22","20","20","29"],
  ["84","73","08","33","33","21","56"],
  ["83","14","26","88","02","33","72"],
  ["98","14","45","19","53","22","39"],
  ["60","27","85","71","83","97","30"],
   ["69","14","11","21","73","23","12"],
  ["87","60","76","65","94","09","28"],
  ["87","44","11","69","60","11","21"],
  ["56","69","96","90","92","20","18"],
  ["10","88","05","83","32","80","37"],
  ["09","99","23","78","70","10","00"],
  ["13","16","68","81","43","77","73"],
  ["31","62","86","98","90","16","61"],
  ["52","09","65","22","20","20","29"],
  ["84","73","08","33","33","21","56"],
  ["83","14","26","88","02","33","72"],
  ["98","14","45","19","53","22","39"],
  ["60","27","85","71","83","97","30"],
];

/* 🎯 Winning highlight logic */
const getNumberStyle = (num: string) => {
  const n = parseInt(num, 10);



if (n >= 90) {
return "bg-red-500/20 text-red-700  ";


}



  return "text-black";
};

const JodiRecordChart = () => {
  const { marketName } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-violet-50">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
   
   <div className=" flex flex-col items-center justify-center bg-gray-50 px-4">
  {/* Market Name */}
  <div className="text-2xl font-extrabold tracking-wide drop-shadow-lg text-black text-center">
    {decodeURIComponent(marketName || "RAKHI MORNING")}
  </div>

  {/* Result */}
  <div className="text-xl font-bold uppercase tracking-wider text-black mb-2 text-center">
    669-14-789
  </div>

  {/* Refresh Result Button */}
  <Button
    size="sm"
    // onClick={handleRefresh}
    className="flex items-center justify-center bg-white text-orange-600 border border-orange-600 font-bold rounded shadow-md px-4 py-2 hover:bg-white/80 transition-all duration-300"
  >
    <RefreshCw className="h-4 w-4 mr-1" />
    Refresh Result
  </Button>
</div>


          <Card className="border-2 border-orange-500 shadow-xl">
            {/* HEADER */}
            <CardHeader className="bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 py-2">
              <CardTitle className="text-center text-white font-black tracking-wide text-lg">
                🌅 {decodeURIComponent(marketName || "RAKHI MORNING")} JODI CHART
              </CardTitle>
            </CardHeader>

            {/* LEGEND */}
            {/* <div className="flex justify-center gap-2 text-[11px] font-semibold py-1 bg-orange-50">
              <span className="text-green-600">● Double</span>
              <span className="text-red-600">● High</span>
              <span className="text-indigo-600">● Medium</span>
              <span className="text-black">● Special</span>
            </div> */}

            <CardContent className="p-1">
              {/* DAYS */}
              <div className="grid grid-cols-7 text-center bg-orange-100 border-b border-orange-400">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-sm font-bold text-black py-1 border border-orange-300"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* DATA GRID */}
              <div className="grid grid-cols-7">
                {data.flat().map((num, idx) => (
                  <div
                    key={idx}
                    className={`
                      border border-orange-200
                      text-center
                      py-1.5
                      font-medium
                      text-lg
                      rounded-sm
                      transition
                      hover:scale-105
                      ${getNumberStyle(num)}
                    `}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <FooterSection />
        </div>
      </div>

      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};

export default JodiRecordChart;
