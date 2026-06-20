import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeeklyJodiChart = () => {

  const getWeekRange = () => {
    const today = new Date();

    // get Monday
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));

    // get Sunday
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (date) =>
      date.toLocaleDateString("en-GB").replace(/\//g, "-");

    return `${format(monday)} To ${format(sunday)}`;
  };

  const [weekRange, setWeekRange] = React.useState("");
  React.useEffect(() => {
    setWeekRange(getWeekRange());
  }, []);

  const jodiData = `34 39 84 89
03 08 53 58
51 56 65 60
13 63 81 36
40 45 90 95
12 17 21 26`;

  return (
    <Card className="bg-[#e9b886] border border-red-600 shadow-sm rounded-none">
      <CardHeader className="rgb-animate text-white py-1">
        <CardTitle className="text-center text-lg font-extrabold italic leading-tight">
          RjBoss Net Weekly Jodi Chart From {weekRange} For Kalyan Milan Kalyan Night, Rajdhani Time, Main Bazar, Mumbai Royal Night Market, Kalyan Morning
        </CardTitle>
      </CardHeader>

      <CardContent className="p-2">
        <div className="text-center text-blue-900 text-lg font-bold italic whitespace-pre-line">
          {jodiData}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyJodiChart;