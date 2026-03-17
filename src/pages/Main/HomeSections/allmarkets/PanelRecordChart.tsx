import React, { useMemo } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useParams, useLocation } from "react-router-dom";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { usePanelChart, PanelChartDayData } from "@/hooks/main/usePanelChart";
import { format } from "date-fns";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PanelRecordChart = () => {
  const { marketName } = useParams();
  const decodedMarketName = decodeURIComponent(marketName || "RAKHI MORNING");

  const { state } = useLocation();
  const marketIdFromState = (state as any)?.marketId as number | undefined;

  const marketId = useMemo(() => {
    return marketIdFromState;
  }, [marketIdFromState]);

  const { data: panelData, isLoading: isPanelLoading, refetch } =
    usePanelChart(marketId);

  const isLoading = !!marketId && isPanelLoading;

  const daysColSpan = (panelData?.data?.days ?? 7) + 1;

  const isDoubleNumber = (num: string) =>
    num.length === 2 && num[0] === num[1];

  const formatDateRange = (start: string, end: string) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      return (
        <div className="flex flex-col items-center leading-none py-1">
          <span>{format(s, "dd/MM/yyyy")}</span>
          <span className="text-[8px] font-bold">to</span>
          <span>{format(e, "dd/MM/yyyy")}</span>
        </div>
      );
    } catch {
      return (
        <div className="flex flex-col items-center leading-none py-1">
          <span>{start}</span>
          <span className="text-[8px] font-bold">to</span>
          <span>{end}</span>
        </div>
      );
    }
  };

  const processDayData = (dayData?: PanelChartDayData) => {
    if (!dayData) return [[""], [""], [""]];

    const openArr = dayData.open ? dayData.open.split("") : [""];
    const jodiArr = dayData.jodi ? [dayData.jodi] : ["**"];
    const closeArr = dayData.close ? dayData.close.split("") : [""];

    return [openArr, jodiArr, closeArr];
  };

  return (
    <div className="min-h-screen bg-orange-100">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          {/* Market Name */}
          <div className="flex flex-col items-center mb-3 space-y-2">
            <div className="text-xl font-extrabold text-black text-center">
              {decodedMarketName}
            </div>

            <div className="text-lg font-bold text-black">
              {panelData?.data?.result || "Loading..."}
            </div>

            <Button
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="flex items-center justify-center bg-white text-red-600 border border-red-600 font-bold rounded shadow px-3 py-1"
            >
              <RefreshCw
                className={`h-4 w-4 mr-1 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
              Refresh Result
            </Button>
          </div>

          {/* Panel Chart */}
          <Card className="border-2 border-gray-700 shadow-md">

            {/* BLUE HEADER */}
            <CardHeader className="bg-blue-700 py-2">
              <CardTitle className="text-center text-yellow-300 font-extrabold text-sm">
                KALYAN MORNING MATKA PANEL RECORD 2023 - 2026
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 text-[9px]">

              <div className="overflow-x-auto">

                <table className="w-full border-collapse text-center">

                  {/* HEADER */}
                  <thead className="bg-yellow-300 text-black font-bold">
                    <tr>
                      <th className="border border-gray-700 px-1 py-1 w-[75px]">
                        Date
                      </th>

                      {(days.slice(0, panelData?.data?.days ?? 7)).map(
                        (day) => (
                          <th
                            key={day}
                            className="border border-gray-700 px-1 py-1"
                          >
                            {day}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody className="bg-orange-100">

                    {isLoading ? (
                      <tr>
                        <td colSpan={daysColSpan} className="p-4">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      panelData?.data?.weeks?.map((week, idx) => (
                        <tr key={idx}>

                          {/* DATE COLUMN */}
                          <td className="border border-gray-700 text-[9px] font-bold bg-orange-200">
                            {formatDateRange(
                              week.start_date,
                              week.end_date
                            )}
                          </td>

                          {week.data.map((dayData, dayIdx) => {
                            const [openArr, jodiArr, closeArr] =
                              processDayData(dayData);

                            const highlightedNumbers = [
                              "00","11","22","33","44","55","66","77","88","99",
                              "05","16","27","38","49","94","83","72","61","50"
                            ];

                            const highlightRed =
                              dayData?.jodi &&
                              highlightedNumbers.includes(dayData.jodi);

                            return (
                              <td
                                key={dayIdx}
                                className="border border-gray-700"
                              >
                                <div className="flex justify-center gap-1">

                                  {[openArr, jodiArr, closeArr].map(
                                    (cell, i) => (
                                      <div
                                        key={i}
                                        className="flex flex-col items-center justify-center leading-none"
                                        style={{ minHeight: "42px" }}
                                      >
                                        {cell.map((num, nIdx) => (
                                          <span
                                            key={nIdx}
                                            className={`
                                              ${
                                                highlightRed
                                                  ? "text-red-600 font-bold"
                                                  : "text-black"
                                              }
                                              ${
                                                isDoubleNumber(num)
                                                  ? "text-[11px]"
                                                  : "text-[9px]"
                                              }
                                            `}
                                          >
                                            {num}
                                          </span>
                                        ))}
                                      </div>
                                    )
                                  )}

                                </div>
                              </td>
                            );
                          })}

                          {/* EMPTY CELLS */}
                          {Array.from({
                            length: Math.max(
                              0,
                              (panelData?.data?.days ?? 7) -
                                (week.data?.length || 0)
                            ),
                          }).map((_, i) => (
                            <td
                              key={`empty-${i}`}
                              className="border border-gray-700"
                            ></td>
                          ))}

                        </tr>
                      ))
                    )}

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