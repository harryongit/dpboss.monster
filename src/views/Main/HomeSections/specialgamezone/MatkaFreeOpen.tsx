"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyGuessingFreeFix } from "@/hooks/common/useDailyGuessingFreeFix";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const MatkaFreeOpen = () => {
  const query = useDailyGuessingFreeFix();
  const items = query.data?.data?.items ?? [];
  const firstDate = items[0]?.date;
  const [headerDate, setHeaderDate] = React.useState("");
  React.useEffect(() => {
    setHeaderDate(firstDate ?? formatToday());
  }, [firstDate]);

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="border-2 border-rose-500 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-center text-white font-black tracking-wide text-sm flex-1">
                  ✓DATE: {headerDate} • FREE GUESSING DAILY
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => { void query.refetch(); }}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/50 rounded-lg"
                >
                  <RefreshCw className={`h-4 w-4 ${query.isFetching ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <div className="text-xs font-semibold text-white text-center mt-1">
                OPEN TO CLOSE FIX ANK
              </div>
            </CardHeader>

            <CardContent className="p-2 text-[12px]">
              {query.isFetching && (
                <div className="text-center text-rose-700 font-semibold bg-rose-50 border border-rose-200 rounded-md p-2">
                  Loading...
                </div>
              )}

              {query.isError && !query.isFetching && (
                <div className="text-center text-red-700 font-semibold bg-red-50 border border-red-200 rounded-md p-2">
                  Failed to load Daily Guessing Free Fix.
                </div>
              )}

              {!query.isFetching && !query.isError && items.length === 0 && (
                <div className="text-center text-rose-700 font-semibold bg-rose-50 border border-rose-200 rounded-md p-2">
                  No Free Fix Game available for today.
                </div>
              )}

              {!query.isFetching && !query.isError && items.length > 0 && (
                <div className="space-y-3">
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-green-600 rounded-lg overflow-hidden shadow-md"
                    >
                      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-3 py-2 font-extrabold text-xs tracking-wide text-center">
                        ↪ {it.market_name.toUpperCase()}
                      </div>

                      <div className="bg-white text-green-900 text-center py-3 font-bold space-y-1">
                        <div className="text-base tracking-widest">{it.single}</div>
                        <div className="text-base tracking-widest">{it.panna}</div>
                        <div className="text-base tracking-widest text-indigo-700">
                          {it.jodi}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

export default MatkaFreeOpen;

function formatToday(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
