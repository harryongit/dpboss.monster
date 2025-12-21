import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const JodiChartSection = () => {
  const charts = [
    "Time Chart",
    "Sridevi Chart",
    "Kalyan Morning Chart",
    "Madhuri Chart",
    "Kalyan Chart",
    "Sridevi Night Chart",
    "Kalyan Night Chart",
    "Old Main Mumbai Chart",
    "Main Bazar Chart",
    "Milan Morning Chart",
    "Milan Day Chart",
    "Milan Night Chart",
    "Madhuri Night Chart",
    "Madhur Morning Chart",
    "Madhur Day Chart",
    "Madhur Night Chart",
    "Rajdhani Night Chart",
  ];

  return (
    <Card className="mt-6 border-2 border-emerald-400 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 py-2">
        <CardTitle className="text-center text-xl font-extrabold text-white tracking-wide">
          📊 SATTA MATKA JODI CHARTS
        </CardTitle>
      </CardHeader>

      <div className="p-3 space-y-2">
        {charts.map((chart, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-full
                       bg-gradient-to-r from-emerald-50 to-green-50
                       shadow-sm hover:shadow-md cursor-pointer
                       transition-all duration-200"
          >
            {/* glowing dot */}
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600"></span>
            </span>

            {/* text */}
            <p className="text-xl font-semibold leading-tight text-gray-800">
              {chart}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default JodiChartSection;
