"use client";

import React, { useMemo } from "react";
import { useParams, useLocation } from "@/lib/router-compat";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { usePanelChart, PanelChartDayData } from "@/hooks/main/usePanelChart";
import { useMainWebsite } from "@/hooks/main/useMainWebsite";
import { format } from "date-fns";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PanelRecordChart = () => {
  const { marketName } = useParams();
  const decodedMarketName = decodeURIComponent(marketName || "RAKHI MORNING");

  const { state } = useLocation();
  const marketIdFromState = (state as any)?.marketId as number | undefined;

  // Try loading all markets to match name to ID if state is empty
  const { data: mainData } = useMainWebsite();

  const marketId = useMemo(() => {
    if (marketIdFromState) return marketIdFromState;
    const found = mainData?.data?.all_markets?.find(
      (m) => m.market_name.toLowerCase() === decodedMarketName.toLowerCase()
    );
    return found?.market_id;
  }, [marketIdFromState, mainData, decodedMarketName]);

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
    <div className="min-h-screen bg-[#fc9]">
      <div className="max-w-[1000px] mx-auto overflow-hidden">
        <HeaderLogo />

        <div className="p-1">
          {/* Main Title */}
          <h1 className="satta-header-pink text-[18px] mb-1 uppercase">
            {decodedMarketName} PANEL CHART
          </h1>

          {/* Description Box */}
          <div className="satta-para3 p-2 mb-2">
            <h2 className="text-[14px] font-bold m-0 italic">
              {decodedMarketName} PANEL RESULT CHART RECORDS
            </h2>
            <p className="text-[12px] leading-tight m-0 opacity-90">
              DpBoss {decodedMarketName} panel chart, {decodedMarketName} panel chart, old {decodedMarketName} panel chart,
              {decodedMarketName} pana patti chart, dpboss {decodedMarketName}, {decodedMarketName} panel record, {decodedMarketName} panel record, {decodedMarketName} panel chart 2015,
              {decodedMarketName} panel chart 2012, {decodedMarketName} panel chart 2012 to 2023, {decodedMarketName} final ank, {decodedMarketName} panel chart.co,
              {decodedMarketName} panel chart matka, {decodedMarketName} panel chart book, {decodedMarketName} matka chart, matka panel chart {decodedMarketName}, matka {decodedMarketName} chart,
              satta {decodedMarketName} chart panel, {decodedMarketName} state chart, {decodedMarketName} chart result,
              सट्टा चार्ट, सट्टा मटका पैनल चार्ट, सट्टा मटका पैनल चार्ट, कल्याण मॉर्निंग मटका पैनल चार्ट, सट्टा मटका कल्याण मॉर्निंग चार्ट पैनल, कल्याण मॉर्निंग सट्टा चार्ट, कल्याण मॉर्निंग पैनल चार्ट
            </p>
          </div>

          {/* Top Info Box */}
          <div className="satta-chart-result-box mb-2">
            <div className="market-name uppercase">{decodedMarketName}</div>
            <span className="result-value">
              {panelData?.data?.result || "---"}
            </span>
            <div className="mt-1">
              <button
                onClick={() => refetch()}
                className="satta-btn-purple !text-[12px] !px-3 !py-1"
              >
                Refresh Result
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-2">
            <a href="#bottom" className="satta-btn-purple !bg-[#a0d5ff] !text-[#220c82] !px-8 !py-2 !text-[14px] !rounded-none shadow-md">
              Go to Bottom
            </a>
          </div>

          {/* Main Chart Table */}
          <div className="overflow-x-auto mb-4 bg-[#fecd99]">
            <table className="satta-chart-table w-full">
              <thead>
                <tr>
                  <th className="text-[12px]">Date</th>
                  {(days.slice(0, panelData?.data?.days ?? 7)).map((day) => (
                    <th key={day} colSpan={3} className="uppercase text-[12px] py-1">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={22} className="p-10 text-center font-bold italic text-blue-900 bg-[#ffebcd]">
                      Loading record data...
                    </td>
                  </tr>
                ) : (
                  panelData?.data?.weeks?.map((week, idx) => (
                    <tr key={idx}>
                      {/* DATE COLUMN */}
                      <td className="satta-panel-date bg-[#ffcc00]/10 font-bold p-1">
                        {formatDateRange(week.start_date, week.end_date)}
                      </td>

                      {week.data.map((dayData, dayIdx) => {
                        const [openArr, jodiArr, closeArr] = processDayData(dayData);
                        const highlightedNumbers = [
                          "00", "11", "22", "33", "44", "55", "66", "77", "88", "99",
                          "05", "16", "27", "38", "49", "94", "83", "72", "61", "50"
                        ];
                        const highlightRed = dayData?.jodi && highlightedNumbers.includes(dayData.jodi);
                        const isRed = highlightRed ? "satta-red" : "";

                        return (
                          <React.Fragment key={dayIdx}>
                            {/* Open Panna */}
                            <td className={`!border-r-0 satta-panel-panna ${isRed} px-0.5`}>
                              {openArr.map((n, i) => (
                                <React.Fragment key={i}>{n}{i < openArr.length - 1 && <br />}</React.Fragment>
                              ))}
                            </td>
                            {/* Jodi */}
                            <td className={`!border-x-0 satta-panel-number ${isRed} font-black px-1`}>
                              {jodiArr[0]}
                            </td>
                            {/* Close Panna */}
                            <td className={`!border-l-0 satta-panel-panna ${isRed} px-0.5`}>
                              {closeArr.map((n, i) => (
                                <React.Fragment key={i}>{n}{i < closeArr.length - 1 && <br />}</React.Fragment>
                              ))}
                            </td>
                          </React.Fragment>
                        );
                      })}

                      {/* EMPTY FILLERS */}
                      {Array.from({ length: Math.max(0, (panelData?.data?.days ?? 7) - (week.data?.length || 0)) }).map((_, i) => (
                        <React.Fragment key={`empty-${i}`}>
                          <td className="border border-black bg-[#f3c08c] p-1"></td>
                          <td className="border border-black bg-[#f3c08c] p-1"></td>
                          <td className="border border-black bg-[#f3c08c] p-1"></td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div id="bottom" />
        </div>

        <FooterSection />
      </div>

      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};


export default PanelRecordChart;  