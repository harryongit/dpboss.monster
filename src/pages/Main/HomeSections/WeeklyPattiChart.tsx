import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeeklyPattiChart = ({ weeklyPatti }: { weeklyPatti: { number: string; values: string }[] }) => {
  return (
    <Card className="bg-white border-2 border-purple-400 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2">
        <CardTitle className="text-center text-base font-black tracking-wide">
          📅 Smboss Net Weekly Patti Or Penal Chart From 14-07-2024 To 20-07-2025 For Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal Night
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col items-center">
          {weeklyPatti.map((item) => (
            <div
              key={item.number}
              className="flex items-center justify-center bg-gradient-to-r from-purple-100 to-indigo-100 p-2 border-b border-purple-300 w-full max-w-md rounded-md"
            >
              <span className="text-lg font-extrabold text-purple-800 mr-2">{item.number} ⇒</span>
              <span className="text-lg font-bold text-indigo-700">{item.values}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyPattiChart;
