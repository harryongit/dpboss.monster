"use client";

import React, { useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import HeaderLogo from '@/views/Main/HomeSections/HeaderLogo';
import WelcomeBanner from '@/views/Main/HomeSections/WelcomeBanner';
import WhoWeAre from '@/views/Main/HomeSections/WhoWeAre';
import LuckyNumberCard from '@/views/Main/HomeSections/LuckyNumberCard';

import LiveResults from '@/views/Main/HomeSections/LiveResults';
import AllMarkets from '@/views/Main/HomeSections/AllMarkets';
import NoticeSection from '@/views/Main/HomeSections/NoticeSection';
import WhatsAppSection from '@/views/Main/HomeSections/WhatsAppSection';

import KeywordsCard from '@/views/Main/HomeSections/KeywordsCard';
import WeeklyPattiChart from '@/views/Main/HomeSections/WeeklyPattiChart';
import WeeklyLineChart from '@/views/Main/HomeSections/WeeklyLineChart';
import WeeklyJodiChart from '@/views/Main/HomeSections/WeeklyJodiChart';
import FreeGameZone from '@/views/Main/HomeSections/FreeGameZone';
import IntroductionSection from '@/views/Main/HomeSections/IntroductionSection';

import FooterSection from '@/views/Main/HomeSections/FooterSection';

import JodiChartSection from './HomeSections/JodiChartSection';
import PanelChartSection from './HomeSections/PanelChartSection';
import MainBazaarChart from './HomeSections/MainBazaarChart';
import SpecialGameZone from './HomeSections/specialgamezone/SpecialGameZone';
import MatkaJodiList from './HomeSections/matkajodilist/MatkaJodiListSection';
import FreeGuessingDaily from './HomeSections/FreeGuessingDaily';
import MainStarLineSection from './HomeSections/MainStarLineSection';
import RajeshreeStarLine from './HomeSections/RajeshreeStarLine';
import KalyanStarLine from './HomeSections/KalyanStarLine';
import Kalyan36bazarStarLine from './HomeSections/Kalyan36bazarStarLine';
import { useMainWebsite } from '@/hooks/main/useMainWebsite';

const SattaMatkaWebsite = () => {
  const { data, refetch } = useMainWebsite();

  const [refreshTime, setRefreshTime] = React.useState("");
  React.useEffect(() => {
    setRefreshTime(data?.data?.updated_time ?? new Date().toLocaleTimeString());
  }, [data?.data?.updated_time]);

  const handleRefresh = async () => {
    await refetch();
    window.location.reload();
  };

  const liveMarkets = useMemo(() => {
    const items = data?.data?.live_markets ?? [];
    return items.map((m) => ({ name: m.market_name, result: m.result, time: '', status: 'Live', captionFlag: m.market_caption_flag ?? 0 }));
  }, [data?.data?.live_markets]);

  const allMarkets = useMemo(() => {
    const items = data?.data?.all_markets ?? [];
    return items.map((m) => ({ id: m.market_id, name: m.market_name, result: m.result ?? 'loading', time: `${m.open_time ?? ''} - ${m.close_time ?? ''}`, color: m.color, captionFlag: m.market_caption_flag ?? 0 }));
  }, [data?.data?.all_markets]);

  const finalAnk = useMemo(() => {
    const items = data?.data?.final_ank ?? [];
    return items.map((m) => ({ market: m.market_name, ank: m.ank ?? '-' }));
  }, [data?.data?.final_ank]);

  const keywords = [
    "KALYAN MATKA",
    "MATKA RESULT",
    "KALYAN MATKA TIPS",
    "SATTA MATKA",
    "MATKA.COM",
    "DPBoss MATKA 143",
    "MAIN MATKA",
    "WORLD ME SABSE FAST SATTA MATKA RESULT",
  ];

  return (
    <main className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="px-2 space-y-1">
          <WelcomeBanner />
          <WhoWeAre />
          <LuckyNumberCard />
          <LiveResults liveMarkets={liveMarkets} refreshTime={refreshTime} handleRefresh={handleRefresh} />
          {/* <WhatsAppSection /> */}
          {/* <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <a
              href="/dpboss-resultapp.apk"
              download
              className="relative flex items-center justify-between bg-white border-2 border-red-500 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <div className="flex flex-col">
                <span className="text-sm font-black text-red-600 animate-pulse">
                  🔥 DPBoss Official App 🔥
                </span>
                <span className="text-[10px] font-bold text-gray-600">
                  DPBoss Ka Bharosa - Fast Result
                </span>
              </div>
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg font-black text-xs shadow-md flex items-center gap-2">
                Download Now
              </div>
            </a>
          </div> */}

          <NoticeSection />

          <KeywordsCard />
          <AllMarkets allMarkets={allMarkets} handleRefresh={handleRefresh} />

          <div className="bg-peach border-2 border-rose-400 rounded-lg p-2 flex items-center justify-center gap-2 shadow-sm">
            <span className="text-sm font-black italic text-black">Email for any inquiries Or Support:</span>
            <a
              href="mailto:support@dpboss.monster"
              className="bg-orange-500 text-black px-3 py-0.5 rounded-full text-sm font-black border border-orange-600 shadow-sm"
            >
              support@dpboss.monster
            </a>
          </div>

          <MainStarLineSection />
          {/* <Kalyan36bazarStarLine /> */}
          <SpecialGameZone />
          <MatkaJodiList />
          <WeeklyPattiChart />
          <WeeklyLineChart />
          <WeeklyJodiChart />
          <FreeGuessingDaily />
          <FreeGameZone />
          {/* <RajeshreeStarLine />
          <KalyanStarLine /> */}

          <JodiChartSection />
          <PanelChartSection />

          <IntroductionSection />

          <FooterSection />
        </div>
      </div>

      <button
        onClick={handleRefresh}
        className=" satta-btn-purple text-[14px] fixed bottom-12 right-6 z-50 flex items-center gap-2 group active:scale-95 transition-all duration-200 animate-bounce-subtle"
        style={{
          background: 'linear-gradient(135deg, #000080 0%, #0047ab 100%)',
          border: '2px solid #ffffff',
          borderRadius: '12px',
          padding: '12px 24px',
          color: '#ffffff',
          fontWeight: '900',
          fontSize: '20px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
          letterSpacing: '1.5px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          cursor: 'pointer'
        }}
      >
        REFRESH
      </button>
    </main>
  );
};

export default SattaMatkaWebsite;
