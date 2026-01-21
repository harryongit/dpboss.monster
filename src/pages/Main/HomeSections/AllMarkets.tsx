import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';


type Market = { name: string; result: string; time: string; color?: string };

const AllMarkets = ({ allMarkets, handleRefresh }: { allMarkets: Market[]; handleRefresh: () => void }) => {
  const navigate = useNavigate();
const { state } = useLocation();
const marketName = state?.marketName;
  const palette: Record<string, string> = {
    Red: '#ff0000',
    Green: '#00ff00',
    Blue: '#0000ff',
    Yellow: '#ffff00',
    Orange: '#ff7f00',
    Pink: '#ffc0cb',
    Purple: '#800080',
    Black: '#000000',
    White: '#ffffff',
  };

  const normalizeColor = (c?: string) => {
    if (!c) return undefined;
    const trimmed = c.trim();
    if (trimmed.startsWith('#')) return trimmed;
    const hex = palette[trimmed] ?? palette[trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()];
    return hex;
  };

  return (
    <Card className="bg-white border-2 border-orange-400 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-rose-600 text-white py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center text-lg font-black tracking-wide flex-1">📊 ALL MARKETS</CardTitle>

          <Button
            size="sm"
            onClick={handleRefresh}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/50 rounded-lg"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-2">
        <div className="space-y-2">
          {(!allMarkets || allMarkets.length === 0) && (
            <div className="text-center text-orange-700 font-semibold bg-orange-50 border border-orange-200 rounded-md p-2">
              No markets available right now.
            </div>
          )}
          {allMarkets && allMarkets.length > 0 && allMarkets.map((market, idx) => {
            const bg = normalizeColor(market.color);
            const baseClass = "px-3 py-1 rounded-lg border-2 border-orange-200 hover:border-rose-400 transition-all active:scale-[0.98]";
            const gradientClass = "bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50";
            const cardClass = bg ? baseClass : `${gradientClass} ${baseClass}`;
            return (
            <div
              key={idx}
              className={cardClass}
              style={bg ? { backgroundColor: bg } : undefined}
            >
              {/* Market Name */}
              <div className="mb-1 text-center">
                <p className="font-extrabold text-rose-800 text-xl tracking-wide">
                  {market.name}
                </p>
              </div>

              {/* Result */}
              <div className={(bg ? "bg-transparent" : "bg-white/70") + " rounded-md p-1 mb-1"}>
                <p className="text-2xl text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-orange-600">
                  {market.result}
                </p>
              </div>

              {/* Left Jodi - Center Time - Right Panel */}
 <div className="flex items-center justify-between">

  {/* Jodi Left */}
<Button
  size="sm"
   onClick={() =>
    navigate(`/jodi-records-chart/${encodeURIComponent(market.name)}`)
  }
  className="
    bg-gradient-to-r from-pink-500 to-rose-500
    text-white
    px-1.5
    h-5
    rounded
    text-[11px]
    font-bold
    shadow
    leading-none
    hover:scale-105
    transition-transform
  "
>
  Jodi
</Button>


  {/* Time Center */}
  <p className="text-xs text-orange-600 font-semibold flex items-center gap-1 text-center">
    <Clock className="h-3 w-3" /> {market.time}
  </p>

  {/* Panel Right */}
  <Button
    size="sm"
    
     onClick={() =>
    navigate(`/panel-records-chart/${encodeURIComponent(market.name)}`)
  }
    className="  bg-gradient-to-r from-pink-500 to-rose-500
    text-white
    px-1.5
    h-5
    rounded
    text-[11px]
    font-bold
    shadow
    leading-none
    hover:scale-105
    transition-transform"
  >
    Panel
  </Button>

</div>




            </div>
          );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllMarkets;
