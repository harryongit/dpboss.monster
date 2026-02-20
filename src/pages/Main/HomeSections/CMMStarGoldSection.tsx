import React, { useMemo, useState } from "react";
import { useCmmStarGoldTodayResult } from "@/hooks/common/useCmmStarGoldTodayResult";
import { useNavigate } from "react-router-dom";

const CMMStarGoldSection = () => {
  const [view] = useState<'today' | 'chart'>('today');
  const navigate = useNavigate();
  const todayQuery = useCmmStarGoldTodayResult();

  const todayItems = useMemo(() => {
    const raw: any = todayQuery.data?.data;
    const items: any[] = Array.isArray(raw) ? raw : (raw?.items ?? []);
    const sorted = items.slice().sort((a, b) => (a.result_time ?? '').localeCompare(b.result_time ?? ''));
    return sorted.map((it) => ({ time: to12Hour(it.result_time), result: it.result ?? '--' }));
  }, [todayQuery.data]);

  const latestIndex = useMemo(() => {
    const idx = todayItems.map((r) => r.result).lastIndexOf(todayItems.slice().reverse().find((r) => r.result !== "--")?.result);
    return idx < 0 ? todayItems.length - 1 : idx;
  }, [todayItems]);

  return (
    <div className="mt-5 border-2 border-purple-700 rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-3 px-3 tracking-wide">
        <div className="flex items-center justify-between">
          <span className="font-black text-2xl">CMM STAR GOLD</span>
          <button
            className="px-3 py-1 rounded bg-white text-purple-700 font-semibold border border-white shadow-sm"
            onClick={() => navigate('/cmm-star-gold-panel-chart')}
          >
            Panel
          </button>
          <button
            className="ml-2 px-3 py-1 rounded bg-white text-green-700 font-semibold border border-white shadow-sm"
            onClick={() => navigate('/cmm-star-gold-upload-public')}
          >
            Upload
          </button>
        </div>
      </div>

      {view === 'today' ? (
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
              {Array.from({ length: Math.ceil(todayItems.length / 2) }).map((_, rowIndex) => {
                const leftIndex = rowIndex * 2;
                const rightIndex = leftIndex + 1;
                const leftItem = todayItems[leftIndex];
                const rightItem = todayItems[rightIndex];
                const leftLatest = leftIndex === latestIndex;
                const rightLatest = rightIndex === latestIndex;
                return (
                  <tr key={rowIndex}>
                    <td className="border border-purple-700 px-2 py-1 font-bold">{leftItem?.time ?? ''}</td>
                    <td className={`border border-purple-700 px-2 py-1 font-black text-2xl ${leftLatest ? "bg-red-500 text-white" : !leftItem || leftItem.result === "--" ? "bg-gray-200 text-gray-400" : "bg-yellow-100 text-black"}`}>
                      {leftItem?.result ?? ''}
                    </td>
                    {rightItem ? (
                      <>
                        <td className="border border-purple-700 px-2 py-1 font-bold">{rightItem.time}</td>
                        <td className={`border border-purple-700 px-2 py-1 font-black text-2xl ${rightLatest ? "bg-red-500 text-white" : rightItem.result === "--" ? "bg-gray-200 text-gray-400" : "bg-yellow-100 text-black"}`}>
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
      ) : null}
    </div>
  );
};

export default CMMStarGoldSection;

function to12Hour(t?: string): string {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hh = Number(h);
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const displayHour = hh % 12 === 0 ? 12 : hh % 12;
  return `${String(displayHour).padStart(2, '0')}:${m} ${suffix}`;
}

// panel normalization moved to dedicated page
