import React from "react";
import rajeshreeImage from "@/assets/andheristarline.png";

const KalyanStarLine = () => {
  const results = [
    { time: "09:05 AM", result: "779-3" },
    { time: "10:05 AM", result: "680-4" },
    { time: "11:05 AM", result: "355-3" },
    { time: "12:05 PM", result: "990-8" },
    { time: "01:05 PM", result: "148-3" },
    { time: "02:05 PM", result: "558-8" },
    { time: "03:05 PM", result: "248-4" },
    { time: "04:05 PM", result: "--" },
    { time: "05:05 PM", result: "--" },
    { time: "06:05 PM", result: "--" },
    { time: "07:05 PM", result: "--" },
    { time: "08:05 PM", result: "--" },
  ];

  const latestIndex = results
    .map((r) => r.result)
    .lastIndexOf(results.slice().reverse().find((r) => r.result !== "--")?.result);

  return (
    <div className="mt-6 border-2 border-purple-700 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Title */}
      <div className="bg-purple-700 text-white text-center font-black text-2xl py-2 tracking-wide">
        Kalyan Star Line
      </div>

      {/* Rotating Image */}
      <div className="w-full p-4 flex justify-center">
        <img
          src={rajeshreeImage}
          alt="Rajeshree Starline"
          className=" object-cover rounded-full animate-spin-slow"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-purple-700 text-center">
          <thead>
            <tr className="bg-purple-100">
              <th className="border border-purple-700 px-2 py-1">Time</th>
              <th className="border border-purple-700 px-2 py-1">Result</th>
              <th className="border border-purple-700 px-2 py-1">Time</th>
              <th className="border border-purple-700 px-2 py-1">Result</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(results.length / 2) }).map((_, rowIndex) => {
              const leftIndex = rowIndex * 2;
              const rightIndex = leftIndex + 1;
              const leftItem = results[leftIndex];
              const rightItem = results[rightIndex];

              const leftLatest = leftIndex === latestIndex;
              const rightLatest = rightIndex === latestIndex;

              return (
                <tr key={rowIndex}>
                  {/* Left Column */}
                  <td className="border border-purple-700 px-2 py-1 font-bold">{leftItem.time}</td>
                  <td
                    className={`border border-purple-700 px-2 py-1 font-black text-2xl
                      ${leftLatest ? "bg-red-500 text-white" : leftItem.result === "--" ? "bg-gray-200 text-gray-400" : "bg-yellow-100 text-black"}
                    `}
                  >
                    {leftItem.result}
                  </td>

                  {/* Right Column */}
                  {rightItem ? (
                    <>
                      <td className="border border-purple-700 px-2 py-1 font-bold">{rightItem.time}</td>
                      <td
                        className={`border border-purple-700 px-2 py-1 font-black text-2xl
                          ${rightLatest ? "bg-red-500 text-white" : rightItem.result === "--" ? "bg-gray-200 text-gray-400" : "bg-yellow-100 text-black"}
                        `}
                      >
                        {rightItem.result}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-purple-700 px-2 py-1"></td>
                      <td className="border border-purple-700 px-2 py-1"></td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tailwind CSS for slower rotation */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 10s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default KalyanStarLine;
