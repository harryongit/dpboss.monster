"use client";

import React, { useMemo } from "react";
import { useParams, useLocation } from "@/lib/router-compat";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJodiChart } from "@/hooks/main/useJodiChart";
import { useMainWebsite } from "@/hooks/main/useMainWebsite";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* 🎯 Winning highlight logic */
const getNumberStyle = (num: string) => {
  const n = parseInt(num, 10);
  if (isNaN(n)) return "text-black";

  // List of numbers to highlight
  const highlightedNumbers = [
    "00", "11", "22", "33", "44", "55", "66", "77", "88", "99",
    "05", "16", "27", "38", "49", "94", "83", "72", "61", "50"
  ];

  if (highlightedNumbers.includes(num)) {
    return "bg-red-500/20 text-red-700 font-bold";
  }

  return "text-black";
};

const JodiRecordChart = () => {
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

  // 2. Fetch jodi chart data
  const { data: jodiData, isLoading: isJodiLoading, refetch } = useJodiChart(marketId);


  const isLoading = (!!marketId && isJodiLoading);

  const dayCount = jodiData?.data?.days ?? 7;
  const displayDays = days.slice(0, dayCount);

  const highlightedNumbers = [
    "00", "11", "22", "33", "44", "55", "66", "77", "88", "99",
    "05", "16", "27", "38", "49", "94", "83", "72", "61", "50"
  ];

  return (
    <div className="min-h-screen bg-[#fc9]">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-1">
          {/* Main Title */}
          <h1 className="satta-header-pink text-[18px] mb-1">
            {decodedMarketName} JODI CHART
          </h1>

          {/* Description Box */}
          <div className="satta-para3 p-2 mb-2">
            <h2 className="text-[14px] font-bold m-0 italic">
              {decodedMarketName} JODI RESULT CHART RECORDS
            </h2>
            <p className="text-[12px] leading-tight m-0 opacity-90">
              Rjboss {decodedMarketName} jodi chart, {decodedMarketName} jodi chart, old {decodedMarketName} jodi chart, dpboss {decodedMarketName} chart, {decodedMarketName} jodi record, {decodedMarketName}jodi record, {decodedMarketName} jodi chart 2015,
              {decodedMarketName} jodi chart 2012, {decodedMarketName} jodi chart 2012 to 2023, {decodedMarketName} final ank, {decodedMarketName} jodi chart.co,
              {decodedMarketName} jodi chart matka, {decodedMarketName} jodi chart book, {decodedMarketName} matka chart, matka jodi chart {decodedMarketName}, matka {decodedMarketName} chart,
              satta {decodedMarketName} chart jodi, {decodedMarketName} state chart, {decodedMarketName} chart result,
              सट्टा चार्ट, सट्टा मटका जोड़ी चार्ट, सट्टा मटका जोड़ी चार्ट, कल्याण मॉर्निंग मटका जोड़ी चार्ट, सट्टा मटका कल्याण मॉर्निंग चार्ट जोड़ी, कल्याण मॉर्निंग सट्टा चार्ट, कल्याण मॉर्निंग जोड़ी चार्ट
            </p>
          </div>

          {/* Top Info Box */}
          <div className="satta-chart-result-box mb-2">
            <div className="market-name uppercase">{decodedMarketName}</div>
            <span className="result-value">
              {jodiData?.data?.result || "---"}
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
            <a href="#bottom" className="satta-btn-purple !bg-[#a0d5ff] !text-[#220c82] !px-8 !py-2 !text-[14px] !rounded-none shadow-md border !border-black/20">
              Go to Bottom
            </a>
          </div>

          {/* Chart Table */}
          <div className="overflow-hidden mb-4">
            <table className="satta-chart-table">
              <thead>
                <tr>

                  {displayDays.map((day) => (
                    <th key={day} className="uppercase text-[12px] py-2">
                      {day}
                    </th>
                  ))}

                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={dayCount} className="p-10 text-center font-bold italic text-blue-900 bg-[#ffebcd]">
                      Loading record data...
                    </td>
                  </tr>
                ) : (
                  jodiData?.data?.weeks?.map((week, wIdx) => {
                    let filledJodi = [...week.jodi];
                    if (filledJodi.length > dayCount) filledJodi = filledJodi.slice(0, dayCount);
                    while (filledJodi.length < dayCount) filledJodi.push("**");

                    return (
                      <tr key={wIdx}>
                        {filledJodi.map((num, idx) => (
                          <td
                            key={idx}
                            className={`
                              text-center
                              py-2
                              font-bold
                              text-[24px]
                              ${highlightedNumbers.includes(num) ? "satta-red" : ""}
                            `}
                          >
                            {num}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div id="bottom"></div>
        </div>

        <FooterSection />
      </div>

      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};


export default JodiRecordChart;
