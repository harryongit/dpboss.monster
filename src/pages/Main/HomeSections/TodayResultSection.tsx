import React from "react";

const TodayMatkaResult = () => {
  const results = [
    { time: "11:00 AM", result: "279-8" },
    { time: "11:15 AM", result: "123-6" },
    { time: "11:30 AM", result: "390-2" },
    { time: "11:45 AM", result: "557-7" },
    { time: "12:00 PM", result: "235-0" },
    { time: "12:15 PM", result: "588-1" },
    { time: "12:30 PM", result: "780-5" },
    { time: "12:45 PM", result: "779-3" },
    { time: "01:00 PM", result: "160-7" },
    { time: "01:15 PM", result: "148-3" },
    { time: "01:30 PM", result: "590-4" },
    { time: "01:45 PM", result: "149-4" },
    { time: "02:00 PM", result: "156-2" },
    { time: "02:15 PM", result: "690-5" },
    { time: "02:30 PM", result: "226-0" },
    { time: "02:45 PM", result: "589-2" },
    { time: "03:00 PM", result: "337-3" },
    { time: "03:15 PM", result: "369-8" },
    { time: "03:30 PM", result: "800-8" },
    { time: "03:45 PM", result: "238-3" },
    { time: "04:00 PM", result: "--" },
    { time: "04:15 PM", result: "--" },
    { time: "04:30 PM", result: "--" },
    { time: "04:45 PM", result: "--" },
    { time: "05:00 PM", result: "--" },
    { time: "05:15 PM", result: "--" },
    { time: "05:30 PM", result: "--" },
    { time: "05:45 PM", result: "--" },
    { time: "06:00 PM", result: "--" },
    { time: "06:15 PM", result: "--" },
    { time: "06:30 PM", result: "--" },
    { time: "06:45 PM", result: "--" },
    { time: "07:00 PM", result: "--" },
    { time: "07:15 PM", result: "--" },
    { time: "07:30 PM", result: "--" },
    { time: "07:45 PM", result: "--" },
    { time: "08:00 PM", result: "--" },
  ];

  const latestIndex = results
    .map((r) => r.result)
    .lastIndexOf(results.slice().reverse().find((r) => r.result !== "--")?.result);

  return (
    <div className="mt-5 border-2 border-purple-700 rounded-xl overflow-hidden shadow-lg bg-white">
      {/* Header */}
      <div className="bg-purple-700 text-white text-center font-black text-2xl py-3 tracking-wide">
    
        {new Date().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
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
    </div>
  );
};

export default TodayMatkaResult;
