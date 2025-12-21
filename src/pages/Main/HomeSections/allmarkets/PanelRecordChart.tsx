import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Define a PanelRecord type with day-wise winning flags
type PanelRecord = {
  date: string;
  Mon: string[][];
  MonWinning: boolean;
  Tue: string[][];
  TueWinning: boolean;
  Wed: string[][];
  WedWinning: boolean;
  Thu: string[][];
  ThuWinning: boolean;
  Fri: string[][];
  FriWinning: boolean;
  Sat: string[][];
  SatWinning: boolean;
  Sun: string[][];
  SunWinning: boolean;
};

// Example data with day-wise winning flags
const data: PanelRecord[] = [
  {
    date: "02/01/2023 to 08/01/2023",
    Mon: [["3", "8", "9"], ["00"], ["6", "1", "2"]],
    MonWinning: true,
    Tue: [["5", "6", "9"], ["70"], ["5", "5", "4"]],
    TueWinning: false,
    Wed: [["2", "6", "0"], ["44"], ["8", "7", "7"]],
    WedWinning: true,
    Thu: [["1", "9", "0"], ["10"], ["2", "3", "8"]],
    ThuWinning: false,
    Fri: [["4", "6", "9"], ["99"], ["1", "6", "0"]],
    FriWinning: true,
    Sat: [["8", "0", "0"], ["76"], ["7", "0", "3"]],
    SatWinning: false,
    Sun: [["3", "9", "9"], ["32"], ["4", "7", "6"]],
    SunWinning: false,
  },
  {
    date: "09/01/2023 to 15/01/2023",
    Mon: [["3", "8", "9"], ["00"], ["6", "1", "2"]],
    MonWinning: false,
    Tue: [["5", "6", "9"], ["40"], ["5", "5", "4"]],
    TueWinning: false,
    Wed: [["2", "6", "0"], ["44"], ["8", "7", "7"]],
    WedWinning: false,
    Thu: [["1", "9", "0"], ["10"], ["2", "3", "8"]],
    ThuWinning: true,
    Fri: [["4", "6", "9"], ["99"], ["1", "6", "0"]],
    FriWinning: true,
    Sat: [["8", "0", "0"], ["76"], ["7", "0", "3"]],
    SatWinning: false,
    Sun: [["3", "9", "9"], ["32"], ["4", "7", "6"]],
    SunWinning: false,
  },
  {
  date: "16/01/2023 to 22/01/2023",
  Mon: [["1", "2", "3"], ["11"], ["4", "5", "6"]],
  MonWinning: true,
  Tue: [["7", "8", "9"], ["22"], ["0", "1", "2"]],
  TueWinning: true,
  Wed: [["3", "4", "5"], ["33"], ["6", "7", "8"]],
  WedWinning: false,
  Thu: [["9", "0", "1"], ["44"], ["2", "3", "4"]],
  ThuWinning: true,
  Fri: [["5", "6", "7"], ["55"], ["8", "9", "0"]],
  FriWinning: false,
  Sat: [["1", "3", "5"], ["66"], ["7", "9", "0"]],
  SatWinning: true,
  Sun: [["2", "4", "6"], ["77"], ["8", "0", "1"]],
  SunWinning: false,
},
{
  date: "23/01/2023 to 29/01/2023",
  Mon: [["4", "5", "6"], ["88"], ["7", "8", "9"]],
  MonWinning: false,
  Tue: [["0", "1", "2"], ["99"], ["3", "4", "5"]],
  TueWinning: true,
  Wed: [["6", "7", "8"], ["00"], ["9", "1", "2"]],
  WedWinning: true,
  Thu: [["3", "5", "7"], ["11"], ["9", "0", "2"]],
  ThuWinning: false,
  Fri: [["4", "6", "8"], ["22"], ["0", "1", "3"]],
  FriWinning: true,
  Sat: [["5", "7", "9"], ["33"], ["1", "2", "4"]],
  SatWinning: false,
  Sun: [["6", "8", "0"], ["44"], ["2", "3", "5"]],
  SunWinning: true,
},
{
  date: "30/01/2023 to 05/02/2023",
  Mon: [["2", "3", "4"], ["55"], ["6", "7", "8"]],
  MonWinning: false,
  Tue: [["9", "0", "1"], ["66"], ["2", "3", "4"]],
  TueWinning: true,
  Wed: [["5", "6", "7"], ["77"], ["8", "9", "0"]],
  WedWinning: false,
  Thu: [["1", "2", "3"], ["88"], ["4", "5", "6"]],
  ThuWinning: true,
  Fri: [["7", "8", "9"], ["99"], ["0", "1", "2"]],
  FriWinning: true,
  Sat: [["3", "4", "5"], ["00"], ["6", "7", "8"]],
  SatWinning: false,
  Sun: [["9", "1", "3"], ["11"], ["5", "7", "8"]],
  SunWinning: true,
},
{
  date: "16/01/2023 to 22/01/2023",
  Mon: [["1", "2", "3"], ["11"], ["4", "5", "6"]],
  MonWinning: true,
  Tue: [["7", "8", "9"], ["22"], ["0", "1", "2"]],
  TueWinning: true,
  Wed: [["3", "4", "5"], ["33"], ["6", "7", "8"]],
  WedWinning: false,
  Thu: [["9", "0", "1"], ["44"], ["2", "3", "4"]],
  ThuWinning: true,
  Fri: [["5", "6", "7"], ["55"], ["8", "9", "0"]],
  FriWinning: false,
  Sat: [["1", "3", "5"], ["66"], ["7", "9", "0"]],
  SatWinning: true,
  Sun: [["2", "4", "6"], ["77"], ["8", "0", "1"]],
  SunWinning: false,
},
{
  date: "23/01/2023 to 29/01/2023",
  Mon: [["4", "5", "6"], ["88"], ["7", "8", "9"]],
  MonWinning: false,
  Tue: [["0", "1", "2"], ["99"], ["3", "4", "5"]],
  TueWinning: true,
  Wed: [["6", "7", "8"], ["00"], ["9", "1", "2"]],
  WedWinning: true,
  Thu: [["3", "5", "7"], ["11"], ["9", "0", "2"]],
  ThuWinning: false,
  Fri: [["4", "6", "8"], ["22"], ["0", "1", "3"]],
  FriWinning: true,
  Sat: [["5", "7", "9"], ["33"], ["1", "2", "4"]],
  SatWinning: false,
  Sun: [["6", "8", "0"], ["44"], ["2", "3", "5"]],
  SunWinning: true,
},
{
  date: "30/01/2023 to 05/02/2023",
  Mon: [["2", "3", "4"], ["55"], ["6", "7", "8"]],
  MonWinning: false,
  Tue: [["9", "0", "1"], ["66"], ["2", "3", "4"]],
  TueWinning: true,
  Wed: [["5", "6", "7"], ["77"], ["8", "9", "0"]],
  WedWinning: false,
  Thu: [["1", "2", "3"], ["88"], ["4", "5", "6"]],
  ThuWinning: true,
  Fri: [["7", "8", "9"], ["99"], ["0", "1", "2"]],
  FriWinning: true,
  Sat: [["3", "4", "5"], ["00"], ["6", "7", "8"]],
  SatWinning: false,
  Sun: [["9", "1", "3"], ["11"], ["5", "7", "8"]],
  SunWinning: true,
},
{
  date: "16/01/2023 to 22/01/2023",
  Mon: [["1", "2", "3"], ["11"], ["4", "5", "6"]],
  MonWinning: true,
  Tue: [["7", "8", "9"], ["22"], ["0", "1", "2"]],
  TueWinning: true,
  Wed: [["3", "4", "5"], ["33"], ["6", "7", "8"]],
  WedWinning: false,
  Thu: [["9", "0", "1"], ["44"], ["2", "3", "4"]],
  ThuWinning: true,
  Fri: [["5", "6", "7"], ["55"], ["8", "9", "0"]],
  FriWinning: false,
  Sat: [["1", "3", "5"], ["66"], ["7", "9", "0"]],
  SatWinning: true,
  Sun: [["2", "4", "6"], ["77"], ["8", "0", "1"]],
  SunWinning: false,
},
{
  date: "23/01/2023 to 29/01/2023",
  Mon: [["4", "5", "6"], ["88"], ["7", "8", "9"]],
  MonWinning: false,
  Tue: [["0", "1", "2"], ["99"], ["3", "4", "5"]],
  TueWinning: true,
  Wed: [["6", "7", "8"], ["00"], ["9", "1", "2"]],
  WedWinning: true,
  Thu: [["3", "5", "7"], ["11"], ["9", "0", "2"]],
  ThuWinning: false,
  Fri: [["4", "6", "8"], ["22"], ["0", "1", "3"]],
  FriWinning: true,
  Sat: [["5", "7", "9"], ["33"], ["1", "2", "4"]],
  SatWinning: false,
  Sun: [["6", "8", "0"], ["44"], ["2", "3", "5"]],
  SunWinning: true,
},
{
  date: "30/01/2023 to 05/02/2023",
  Mon: [["2", "3", "4"], ["55"], ["6", "7", "8"]],
  MonWinning: false,
  Tue: [["9", "0", "1"], ["66"], ["2", "3", "4"]],
  TueWinning: true,
  Wed: [["5", "6", "7"], ["77"], ["8", "9", "0"]],
  WedWinning: false,
  Thu: [["1", "2", "3"], ["88"], ["4", "5", "6"]],
  ThuWinning: true,
  Fri: [["7", "8", "9"], ["99"], ["0", "1", "2"]],
  FriWinning: true,
  Sat: [["3", "4", "5"], ["00"], ["6", "7", "8"]],
  SatWinning: false,
  Sun: [["9", "1", "3"], ["11"], ["5", "7", "8"]],
  SunWinning: true,
}


];

// Array of days to iterate
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PanelRecordChart = () => {
  const { marketName } = useParams();
const isDoubleNumber = (num: string) =>
  num.length === 2 && num[0] === num[1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-violet-50">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          {/* Market Name & Refresh */}
          <div className="flex flex-col items-center mb-4 space-y-2">
            <div className="text-2xl font-extrabold text-black drop-shadow-lg text-center">
              {decodeURIComponent(marketName || "RAKHI MORNING")}
            </div>
            <div className="text-xl font-bold uppercase tracking-wider text-black">
              669-14-789
            </div>
            <Button
              size="sm"
              className="flex items-center justify-center bg-white text-orange-600 border border-orange-600 font-bold rounded shadow-md px-4 py-2 hover:bg-white/80 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh Result
            </Button>
          </div>

          {/* Panel Chart */}
          <Card className="border-2 border-orange-500 shadow-xl mt-4">
            <CardHeader className="bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 py-2">
              <CardTitle className="text-center text-white font-black tracking-wide text-lg">
                🌅 {decodeURIComponent(marketName || "RAKHI MORNING")} PANEL CHART
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 text-[8px]">
              <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full text-center">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="border px-2 py-1">Date</th>
                      {days.map((day) => (
                        <th key={day} className="border  px-2 py-1">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border text-[9px] font-bold">{row.date}</td>
                        {days.map((day) => {
                          const dayData = row[day as keyof PanelRecord] as string[][];
                          const dayWinning = row[`${day}Winning` as keyof PanelRecord] as boolean;

                          return (
                            <td key={day} className="border ">
                              <div className="flex justify-center gap-2">
                                {dayData?.map((cell, i) => (
                                  <div
                                    key={i}
                                    className="flex flex-col justify-center items-center"
                                    style={{ minHeight: "3rem" }}
                                  >
                                    {cell.map((num) => (
                                      <span
  key={num}
  className={`
    ${dayWinning ? "text-red-600 font-bold" : ""}
    ${isDoubleNumber(num) ? "text-[11px]" : "text-[9px]"}
  `}
>
  {num}
</span>

                                    ))}
                                  </div>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        <FooterSection />
      </div>
      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};

export default PanelRecordChart;
