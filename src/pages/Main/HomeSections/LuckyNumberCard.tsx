import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

type FinalAnkItem = { market: string; ank: string };

const LuckyNumberCard = ({
  goldenAnk = "2-7-0-5",
  finalAnk = [
    { market: "SRIDEVI", ank: "2" },
    { market: "MUMBAI DAY", ank: "3" },
    { market: "MILAN DAY", ank: "6" },
    { market: "KALYAN", ank: "8" },
    { market: "MADHURI", ank: "4" },
  ],
}: {
  goldenAnk?: string;
  finalAnk?: FinalAnkItem[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const scrollContainer = scrollRef.current;
  if (!scrollContainer) return;

  let interval: number;
  let isPaused = false;

  interval = window.setInterval(() => {
    if (!isPaused) {
      scrollContainer.scrollTop += 1;

      // reset when half of duplicated content is reached
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
        scrollContainer.scrollTop = 0;
      }
    }
  }, 30);

  const pause = () => (isPaused = true);
  const resume = () => (isPaused = false);

  scrollContainer.addEventListener("mouseenter", pause);
  scrollContainer.addEventListener("mouseleave", resume);

  return () => clearInterval(interval);
}, []);

  return (
    <Card className="max-w-md mx-auto border-2 border-red-500 rounded-lg overflow-hidden bg-[#f7cfa8] shadow-md">

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-center font-bold italic text-lg py-1 rounded-b-2xl">
        Today Lucky Number
      </div>

      {/* Content */}
      <CardContent className="p-2">
        <div className="grid grid-cols-2 items-start">

          {/* Golden Ank */}
          <div className="text-center border-r border-red-400 pr-2">
            <p className="text-blue-700 font-semibold italic text-sm">
              Golden Ank
            </p>

            <p className="text-2xl font-extrabold text-black tracking-widest mt-1">
              {goldenAnk}
            </p>
          </div>

          {/* Final Ank */}
          <div className="pl-2">
            <p className="text-blue-700 font-semibold italic text-sm text-center">
              Final Ank
            </p>

            <div
              ref={scrollRef}
              className="h-16 overflow-y-auto no-scrollbar text-xs font-bold text-blue-900 leading-tight mt-1"
            >
              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

             {[...finalAnk, ...finalAnk].map((item, idx) => (
  <div key={idx} className="text-center">
    {item.market} - {item.ank}
  </div>
))}
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default LuckyNumberCard;