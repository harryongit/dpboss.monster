import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Sparkles } from 'lucide-react';

const FloatingRefreshButton = ({ handleRefresh }: { handleRefresh: () => void }) => {
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 right-6 z-50">
      {/* Animated rings */}
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-xl transition-all duration-700 ${
            isPulsing ? 'scale-110 opacity-70' : 'scale-100 opacity-50'
          }`}
        />
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-lg transition-all duration-1000 ${
            isPulsing ? 'scale-125 opacity-50' : 'scale-105 opacity-30'
          }`}
        />
      </div>

   <Button
  onClick={handleRefresh}
  className="
    relative
    h-9
    px-4
    flex items-center gap-2
    rounded-full
    bg-gradient-to-br from-gray-900 via-slate-800 to-blue-600








    text-white
    shadow-2xl
    overflow-hidden
    border border-white/20
    backdrop-blur-sm
    transition-all duration-300
  "
>


        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Sparkles */}
        <Sparkles className="absolute top-1 right-2 h-2 w-2 text-yellow-300 animate-ping" />
        <Sparkles className="absolute bottom-1 left-3 h-2 w-2 text-cyan-300 animate-ping delay-300" />

        {/* Icon */}
        <RefreshCw className="h-6 w-6 animate-spin-slow flex-shrink-0" />

        {/* Text */}
        <span className="text-lg font-bold tracking-wide">
          Refresh
        </span>
      </Button>
    </div>
  );
};

export default FloatingRefreshButton;
