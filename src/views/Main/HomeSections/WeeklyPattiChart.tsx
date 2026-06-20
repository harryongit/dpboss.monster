import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeeklyPattiChart = () => {

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

  const pattiData = `1=>128-470-579-678
2=>589-246-129-660
3=>580-157-238-256
4=>149-130-220-158
5=>249-159-690-113
6=>123-358-169-880
7=>467-890-269-368
8=>288-134-378-125
9=>478-135-450-559
0=>160-550-479-118`;

  return (
    <Card className="bg-peach border border-red-600 shadow-sm rounded-none">

      <CardHeader className="rgb-animate text-white py-1">
        <CardTitle className="text-center text-lg font-extrabold italic leading-tight">
          DpBoss Net Weekly Patti Or Penal Chart From {weekRange} Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal Night, Kalyan Morning
        </CardTitle>
      </CardHeader>

      <CardContent className="p-2">
        <div className="text-center text-blue-900 text-lg font-bold italic whitespace-pre-line">
          {pattiData}
        </div>
      </CardContent>

    </Card>
  );
};

export default WeeklyPattiChart;