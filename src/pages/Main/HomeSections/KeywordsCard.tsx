import React from "react";

const KeywordsCard = ({ keywords }: { keywords: string[] }) => {
  return (
    <div className="flex justify-center px-2 mt-2">

      <div className="w-full max-w-[400px] border-[2px] border-red-500 rounded-[15px] bg-[#f3c08c] p-3 text-center">

        <p className="text-[13px] font-bold italic text-[#001a66] leading-snug uppercase">
          {keywords.join(" | ")}
        </p>

      </div>

    </div>
  );
};

const RJBossInfoSection = () => {
  const keywords = [
    "KALYAN MATKA",
    "MATKA RESULT",
    "KALYAN MATKA TIPS",
    "SATTA MATKA",
    "MATKA.COM",
    "MATKA PANA JODI TODAY",
    "BATTA SATKA",
    "MATKA PATTI JODI NUMBER",
    "MATKA RESULTS",
    "MATKA CHART",
    "MATKA JODI",
    "SATTA COM",
    "FULL RATE GAME",
    "MATKA GAME",
    "MATKA WAPKA",
    "ALL MATKA RESULT LIVE ONLINE",
    "MATKA RESULT",
    "KALYAN MATKA RESULT",
    "RJBOSS MATKA 143",
    "MAIN MATKA",
  ];

  return <KeywordsCard keywords={keywords} />;
};

export default RJBossInfoSection;