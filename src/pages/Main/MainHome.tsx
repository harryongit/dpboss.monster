import { useState } from 'react';
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
import SpecialGameZone from './HomeSections/SpecialGameZone';
import TodayResultSection from './HomeSections/TodayResultSection';
import RajeshreeStarLine from './HomeSections/RajeshreeStarLine';
import KalyanStarLine from './HomeSections/KalyanStarLine';
import MainBombayStarLine from './HomeSections/MainBombayStarLine';

const SattaMatkaWebsite = () => {
  const [refreshTime, setRefreshTime] = useState(new Date().toLocaleTimeString());

  const handleRefresh = () => {
    setRefreshTime(new Date().toLocaleTimeString());
  };

  const finalAnk = [
    { market: "KALYAN MORNING", ank: "0" },
    { market: "MILAN MORNING", ank: "2" },
    { market: "SRIDEVI", ank: "0" },
    { market: "MAIN BAZAR MORNING", ank: "6" },
    { market: "MADHURI", ank: "6" },
    { market: "TIME BAZAR", ank: "6" },
    { market: "MILAN DAY", ank: "0" },
    { market: "KALYAN", ank: "6" },
    { market: "SRIDEVI NIGHT", ank: "4" },
    { market: "MILAN NIGHT", ank: "2" },
    { market: "RAJDHANI NIGHT", ank: "8" },
    { market: "MAIN BAZAR", ank: "8" },
  ];

  const liveMarkets = [
    { name: "MAIN SRIDEVI DAY", result: "234-96-123", time: "01:05 PM - 02:05 PM", status: "Open" },
    { name: "NEW TIME BAZAR", result: "347-40-190", time: "01:00 PM - 02:00 PM", status: "Open" },
    { name: "RAJDHANI MORNING", result: "157-33-670", time: "11:25 AM - 12:55 PM", status: "Closed" },
    { name: "BOMBAY RAJSHREE DAY", result: "590-4", time: "01:15 PM - 03:15 PM", status: "Open" },
  ];

  const allMarkets = [
    { name: "KALYAN MORNING", result: "359-7", time: "11:15 AM - 12:15 PM" },
    { name: "MILAN MORNING", result: "137-15-456", time: "10:30 AM - 11:30 AM" },
    { name: "SRIDEVI", result: "579-14-347", time: "11:35 AM - 12:35 PM" },
    { name: "MAIN BAZAR MORNING ", result: "669-17-160", time: "11:15 AM - 12:15 PM" },
    { name: "MADHURI", result: "359-71-588", time: "11:45 AM - 12:45 PM" },
    { name: "PADMAVATHI", result: "128-19-144", time: "11:40 AM - 12:40 PM" },
    { name: "RAJDHANI MORNING", result: "157-33-670", time: "11:25 AM - 12:55 PM" },
    { name: "SRIDEVI MORNING", result: "118-00-127", time: "10:00 AM - 11:00 AM" },
    { name: "MAHARANI", result: "260-8", time: "12:15 PM - 02:15 PM" },
  
   
  ];
  const keywords = [
    "KALYAN MATKA",
    "MATKA RESULT",
    "KALYAN MATKA TIPS",
    "SATTA MATKA",
    "MATKA.COM",
    "SMBoss MATKA 143",
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
          
          <WeeklyPattiChart weeklyPatti={weeklyPatti} />
          <WeeklyLineChart weeklyLineData={weeklyLineData} />
          <WeeklyJodiChart />
          
         <FreeGameZone  freeGames={freeGames} />
         {/* <RajeshreeStarLine />
         <KalyanStarLine/>
         <MainBombayStarLine/> */}
         
         <TodayResultSection />
          <SpecialGameZone /> 
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