import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, RefreshCw } from "lucide-react";

type LiveMarket = { name: string; result: string; time: string; status: string; captionFlag?: number };


const LiveResults = ({ liveMarkets, refreshTime, handleRefresh }: { liveMarkets: LiveMarket[]; refreshTime: string; handleRefresh: () => void }) => {
  return (
    <Card className="satta-card-outset bg-[#fc9] p-0 overflow-hidden">
      {/* Header */}
      <CardHeader className="satta-header-pink p-0">
        <div className="py-1">
          <CardTitle className="text-[20px] font-bold italic tracking-wide m-0">
            ☔ LIVE RESULT ☔
          </CardTitle>
        </div>
      </CardHeader>

      {/* Message */}
      <p className="text-center font-bold text-black text-[14px] py-1 border-b border-red-600 satta-text-shadow">
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
            className="text-center py-2 border-b border-red-600 last:border-b-0"
          >
            {/* Market Name */}
            <h3 className="satta-market-name text-[22px]">
              {market.name}
            </h3>

            {/* Result */}
            <p className="satta-result-purple text-[21px] my-1">
              {market.result}
            </p>

            {/* Refresh Button */}
            <div className="my-1">
              <button
                onClick={handleRefresh}
                className="satta-btn-purple"
              >
                Refresh
              </button>
            </div>

            {(market.captionFlag ?? 0) === 1 && (
              <p className="satta-caption mt-1">
                {market.result?.toLowerCase() === "loading"
                  ? "खबर लाइन चालू है"
                  : "सबसे तेज सबसे सही"}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};


export default LiveResults;