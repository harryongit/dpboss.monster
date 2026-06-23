"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const PanelTotalChart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-violet-100">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-4 space-y-6">

          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-4">
              <CardTitle className="text-center text-white font-extrabold tracking-wide text-base">
                Panel Total Chart
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-8 text-sm text-gray-800 leading-7 font-semibold">

              {/* Explanation Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-inner border border-indigo-100 space-y-2">
                <p className="text-center font-bold text-indigo-700">
                  पाना टोटल चार्ट पैनल टोटल चार्ट
                </p>
                <p>पाने के तीनो अंको के जोड़ को पाना टोटल कहते हैं</p>
                <p>जैसे पाना 120 में 1+2+0=3 आया तो 3 इस पाने का पैनल टोटल कहलायेगा</p>
                <p>लेकिन अगर टोटल 2 अंको में आता है जैसे</p>
                <p>7+8+9=24 तो टोटल का दूसरा अंक जोकि 4 है</p>
                <p>तो 4 को इस पाने का पैनल टोटल मानेगे</p>
                <p className="text-rose-600 font-bold">
                  नोट - टोटल कॉउंट से अलग समीकरण है
                </p>
              </div>

              {[
                {
                  total: "TOTAL 0 :",
                  color: "from-indigo-600 to-blue-600",
                  numbers: `118, 127, 136, 145, 190, 226,235 ,
244, 280, 334, 370, 460, 550, 299,
389, 479, 488, 569, 578, 668, 677`,
                },
                {
                  total: "TOTAL 1 :",
                  color: "from-purple-600 to-indigo-600",
                  numbers: `100, 119, 128, 137, 146, 155, 227,
236, 245, 290, 335, 344, 380, 470,
560, 399, 489, 579, 588, 669, 678`,
                },
                {
                  total: "TOTAL 2 :",
                  color: "from-blue-600 to-cyan-600",
                  numbers: `110, 200, 129, 138, 147, 156, 228,
237, 246, 255, 336, 345, 390, 480,
570, 660, 499, 589, 679, 688, 778`,
                },
                {
                  total: "TOTAL 3 :",
                  color: "from-green-600 to-emerald-600",
                  numbers: `777, 444, 120, 300, 111, 139, 148, 157,
166, 229, 238, 247, 256, 337, 346, 355,
445, 490, 580, 670, 599, 689, 779, 788`,
                },
                {
                  total: "TOTAL 4 :",
                  color: "from-yellow-600 to-amber-600",
                  numbers: `112, 130, 220, 400, 149, 158, 167,
239, 248, 257, 266, 338, 347, 356,
446, 455, 590, 680, 770, 699, 789`,
                },
                {
                  total: "TOTAL 5 :",
                  color: "from-orange-600 to-red-600",
                  numbers: `113, 122, 140, 230, 500, 159, 168,
177, 249, 258, 267, 339, 348, 357,
366, 447, 456, 690, 780, 799, 889`,
                },
                {
                  total: "TOTAL 6 :",
                  color: "from-teal-600 to-green-600",
                  numbers: `888, 555, 114, 123, 150, 240, 330, 600,
222, 169, 178, 259, 268, 277, 349, 358,
367, 448, 457, 466, 556, 790, 880, 899`,
                },
                {
                  total: "TOTAL 7 :",
                  color: "from-pink-600 to-rose-600",
                  numbers: `115, 124, 133, 160, 223, 250, 340,
700, 179, 188, 269, 278, 359, 368,
377, 449, 458, 467, 557, 566, 890`,
                },
                {
                  total: "TOTAL 8 :",
                  color: "from-cyan-600 to-sky-600",
                  numbers: `116, 125, 134, 170, 224, 233, 260,
350, 440, 800, 189, 279, 288, 369,
378, 459, 468, 477, 558, 567, 990`,
                },
                {
                  total: "TOTAL 9 :",
                  color: "from-violet-600 to-purple-600",
                  numbers: `199, 289, 379, 388, 469, 478, 559, 568,
577, 667, 999, 666, 117, 126, 135, 144,
180, 225, 234, 270, 360, 450, 900, 333,`,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${item.color} text-white text-center py-3 font-bold tracking-wide`}>
                    {item.total}
                  </div>
                  <div className="bg-white p-4 text-center whitespace-pre-line">
                    {item.numbers}
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

export default PanelTotalChart;