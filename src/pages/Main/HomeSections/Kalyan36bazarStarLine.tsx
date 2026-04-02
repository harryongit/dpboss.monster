import React, { useMemo } from "react";
import thirtySixBazaar from "@/assets/36bazar.png";
import { useKalyan36BazarTodayResult } from "@/hooks/common/useKalyan36BazarTodayResult";
import { useNavigate } from "react-router-dom";

const Kalyan36bazarStarLine = () => {
  const resultQuery = useKalyan36BazarTodayResult();
  const navigate = useNavigate();

  const results = useMemo(() => {
    const raw: any = resultQuery.data?.data;
    const items: any[] = Array.isArray(raw) ? raw : (raw?.items ?? []);

    // Sort by time
    const sorted = items
      .slice()
      .sort((a, b) =>
        (a.result_time ?? "").localeCompare(b.result_time ?? "")
      );

    return sorted.map((it) => ({
      time: to12Hour(it.result_time),
      result: it.result ?? "--",
    }));
  }, [resultQuery.data]);

  const latestItem = useMemo(() => {
    return [...results].reverse().find((r) => r.result !== "--");
  }, [results]);

  const latestResult = latestItem?.result || "--";

  return (
    <div className="mt-6 border-2 border-red-600 rounded-lg overflow-hidden shadow-2xl bg-[#ffcca0]">
      {/* Header Section */}
      <div className="bg-yellow-400 text-black text-center font-bold italic text-2xl py-1 rounded-xl border-2 border-black select-none flex items-center justify-between px-4" style={{
        textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white',
      }}>
        <div className="flex-1 text-center pl-10">KALYAN 36 BAZAR</div>
        <button
          onClick={() => navigate('/kalyan-36-bazar-panel-chart')}
          className="bg-black text-white text-[11px] font-black italic px-3 py-1 rounded-md border-2 border-gray-400 leading-none"
        >
          Chart
        </button>
      </div>


      {/* Wheel Section */}
      <div className="relative flex justify-center">
        {/* The Wheel Image */}
        <div className="relative w-72 h-72">
          <img
            src={thirtySixBazaar}
            alt="thirtySixBazaar"
            className="w-full h-full object-contain rounded-full animate-spin-slow drop-shadow-2xl"
          />

          {/* Static Center Display (Does not spin) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full border-4 border-[#ffeb3b] flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 transition-transform duration-500 hover:scale-110">
            <span className="text-[#3c4195] font-[900] italic text-2xl tracking-tight">
              {latestResult}
            </span>
          </div>
        </div>
      </div>

      {/* Result Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead className="bg-white border-b-2 border-red-600">
            <tr>
              <th className="border border-red-600 px-2 py-1.5 text-black font-black italic text-base">Time</th>
              <th className="border border-red-600 px-2 py-1.5 text-black font-black italic text-base">Result</th>
              <th className="border border-red-600 px-2 py-1.5 text-black font-black italic text-base">Time</th>
              <th className="border border-red-600 px-2 py-1.5 text-black font-black italic text-base">Result</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(results.length / 2) }).map((_, rowIndex) => {
              const leftItem = results[rowIndex * 2];
              const rightItem = results[rowIndex * 2 + 1];

              return (
                <tr key={rowIndex} className="border-b border-red-600">
                  <td className="border-r border-red-600 px-2 py-1 text-black font-[800] italic text-[15px]">{leftItem.time}</td>
                  <td className="border-r border-red-600 px-2 py-1 text-red-600 font-[900] text-lg">{leftItem.result}</td>

                  {rightItem ? (
                    <>
                      <td className="border-r border-red-600 px-2 py-1 text-black font-[800] italic text-[15px]">{rightItem.time}</td>
                      <td className="px-2 py-1 text-red-600 font-[900] text-lg">{rightItem.result}</td>
                    </>
                  ) : (
                    <>
                      <td className="border-r border-red-600 px-2 py-1"></td>
                      <td></td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style>
        {`
          @keyframes spin-custom {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-custom 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Kalyan36bazarStarLine;

// ⏰ Time formatter
function to12Hour(t?: string): string {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hh = Number(h);
  const suffix = hh >= 12 ? "PM" : "AM";
  const displayHour = hh % 12 === 0 ? 12 : hh % 12;
  return `${String(displayHour).padStart(2, "0")}:${m} ${suffix}`;
}
