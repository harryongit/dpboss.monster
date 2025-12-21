import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PanelChartSection = () => {
  const panelCharts = [
    "Time Panel Chart",
    "Sridevi Panel Chart",
    "Kalyan Morning Panel Chart",
    "Madhuri Penal Chart",
    "Padmavathi Penal Chart",
    "Kalyan Penal Chart",
    "Sridevi Night Penal Chart",
    "Kalyan Night Penal Chart",
    "Old Main Mumbai Panel Chart",
    "Main Bazar Penal Chart",
    "Milan Morning Panel Chart",
    "Milan Day Penal Chart",
    "Milan Night Penal Chart",
    "Madhuri Night Panel Chart",
    "Rajdhani Night Panel Chart",
    "Madhur Morning Day Chart",
    "Madhur Day Panel Chart",
  ];

  return (
    <Card className="mt-6 border-2 border-blue-400 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 py-2">
        <CardTitle className="text-center text-xl font-extrabold text-white tracking-wide">
          📊 MATKA PANEL CHARTS
        </CardTitle>
      </CardHeader>

      <div className="p-3 space-y-2">
        {panelCharts.map((chart, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 px-4 py-2.5 rounded-full
                       bg-gradient-to-r from-blue-50 to-cyan-50
                       shadow-sm hover:shadow-md cursor-pointer
                       transition-all duration-200"
          >
            {/* glowing dot */}
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-600"></span>
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

export default PanelChartSection;
