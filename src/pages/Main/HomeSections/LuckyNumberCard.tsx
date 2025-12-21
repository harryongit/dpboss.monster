import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const LuckyNumberCard = () => {
  return (
    <Card className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 border-4 border-rose-600 shadow-2xl relative overflow-hidden max-w-sm mx-auto">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,200,100,0.4),transparent)] rounded-xl"></div>

      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 text-white py-2">
        <CardTitle className="text-center text-lg font-black tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 animate-spin-slow" />
          TODAY LUCKY NUMBER
          <Sparkles className="h-5 w-5 animate-spin-slow" />
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="py-4 text-center relative z-10">
        <p className="text-sm font-bold text-rose-700 mb-1 tracking-wide">Golden Ank</p>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 inline-block shadow-xl border border-amber-500">
          <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-orange-600 to-amber-600 tracking-widest">
            1-6-3-8
          </p>
        </div>
      </CardContent>

      {/* Animations */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
          }
        `}
      </style>
    </Card>
  );
};

export default LuckyNumberCard;
