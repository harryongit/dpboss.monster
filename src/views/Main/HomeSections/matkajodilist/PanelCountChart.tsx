"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const PanelCountChart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-violet-100">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-4 space-y-6">

          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-4">
              <CardTitle className="text-center text-white font-extrabold tracking-wide text-base">
                Panel Count Chart
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-8 text-sm text-gray-800 leading-7 font-semibold">

              {/* Explanation Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-inner border border-indigo-100 whitespace-pre-line">
{`पाना काउंट चार्ट पैनल काउंट चार्ट
पाने के तीनो अंको के जोड़ को पाना काउंट कहते हैं
जैसे 1+2+3=6
और अगर जोड़ 9 से ज्यादा आये 2 अंको में
जैसे 4+5+6=15 तो 15 को भी आपस में जोड़ देंगे
1+5=6 तो 6 इस पाने का पाना काउंट कहलायेगा
नोट - कॉउंट टोटल से अलग समीकरण है`}
              </div>

              {[
                {
                  title: "COUNT 0 :",
                  data: `00`,
                },
                {
                  title: "COUNT 1 :",
                  data: `118, 127, 136, 145, 190,
226, 235, 244, 280, 334,
370, 460, 550, 100, 777,
199, 289, 379, 388, 469,
478, 559, 568, 577, 667`,
                },
                {
                  title: "COUNT 2 :",
                  data: `299, 389, 479, 488, 569,
578, 668, 677, 119, 128,
137, 146, 155, 227, 236,
245, 290, 335, 344, 380,
470, 560, 110, 200, 444`,
                },
                {
                  title: "COUNT 3 :",
                  data: `399, 489, 579, 588, 669,
678, 129, 138, 147, 156,
228, 237, 246, 255, 336,
345, 390, 480, 570, 660,
120, 300, 111`,
                },
                {
                  title: "COUNT 4 :",
                  data: `499, 589, 679, 688, 778,
139, 148, 157, 166, 229,
238, 247, 256, 337, 346,
355, 445, 490, 580, 670,
112, 130, 220, 400, 888`,
                },
                {
                  title: "COUNT 5 :",
                  data: `599, 689, 779, 788, 149,
158, 167, 239, 248, 257,
266, 338, 347, 356, 446,
455, 590, 680, 770, 113,
122, 140, 230, 500, 555`,
                },
                {
                  title: "COUNT 6 :",
                  data: `699, 789, 159, 168, 177,
249, 258, 267, 339, 348,
357, 366, 447, 456, 690,
780, 114, 123, 150, 240,
330, 600, 222`,
                },
                {
                  title: "COUNT 7 :",
                  data: `799, 889, 169, 178, 259,
268, 277, 349, 358, 367,
448, 457, 466, 556, 790,
880, 115, 124, 133, 160,
223, 250, 340, 700, 999`,
                },
                {
                  title: "COUNT 8 :",
                  data: `899, 179, 188, 269, 278,
359, 368, 377, 449, 458,
467, 557, 566, 890, 116,
125, 134, 170, 224, 233,
260, 350, 440, 800, 666`,
                },
                {
                  title: "COUNT 9 :",
                  data: `189, 279, 288, 369, 378,
459, 468, 477, 558, 567,
990, 117, 126, 135, 144,
180, 225, 234, 270, 360,
450, 900, 333`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 font-bold tracking-wide">
                    {item.title}
                  </div>
                  <div className="bg-white p-4 text-center whitespace-pre-line">
                    {item.data}
                  </div>
                </div>
              ))}

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

export default PanelCountChart;