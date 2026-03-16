import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
    const hex =
      palette[trimmed] ??
      palette[
        trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
      ];
    return hex;
  };

  return (
    <Card className="border-2 border-red-500 shadow-lg bg-[#f7c89b]">
      {/* Header */}
      <CardHeader className="bg-pink-600 text-white py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-center text-lg font-bold flex-1">
            WORLD ME SABSE FAST SATTA MATKA RESULT
          </CardTitle>

          <Button
            size="sm"
            onClick={handleRefresh}
            className="bg-white/20 hover:bg-white/30 text-white border border-white rounded"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div>
          {(!allMarkets || allMarkets.length === 0) && (
            <div className="text-center text-red-700 font-semibold p-3">
              No markets available right now.
            </div>
          )}

          {allMarkets &&
            allMarkets.length > 0 &&
            allMarkets.map((market, idx) => {
              const middleIndex = Math.floor(allMarkets.length / 2);

              const normalized = normalizeColor(market.color);
              const isWhite = normalized?.toLowerCase() === "#ffffff";
              const bg = isWhite
                ? undefined
                : normalized || (idx === 0 ? "#fff200" : undefined);

              return (
                <React.Fragment key={idx}>
                  {idx === middleIndex && (
                    <div className="bg-yellow-200 border-y-2 border-red-500 text-center py-2">
                      <span className="text-sm font-black italic text-black uppercase">
                        ADD YOUR GAME :
                      </span>

                      <a
                        href="mailto:support@spdpboss.net"
                        className="ml-2 bg-orange-500 text-black px-3 py-0.5 rounded-full text-sm font-black border border-orange-600"
                      >
                        support@spdpboss.net
                      </a>
                    </div>
                  )}

                  <div
                    className={`border-b border-red-500 px-2 py-3 ${
                      !bg ? 'bg-peach' : ''
                    }`}
                    style={bg ? { backgroundColor: bg } : undefined}
                  >
                    {/* Market Name */}
                    <div className="text-center">
                      <p className="text-blue-900 font-extrabold text-xl tracking-wide">
                        {market.name}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="text-center">
                      <p className="text-purple-800 font-extrabold text-2xl">
                        {market.result}
                      </p>

                      {(market.captionFlag ?? 0) === 1 && (
                        <p className="mt-1 text-xs font-semibold text-red-700">
                          {market.result?.toLowerCase() === 'loading'
                            ? 'खबर लाइन चालू है'
                            : 'सबसे तेज सबसे सही'}
                        </p>
                      )}
                    </div>

                    {/* Jodi - Time - Panel */}
                    <div className="flex items-center justify-between mt-1">
                      {/* Jodi */}
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/jodi-records-chart/${encodeURIComponent(
                              market.name
                            )}`,
                            { state: { marketId: market.id } }
                          )
                        }
                        className="bg-purple-700 hover:bg-purple-800 text-white text-xs px-3 py-0 rounded"
                      >
                        Jodi
                      </Button>

                      {/* Time */}
                      <p className="text-black text-xs font-semibold flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {market.time}
                      </p>

                      {/* Panel */}
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/panel-records-chart/${encodeURIComponent(
                              market.name
                            )}`,
                            { state: { marketId: market.id } }
                          )
                        }
                        className="bg-purple-700 hover:bg-purple-800 text-white text-xs px-3 py-0 rounded"
                      >
                        Panel
                      </Button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllMarkets;