import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw } from "lucide-react";

type LiveMarket = { name: string; result: string; time: string; status: string; captionFlag?: number };

const LiveResults = ({ liveMarkets, refreshTime, handleRefresh }: { liveMarkets: LiveMarket[]; refreshTime: string; handleRefresh: () => void }) => {
  return (
    <Card className="border-2 border-red-500 bg-peach shadow-none rounded-md overflow-hidden">

      {/* Header */}
      <CardHeader className="bg-pink text-white text-center py-2 rounded-b-2xl">
        <div className="flex justify-between items-center">

          <div className="flex-1 text-center">
            <CardTitle className="text-xl font-bold italic tracking-wide">
              ☔ LIVE RESULT ☔
            </CardTitle>

            <p className="text-xs font-semibold flex items-center justify-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Updated: {refreshTime}
            </p>
          </div>

          <Button
            size="sm"
            onClick={handleRefresh}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/50 rounded-md px-2 py-1"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Message */}
      <p className="text-center font-bold text-black text-sm py-2 border-b border-red-400">
        Sabse Tezz Live Result Yahi Milega
      </p>

      {/* Market List */}
      <CardContent className="p-0">
        {(!liveMarkets || liveMarkets.length === 0) && (
          <div className="text-center text-red-700 font-semibold border border-red-200 m-2 rounded-md p-2">
            No live markets available at the moment.
          </div>
        )}

        {liveMarkets && liveMarkets.length > 0 && liveMarkets.map((market, idx) => (
          <div
            key={idx}
            className="text-center py-3 border-b border-red-400"
          >
            {/* Market Name */}
            <h3 className="text-blue-900 font-extrabold text-xl italic tracking-wide">
              {market.name}
            </h3>

            {/* Result */}
            <p className="text-purple-800 font-extrabold text-xl mt-1">
              {market.result}
            </p>

            {(market.captionFlag ?? 0) === 1 && (
              <p className="mt-1 text-sm font-semibold text-red-700">
                {market.result?.toLowerCase() === "loading"
                  ? "खबर लाइन चालू है"
                  : "सबसे तेज सबसे सही"}
              </p>
            )}

            {/* Refresh Button */}
            <Button
              size="sm"
              onClick={handleRefresh}
              className="mt-2 bg-purple-700 hover:bg-purple-800 text-white text-xs px-3 py-1 rounded-md"
            >
              Refresh
            </Button>
          </div>
        ))}
      </CardContent>

    </Card>
  );
};

export default LiveResults;