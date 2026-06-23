"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const KhatrisFavouritePannaChart = () => {
  const chartSections: { title: string; lines: string[] }[] = [
    { title: "1", lines: ["128 - 137 - 236 - 678", "245 - 290 - 470 - 579."] },
    { title: "2", lines: ["129 - 147 - 246 - 679", "345 - 390 - 480 - 589."] },
    { title: "3", lines: ["120 - 157 - 256 - 670", "139 - 148 - 346 - 689."] },
    { title: "4", lines: ["130 - 158 - 356 - 680", "239 - 248 - 347 - 789."] },
    { title: "5", lines: ["140 - 159 - 456 - 690", "230 - 258 - 357 - 780."] },
    { title: "6", lines: ["123 - 178 - 268 - 367", "240 - 259 - 457 - 790."] },
    { title: "7", lines: ["124 - 179 - 269 - 467", "340 - 359 - 458 - 890."] },
    { title: "8", lines: ["125 - 170 - 260 - 567", "134 - 189 - 369 - 468."] },
    { title: "9", lines: ["135 - 180 - 360 - 568", "234 - 289 - 379 - 478."] },
    { title: "10", lines: ["145 - 190 - 460 - 569", "235 - 280 - 370 - 578."] },
  ];

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="border-2 border-rose-500 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-center text-white font-black tracking-wide text-sm flex-1">
                  Khatri favourite panna chart
                </CardTitle>
              </div>

            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chartSections.map((sec) => (
                  <div
                    key={sec.title}
                    className="rounded-xl border-2 border-green-700 overflow-hidden"
                  >
                    <div className=" text-center bg-gradient-to-br from-green-600 to-green-700 text-white px-3 py-2 font-extrabold text-sm">
                      {sec.title}
                    </div>
                    <div className="bg-white text-green-900 p-3 text-center font-bold space-y-2">
                      <div className="text-base leading-7">{sec.lines[1]}</div>
                      <div className="text-xl leading-8 text-indigo-900">
                        <span className="bg-indigo-100 px-2 rounded">{sec.lines[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-sky-400 shadow-md">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-cyan-600 py-2">
              <CardTitle className="text-center text-white font-extrabold text-sm">
                How to use this chart
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 text-gray-800 leading-7 space-y-4 text-sm">
              <p>
                Hello, all the Matka enthusiasts. Today we welcome you to our platform
                <strong> DpBoss.Services</strong>. In this section, we will talk about
                <strong> Khatri's Favourite Panna Chart</strong>.
              </p>

              <p>
                This Panna chart is slightly different because it is based on the
                <strong> panel side</strong>, not the Jodi side. For your convenience,
                we have created a dedicated page explaining everything about
                Khatri’s favourite Panna chart in detail.
              </p>

              <p>
                This page is specially designed by our expert authors to provide all the
                important information in one place. It explains the main concept of the chart
                and helps you understand how panel combinations are structured.
              </p>

              <p>
                The chart is organized based on single-digit numbers. For example, for the
                single digit <strong>1</strong>, you will find combinations such as:
              </p>

              <p className="font-semibold text-green-700 text-center">
                128, 137, 236, 678, 245, 290, 470, 579
              </p>

              <p>
                These are eight three-digit combinations linked to the single digit 1.
                Similarly, combinations are provided for digits 2, 3, 4, 5, 6, 7, 8, 9, and 0.
              </p>

              <p>
                By studying these panel combinations carefully, you can better understand
                how the Panna structure works. The purpose of this chart is to give players
                clarity and organized reference data.
              </p>

              <p>
                We recommend Matka players visit this page regularly to analyze different
                combinations and understand the concept behind them. Familiarity with the
                chart may help you make more informed decisions.
              </p>

              <p>
                Before placing any bet, review the combinations carefully and finalize your
                Panna based on your own analysis. Always approach such games responsibly
                and understand the risks involved.
              </p>

              <p className="font-semibold text-center text-rose-600">
                Thank you, and we wish you success.
              </p>
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

export default KhatrisFavouritePannaChart;

function formatToday(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
