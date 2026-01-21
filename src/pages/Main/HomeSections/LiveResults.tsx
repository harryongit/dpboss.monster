import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';

type LiveMarket = { name: string; result: string; time: string; status: string };

const LiveResults = ({ liveMarkets, refreshTime, handleRefresh }: { liveMarkets: LiveMarket[]; refreshTime: string; handleRefresh: () => void }) => {
  return (
    <Card className="bg-white border-3 border-rose-500 shadow-xl">
    <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 text-white py-3">
      <div className="flex justify-between items-center">
        
        <div className="flex-1 text-center">
          <CardTitle className="text-lg font-black tracking-wide flex items-center justify-center gap-2 mb-1">
            💥 LIVE RESULT 💥
          </CardTitle>
  
          <p className="text-xs font-semibold flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            Updated: {refreshTime}
          </p>
        </div>
  
        <Button 
          size="sm" 
          onClick={handleRefresh}
          className="bg-white/20 hover:bg-white/30 text-white border border-white/50 rounded-lg"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
  
    {/* ⭐ Proper Display of Message */}
    <p className="text-center text-rose-700 font-bold text-md py-2 bg-rose-50 border-b border-rose-200">
      ⭐ Sabse Tezz Live Update Yahi Milega ⭐
    </p>
    <CardContent className="p-2 space-y-2">
  {(!liveMarkets || liveMarkets.length === 0) && (
    <div className="text-center text-rose-700 font-semibold bg-rose-50 border border-rose-200 rounded-md p-2">
      No live markets available at the moment.
    </div>
  )}
  {liveMarkets && liveMarkets.length > 0 && liveMarkets.map((market, idx) => (
    <div
      key={idx}
      className="bg-gradient-to-br from-white via-rose-50 to-orange-50 p-2 rounded-xl border border-rose-300 shadow-sm relative overflow-hidden group hover:shadow-md transition-all text-center"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />

      {/* Market Name + Refresh Button */}
      <div className="flex justify-center items-center gap-2 relative z-10 mb-1">
        <h3 className="font-bold text-rose-800 text-lg truncate">{market.name}</h3>
        <Button
          size="sm"
          onClick={handleRefresh}
          className="relative overflow-hidden h-6 w-6 flex items-center justify-center rounded-full text-white shadow 
                     bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500
                     bg-[length:200%_200%] animate-[gradientShift_3s_ease_infinite]"
        >
          <RefreshCw className="h-3 w-3 relative z-10" />
        </Button>
      </div>

      {/* Market Result */}
      <div className="bg-white/80 rounded-lg p-2 shadow-inner relative z-10">
        <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-orange-600 text-center tracking-wide">
          {market.result}
        </p>
      </div>
    </div>
  ))}
</CardContent>


  </Card>
  
  );
};

export default LiveResults;
