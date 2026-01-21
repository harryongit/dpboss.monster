import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

type FinalAnkItem = { market: string; ank: string };

const FinalAnkSection = ({
  finalAnk = [
    { market: "SRIDEVI", ank: "2" },
    { market: "MUMBAI DAY", ank: "123" },
    { market: "MILAN DAY", ank: "456" },
    { market: "KALYAN", ank: "789" },
  ],
}: {
  finalAnk?: FinalAnkItem[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: number;
    let isPaused = false;

    const startScroll = () => {
      scrollInterval = window.setInterval(() => {
        if (!isPaused && scrollContainer) {
          scrollContainer.scrollTop += 1;

          // Reset to top when reaching the bottom
          if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
            scrollContainer.scrollTop = 0;
          }
        }
      }, 50);
    };

    startScroll();

    scrollContainer.addEventListener('mouseenter', () => { isPaused = true; });
    scrollContainer.addEventListener('mouseleave', () => { isPaused = false; });

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-0 shadow-2xl relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-40 h-40 bg-rose-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <CardHeader className="relative bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white py-3">
        <CardTitle className="text-center text-lg font-black tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 animate-pulse text-yellow-300" />
         Final Ank
          <Sparkles className="h-5 w-5 animate-pulse text-yellow-300" />
        </CardTitle>
      </CardHeader>

      {/* Vertical scrolling list */}
      <CardContent
        ref={scrollRef}
        className="h-64 overflow-y-auto no-scrollbar space-y-2 relative z-10 p-4"
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {(!finalAnk || finalAnk.length === 0) && (
          <div className="text-center text-amber-700 font-semibold bg-amber-50 border border-amber-200 rounded-md p-2">
            Final Ank not available.
          </div>
        )}
        {finalAnk && finalAnk.length > 0 && finalAnk.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white/90 p-3 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-orange-200"
          >
            <p className="text-sm font-semibold text-rose-700 truncate">{item.market}</p>
            <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500">
              {item.ank}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FinalAnkSection;
