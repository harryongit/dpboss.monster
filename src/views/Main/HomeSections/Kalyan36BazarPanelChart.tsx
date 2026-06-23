"use client";
import React, { useMemo } from "react";
import { useNavigate } from "@/lib/router-compat";
import HeaderLogo from "./HeaderLogo";
import FooterSection from "./FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useKalyan36BazarPanelResults } from "@/hooks/common/useKalyan36BazarPanelResults";

const Kalyan36BazarPanelChart = () => {
  const navigate = useNavigate();
  const { data, isFetching, refetch } = useKalyan36BazarPanelResults();

  const days = useMemo(() => normalizePanel(data?.data), [data]);

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-extrabold text-black drop-shadow-lg">Kalyan 36 Bazar Chart</div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center justify-center bg-white text-orange-600 border border-orange-600 font-bold rounded shadow-md px-3 py-2 hover:bg-white/80 transition-all duration-300"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                size="sm"
                onClick={() => navigate(-1)}
                className="bg-white text-purple-700 border border-purple-600 font-bold rounded shadow-md px-3 py-2 hover:bg-white/80 transition-all duration-300"
              >
                Back
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {days.length === 0 && (
              <div className="text-center text-purple-700 font-semibold bg-purple-50 border border-purple-200 rounded-md p-2">
                No data available.
              </div>
            )}
            {days.map((day, idx) => (
              <div key={idx} className="border-2 border-pink-400 rounded-lg overflow-hidden shadow-xl bg-[#fdeccb]">
                {/* Purple Header */}
                <div className="bg-[#4b0082] py-2 text-center border-b-2 border-pink-400">
                  <h3 className="text-white font-black text-xl tracking-wider">
                    {formatDateLong(day.date)}
                  </h3>
                </div>

                {/* 4-Column Grid */}
                <div className="grid grid-cols-4">
                  {day.results.map((r, i) => (
                    <div
                      key={i}
                      className="border-r border-b border-pink-400 p-2 flex flex-col items-center justify-center min-h-[60px]"
                      style={{ 
                        borderRightWidth: (i + 1) % 4 === 0 ? '0px' : '1px' 
                      }}
                    >
                      <div className="text-[11px] font-[900] text-black leading-tight">
                        {to12Hour(r.result_time)}
                      </div>
                      <div className="text-[13px] font-bold text-gray-800 leading-tight">
                        {r.result === "" || r.result === "-" ? "***" : r.result}
                      </div>
                    </div>
                  ))}
                  
                  {/* Fill empty cells if not divisible by 4 */}
                  {day.results.length % 4 !== 0 && 
                    Array.from({ length: 4 - (day.results.length % 4) }).map((_, i) => (
                      <div key={`empty-${i}`} className="border-r border-b border-pink-400 p-2 min-h-[60px]" 
                           style={{ borderRightWidth: (day.results.length + i + 1) % 4 === 0 ? '0px' : '1px' }}></div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        <FooterSection />
      </div>
      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};

export default Kalyan36BazarPanelChart;

function to12Hour(t?: string): string {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hh = Number(h);
  const suffix = hh >= 12 ? "PM" : "AM";
  const displayHour = hh % 12 === 0 ? 12 : hh % 12;
  return `${String(displayHour).padStart(2, "0")}:${m} ${suffix}`;
}

function normalizePanel(raw: any): { date: string; results: { result_time: string; result: string }[] }[] {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : (raw?.items ?? []);
  return arr.map((d: any) => ({
    date: d.date,
    results: (d.results ?? []).slice().sort((a: any, b: any) => (a.result_time ?? "").localeCompare(b.result_time ?? "")),
  }));
}

function formatDateLong(s?: string): string {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
