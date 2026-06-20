import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useNavigate, useLocation } from '@/lib/router-compat';

type Market = {
  id?: number;
  name: string;
  result: string;
  time: string;
  color?: string;
  captionFlag?: number;
};

const AllMarkets = ({
  allMarkets,
  handleRefresh,
}: {
  allMarkets: Market[];
  handleRefresh: () => void;
}) => {
  const navigate = useNavigate();
  const { state } = useLocation();

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
    const hex =
      palette[trimmed] ??
      palette[
      trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
      ];
    return hex;
  };


  return (
    <div className="flex flex-col">
      <div className="satta-header-pink">
        <h2 className="text-center text-white text-[16px] font-black uppercase m-0 leading-tight">
          WORLD ME SABSE FAST SATTA MATKA RESULT
        </h2>
      </div>

      <Card className="satta-card-outset bg-[#fc9] p-0 overflow-hidden">
        <CardContent className="p-0">
          {(!allMarkets || allMarkets.length === 0) && (
            <div className="text-center text-red-700 font-semibold p-3">
              No markets available right now.
            </div>
          )}

          {allMarkets?.map((market, idx) => {
            // const middleIndex = Math.floor(allMarkets.length / 2);

            const normalized = normalizeColor(market.color);
            const isWhite = normalized?.toLowerCase() === '#ffffff';

            const bg = isWhite
              ? undefined
              : normalized || (idx === 0 ? '#fff200' : '#f7c89b');

            return (
              <React.Fragment key={idx}>
                {/* MID BANNER
                {idx === middleIndex && (
                  <div className="bg-yellow-200 border-y-[1px] border-red-600 text-center py-[3px]">
                    <span className="text-[10px] font-black italic uppercase">
                      ADD YOUR GAME :
                    </span>
                    <span className="ml-1 bg-orange-500 px-2 py-[1px] rounded-full text-[10px] font-black border border-orange-700">
                      support@dpboss.monster
                    </span>
                  </div>
                )} */}

                {/* ROW */}
                <div
                  className="relative border-b-[1px] border-red-600 py-2 px-1 text-center"
                  style={bg ? { backgroundColor: bg } : undefined}
                >
                  {/* LEFT JODI */}
                  <div className="absolute left-1 top-1/2 -translate-y-1/2">
                    <button
                      onClick={() =>
                        navigate(
                          `/jodi-records-chart/${encodeURIComponent(
                            market.name
                          )}`,
                          { state: { marketId: market.id } }
                        )
                      }
                      className="satta-btn-purple !text-[10px] !px-2 !py-[2px]"
                    >
                      Jodi
                    </button>
                  </div>

                  {/* RIGHT PANEL */}
                  <div className="absolute right-1 top-1/2 -translate-y-1/2">
                    <button
                      onClick={() =>
                        navigate(
                          `/panel-records-chart/${encodeURIComponent(
                            market.name
                          )}`,
                          { state: { marketId: market.id } }
                        )
                      }
                      className="satta-btn-purple !text-[10px] !px-2 !py-[2px]"
                    >
                      Panel
                    </button>
                  </div>

                  {/* CENTER CONTENT */}
                  <h4 className="satta-market-name text-[22px] uppercase leading-tight m-0">
                    {market.name}
                  </h4>

                  <span className="satta-result-gradient block">
                    {market.result}
                  </span>

                  {(market.captionFlag ?? 0) === 1 && (
                    <p className="satta-caption !text-[15px] m-0">
                      {market.result?.toLowerCase() === 'loading'
                        ? 'खबर लाइन चालू है'
                        : 'सबसे तेज सबसे सही'}
                    </p>
                  )}

                  <p className="satta-time-p m-0 flex justify-center items-center gap-1">

                    {market.time}
                  </p>
                </div>
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};


export default AllMarkets;