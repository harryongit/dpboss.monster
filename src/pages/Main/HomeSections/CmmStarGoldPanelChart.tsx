import React, { useMemo, useState } from "react";
import { useCmmStarGoldPanelResults } from "@/hooks/common/useCmmStarGoldPanelResults";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import HeaderLogo from "./HeaderLogo";
import FooterSection from "./FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const CmmStarGoldPanelChart = () => {
  const navigate = useNavigate();
  const { data, isFetching, refetch } = useCmmStarGoldPanelResults();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const days = useMemo(() => normalizePanel(data?.data), [data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-violet-50">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-extrabold text-black drop-shadow-lg">CMM STAR GOLD Chart</div>
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

          <div className="space-y-3">
            {days.length === 0 && (
              <div className="text-center text-purple-700 font-semibold bg-purple-50 border border-purple-200 rounded-md p-2">
                No data available.
              </div>
            )}
            {days.map((day, idx) => (
              <Card key={idx} className="border-2 border-orange-500 shadow-xl mt-2">
                <CardHeader className="bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600 py-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white font-black tracking-wide text-lg">
                      {formatDate(day.date)}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-orange-700 font-bold rounded-full px-2 py-1 text-xs">
                        {day.results.length}
                      </span>
                      {day.results.length > 10 && (
                        <Button
                          size="sm"
                          onClick={() => setExpanded((e) => ({ ...e, [idx]: !e[idx] }))}
                          className="bg-white text-purple-700 border border-purple-600 font-bold rounded shadow-md px-3 py-1 hover:bg-white/80 transition-all duration-300"
                        >
                          {expanded[idx] ? "Collapse" : "Show All"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto max-h-80 overflow-y-auto">
                    <table className="table-auto border-collapse w-full text-center">
                      <thead>
                        <tr className="bg-purple-100 sticky top-0">
                          <th className="border border-purple-700 px-2 py-1">Time</th>
                          <th className="border border-purple-700 px-2 py-1">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(expanded[idx] ? day.results : day.results.slice(0, 10)).map((r, i) => {
                          const origIndex = day.results.indexOf(r);
                          const li = latestIndex(day.results);
                          const latest = origIndex === li;
                          return (
                            <tr key={i} className={latest ? "bg-red-500 text-white" : ""}>
                              <td className={`border border-purple-700 px-2 py-1 font-bold ${latest ? "text-white" : ""}`}>{to12Hour(r.result_time)}</td>
                              <td className={`border border-purple-700 px-2 py-1 font-black text-xl ${latest ? "text-white" : "text-black"}`}>{r.result}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
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

export default CmmStarGoldPanelChart;

function to12Hour(t?: string): string {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hh = Number(h);
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const displayHour = hh % 12 === 0 ? 12 : hh % 12;
  return `${String(displayHour).padStart(2, '0')}:${m} ${suffix}`;
}

function normalizePanel(raw: any): { date: string; results: { result_time: string; result: string }[] }[] {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : (raw?.items ?? []);
  return arr.map((d: any) => ({
    date: d.date,
    results: (d.results ?? []).slice().sort((a: any, b: any) => (a.result_time ?? '').localeCompare(b.result_time ?? '')),
  }));
}

function formatDate(s?: string): string {
  if (!s) return '';
  if (s.includes('/')) return s;
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function latestIndex(arr: { result_time: string; result: string }[]): number {
  const rev = arr.slice().reverse().find((r) => r.result && r.result !== "--");
  const idx = arr.map((r) => r.result).lastIndexOf(rev?.result);
  return idx < 0 ? arr.length - 1 : idx;
}
