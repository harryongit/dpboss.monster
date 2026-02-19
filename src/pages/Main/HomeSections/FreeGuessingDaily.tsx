import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyGuessingFreeFix } from "@/hooks/common/useDailyGuessingFreeFix";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const FreeGuessingDaily = () => {
  const query = useDailyGuessingFreeFix();
  const items = query.data?.data?.items ?? [];
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const dateStr = `${dd}/${mm}/${yyyy}`;

  return (
    <Card className="bg-white border-2 border-rose-400 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center text-lg font-black tracking-wide flex-1">
            ✓DATE: {dateStr} • FREE GUESSING DAILY
          </CardTitle>
          <Button
            size="sm"
            onClick={() => { void query.refetch(); }}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/50 rounded-lg"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs font-semibold opacity-90">OPEN TO CLOSE FIX ANK</div>
      </CardHeader>
      <CardContent className="p-3">
        {query.isFetching && (
          <div className="text-center text-rose-700 font-semibold bg-rose-50 border border-rose-200 rounded-md p-2">
            Loading...
          </div>
        )}
        {!query.isFetching && items.length === 0 && (
          <div className="text-center text-rose-700 font-semibold bg-rose-50 border border-rose-200 rounded-md p-2">
            No guessing available right now.
          </div>
        )}
        {!query.isFetching && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 border-green-700 bg-gradient-to-br from-green-600 to-green-700 text-white p-0 overflow-hidden"
              >
                <div className="px-3 py-2 font-extrabold text-sm tracking-wide flex items-center gap-2">
                  ↪ {it.market_name.toUpperCase()}
                </div>
                <div className="bg-white text-green-900 p-3 text-center font-bold">
                  <div className="text-base leading-7">{it.single}</div>
                  <div className="text-base leading-7">{it.panna}</div>
                  <div className="text-base leading-7">{it.jodi}</div>
                
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FreeGuessingDaily;
