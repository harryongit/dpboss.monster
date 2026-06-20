import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeeklyLineChart = () => {

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

  return (
    <Card className="bg-peach border border-red-600 shadow-sm rounded-none">
      <CardHeader className="rgb-animate text-white py-1">
        <CardTitle className="text-center text-lg font-extrabold italic leading-tight">
          DpBoss Net Weekly Line Open Or Close From {weekRange} For
          Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar,
          Mumbai Royal Night, Kalyan Morning
        </CardTitle>
      </CardHeader>

      <CardContent className="p-2">
        <div className="flex flex-col items-center text-center text-blue-900 text-lg font-bold italic">
          <div>Mon. 1-6-3-8</div>
          <div>Tue. 2-7-3-8</div>
          <div>Wed. 1-6-5-0</div>
          <div>Thu. 2-7-3-8</div>
          <div>Fri. 1-6-5-0</div>
          <div>Sat. 2-7-3-8</div>
          <div>Sun. 3-8-4-9</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyLineChart;