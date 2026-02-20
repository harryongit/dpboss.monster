import { useMemo } from 'react';
import HeaderLogo from '@/pages/Main/HomeSections/HeaderLogo';
import WelcomeBanner from '@/pages/Main/HomeSections/WelcomeBanner';
import LuckyNumberCard from '@/pages/Main/HomeSections/LuckyNumberCard';
import FinalAnkSection from '@/pages/Main/HomeSections/FinalAnkSection';
import LiveResults from '@/pages/Main/HomeSections/LiveResults';
import AllMarkets from '@/pages/Main/HomeSections/AllMarkets';
import HindiInfo from '@/pages/Main/HomeSections/HindiInfo';
import NoticeSection from '@/pages/Main/HomeSections/NoticeSection';

import KeywordsCard from '@/pages/Main/HomeSections/KeywordsCard';
import WeeklyPattiChart from '@/pages/Main/HomeSections/WeeklyPattiChart';
import WeeklyLineChart from '@/pages/Main/HomeSections/WeeklyLineChart';
import WeeklyJodiChart from '@/pages/Main/HomeSections/WeeklyJodiChart';
import FreeGameZone from '@/pages/Main/HomeSections/FreeGameZone';
import IntroductionSection from '@/pages/Main/HomeSections/IntroductionSection';
import FAQSection from '@/pages/Main/HomeSections/FAQSection';
import HindiFAQ from '@/pages/Main/HomeSections/HindiFAQ';
import FooterSection from '@/pages/Main/HomeSections/FooterSection';
import FloatingRefreshButton from '@/pages/Main/HomeSections/FloatingRefreshButton';
import JodiChartSection from './HomeSections/JodiChartSection';
import PanelChartSection from './HomeSections/PanelChartSection';
import MainBazaarChart from './HomeSections/MainBazaarChart';
import SpecialGameZone from './HomeSections/specialgamezone/SpecialGameZone';
import MatkaJodiList from './HomeSections/matkajodilist/MatkaJodiListSection';
import FreeGuessingDaily from './HomeSections/FreeGuessingDaily';
import CMMStarGoldSection from './HomeSections/CMMStarGoldSection';
import RajeshreeStarLine from './HomeSections/RajeshreeStarLine';
import KalyanStarLine from './HomeSections/KalyanStarLine';
import MainBombayStarLine from './HomeSections/MainBombayStarLine';
import { useMainWebsite } from '@/hooks/main/useMainWebsite';

const SattaMatkaWebsite = () => {
  const { data, refetch } = useMainWebsite();

  const refreshTime = useMemo(() => data?.data?.updated_time ?? new Date().toLocaleTimeString(), [data?.data?.updated_time]);

  const handleRefresh = async () => {
    await refetch();
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
    "SPDPBoss MATKA 143",
    "MAIN MATKA",
    "WORLD ME SABSE FAST SATTA MATKA RESULT",
  ];
  const weeklyPatti = [
    { number: "1", values: "137-489-560-146" },
    { number: "2", values: "156-679-570-138" },
    { number: "3", values: "670-139-148-355" },
    { number: "4", values: "257-149-699-455" },
    { number: "5", values: "357-113-258-140" },
    { number: "6", values: "367-169-556-259" },
    { number: "7", values: "368-458-890-133" },
    { number: "8", values: "378-134-567-125" },
    { number: "9", values: "478-559-469-126" },
    { number: "0", values: "578-136-550-145" },
  ];
  const freeGames = [
    {
      name: "MILAN MORNING",
      number: "1-6-3-8",
      boldNumbers: "470-358-346-468-558",
      smallNumbers: "13-18-63-68-31-36-81-86",
    },
    {
      name: "KALYAN MORNING",
      number: "4-9-1-6",
      boldNumbers: "257-270-227-114-367-257",
      smallNumbers: "41-46-91-96-14-19-64-69",
    },
    {
      name: "PUNA BAZAR",
      number: "1-5-9",
      boldNumbers: "128-245-159-258-135-289",
      smallNumbers: "13-18-53-58-93-98",
    },
    {
      name: "SRIDEVI NIGHT",
      number: "2-3-8-0",
      boldNumbers: "129-148-134-370",
      smallNumbers: "22-27-33-38-88-83-00-05",
    },
  ];
  const weeklyLineData = [
    { day: "Mon.", number: "1-6-2-7", span: 1 },
    { day: "Tue.", number: "4-9-5-0", span: 1 },
    { day: "Wed.", number: "2-7-3-8", span: 1 },
    { day: "Thu.", number: "1-6-5-0", span: 1 },
    { day: "Fri.", number: "3-8-4-9", span: 1 },
    { day: "Sat.", number: "4-9-5-0", span: 1 },
    { day: "Sun.", number: "1-6-3-8", span: 2 }, // col-span-2
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-rose-50">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <WelcomeBanner />
          <LuckyNumberCard />
          <LiveResults liveMarkets={liveMarkets} refreshTime={refreshTime} handleRefresh={handleRefresh} />
          <NoticeSection />
        
          <KeywordsCard />
          <AllMarkets allMarkets={allMarkets} handleRefresh={handleRefresh} />
          <HindiInfo />
           <CMMStarGoldSection />
          <WeeklyPattiChart weeklyPatti={weeklyPatti} />
          <WeeklyLineChart weeklyLineData={weeklyLineData} />
          <WeeklyJodiChart />
          
         <FreeGameZone  freeGames={freeGames} />
         {/* <RajeshreeStarLine />
         <KalyanStarLine/>
         <MainBombayStarLine/> */}
         
        
          <SpecialGameZone /> 
          <MatkaJodiList />
          <FreeGuessingDaily />
<JodiChartSection/>
<PanelChartSection/>

          <FinalAnkSection finalAnk={finalAnk}  />
          {/* <IntroductionSection /> */}
          <FAQSection />
          {/* <HindiFAQ /> */}
          <FooterSection />
        </div>

        <FloatingRefreshButton handleRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default SattaMatkaWebsite;
