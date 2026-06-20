import React from "react";

const KeywordsCard = ({ keywords }: { keywords: string[] }) => {
  return (
    <div className="w-full mt-2">

      <div className="w-full border-2 border-red-600 rounded-lg  px-2 py-2 text-center">

        <p className="text-[14px] font-bold italic text-[#001a66] leading-[1.3] uppercase">
          {keywords.join(" | ")}
        </p>

      </div>

    </div>
  );
};

const DPBossInfoSection = () => {
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
    "DPBOSS MATKA 143",
    "MAIN MATKA",
  ];

  return <KeywordsCard keywords={keywords} />;
};

export default DPBossInfoSection;