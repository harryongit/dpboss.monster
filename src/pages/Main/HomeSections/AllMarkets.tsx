import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';


type Market = { name: string; result: string; time: string };

const AllMarkets = ({ allMarkets, handleRefresh }: { allMarkets: Market[]; handleRefresh: () => void }) => {
  const navigate = useNavigate();
const { state } = useLocation();
const marketName = state?.marketName;
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
          {allMarkets.map((market, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 px-3 py-1 rounded-lg border-2 border-orange-200 hover:border-rose-400 transition-all active:scale-[0.98]"
            >
              {/* Market Name */}
              <div className="mb-1 text-center">
                <p className="font-extrabold text-rose-800 text-xl tracking-wide">
                  {market.name}
                </p>
              </div>

              {/* Result */}
              <div className="bg-white/70 rounded-md p-1 mb-1">
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
    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-1.5 py-0.5 rounded text-[12px] font-bold shadow hover:scale-105 transition-transform duration-200 min-h-0 h-6 leading-none"
  >
    Panel
  </Button>

</div>




            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllMarkets;
