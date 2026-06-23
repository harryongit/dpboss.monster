"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const MatkaFinalNumberChart = () => {
  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="border-2 border-sky-500 shadow-xl">
           <CardHeader className="bg-gradient-to-r from-sky-600 to-cyan-600 py-2">
             <CardTitle className="text-center text-white font-extrabold text-sm">
               सट्टा मटका फाइनल नंबर चार्ट का उपयोग कैसे करें
             </CardTitle>
           </CardHeader>
           <CardContent className="p-4 text-gray-800 leading-7 space-y-4 text-sm">
             <p className="text-center font-bold">MATKA FINAL NUMBER CHART</p>
             <p>कल (पिछले दिन) की जोड़ी जोड़ें। उदाहरण: कल की जोड़ी 88, जोड़ी का टोटल 16, इसका फाइनल नंबर 6।</p>
             <p>अंतिम अंक लें और नीचे दिए चार्ट को ध्यान से देखें। ये नंबर आप ओपन और क्लोज में खेल सकते हैं।</p>
             <p className="text-rose-600 font-semibold">NOTE: ये सिर्फ 80% सटीक फिक्स फार्मूला स्कीम है और सभी मार्केट के लिए है।</p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 0</div>
                 <div className="p-3 text-center font-semibold">2 - 3 - 5 - 9 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 1</div>
                 <div className="p-3 text-center font-semibold">4 - 5 - 7 - 9 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 2</div>
                 <div className="p-3 text-center font-semibold">0 - 2 - 6 - 8 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 3</div>
                 <div className="p-3 text-center font-semibold">0 - 1 - 8 - 9 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 4</div>
                 <div className="p-3 text-center font-semibold">1 - 3 - 6 - 7 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 5</div>
                 <div className="p-3 text-center font-semibold">2 - 4 - 6 - 7 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 6</div>
                 <div className="p-3 text-center font-semibold">0 - 3 - 6 - 8 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 7</div>
                 <div className="p-3 text-center font-semibold">1 - 2 - 4 - 7 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 8</div>
                 <div className="p-3 text-center font-semibold">2 - 5 - 6 - 8 (ओपन या क्लोज)</div>
               </div>
               <div className="rounded-lg border border-sky-300">
                 <div className="bg-sky-600 text-white px-3 py-2 font-bold text-sm text-center">फाइनल नंबर: 9</div>
                 <div className="p-3 text-center font-semibold">1 - 4 - 7 - 8 (ओपन या क्लोज)</div>
               </div>
             </div>

             <div className="space-y-2">
               <p className="font-semibold">English Guide</p>
               <p>Add the previous day’s pair. Example: 88 → total 16 → final number 6.</p>
               <p>Take the final digit and refer to the chart above. You can play these numbers open or close. Note: This is an 80% fixed formula scheme and applies to all markets.</p>
             </div>
           </CardContent>
         </Card>
        </div>

        <FooterSection />
      </div>

      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};

export default MatkaFinalNumberChart;

