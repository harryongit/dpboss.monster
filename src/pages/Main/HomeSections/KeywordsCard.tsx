import React from 'react';
import { Card, CardContent } from '@/components/ui/card';



const KeywordsCard = ({ keywords }: { keywords: string[] }) => {
  return (
    <Card className="bg-white border-2 border-gray-300 shadow-sm rounded-xl mt-3">
      <CardContent className="py-3 text-center">
        <p className="text-xs text-gray-700 leading-relaxed font-medium">
          {keywords.join(' | ')}
        </p>
      </CardContent>
    </Card>
  );
};

const SMBossInfoSection = () => {
  const keywords = [
    'SATTA MATKA', 'SMBoss SATTA MATKA', 'MATKA RESULT', 'KALYAN MATKA TIPS',
    'SATTA MATKA', 'MATKA.COM', 'MATKA PANA JODI TODAY', 'BATTA SATKA',
    'MATKA PATTI JODI NUMBER', 'MATKA RESULTS', 'MATKA CHART', 'MATKA JODI',
    'SATTA COM', 'SMBoss SMBOSS', 'MATKA GAME', 'MATKA WAPKA', 'SMBoss TOP NO1',
    'MATKA RESULT', 'KALYAN MATKA RESULT', 'SMBoss MATKA 143'
  ];

  return (
    <div className="space-y-3">
      
      <KeywordsCard keywords={keywords} />
    </div>
  );
};

export default SMBossInfoSection;
