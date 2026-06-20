import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const MatkaJodiCountChart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-violet-100">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-4 space-y-8">

          <Card className="border border-rose-200 shadow-2xl rounded-3xl overflow-hidden bg-white">

            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-5">
              <CardTitle className="text-center text-white font-extrabold tracking-widest text-lg">
                MATKA JODI COUNT CHART
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-10 text-sm text-gray-800 leading-7 font-semibold">

              {/* Count Grid Section */}
              <div className="grid grid-cols-1 gap-4">

                {[
                  ["COUNT 0 :", "00"],
                  ["COUNT 1 :", "01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11"],
                  ["COUNT 2 :", "02, 11, 20, 29, 38, 47, 56, 65, 74, 83, 92"],
                  ["COUNT 3 :", "03, 12, 21, 30, 39, 48, 57, 66, 75, 84, 93"],
                  ["COUNT 4 :", "04, 13, 22, 31, 40, 49, 58, 67, 76, 85, 94"],
                  ["COUNT 5 :", "06, 15, 24, 33, 42, 51, 60, 69, 78, 87, 96"],
                  ["COUNT 6 :", "07, 16, 25, 34, 43, 52, 61, 70, 79, 88, 97"],
                  ["COUNT 7 :", "07, 16, 25, 34, 43, 52, 61, 70, 79, 88, 97"],
                  ["COUNT 8 :", "08, 17, 26, 35, 44, 53, 62, 71, 80, 87, 98"],
                  ["COUNT 9 :", "09, 18, 27, 36, 45, 54, 63, 72, 81, 88, 99"],
                ].map(([title, values]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-rose-100 shadow-md bg-gradient-to-br from-white to-rose-50 p-4 text-center"
                  >
                    <div className="text-rose-600 font-extrabold tracking-wide mb-2">
                      {title}
                    </div>
                    <div className="text-gray-800 leading-7">
                      {values}
                    </div>
                  </div>
                ))}

              </div>

              {/* English Explanation */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-inner border border-indigo-100 whitespace-pre-line">
                {`Hello everyone, welcome to our platform dpboss.Services and today we will shed light on the Matka Jodi count chart. So this is a very simple count chart, but a very important one, and it will help you understand the concept of the count chart in the Satta Matka language. So we have several entries here on this page for the Matka Jodi count chart.

First, we have count 0 and the figure for it is 00. Then we have count 1 and here we have some figures. Mostly figures are starting from the 0, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, and 11. Then we have count 2 in which we have 02, 11, 20, 29, 38, 47, 56, 65, 74, 83, 92. These are fixed numbers and they are used for the Matka Jodi count.

So, we have several counts here starting from count 0, then count 1, count 2, count 3, count 4, count 5, count 6, count 7, count 8, and count 9. So all these numbers have several figures of two-digit numbers and they cover almost every two-digit number and some of them can be repeated in more than one count category. So you need to take care of this thing and please visit this page and try to understand the concept of the Matka Jodi count, and try to understand how these counts work.

When you visit and put some time into these charts, and observe the data in different count categories, then surely you will be able to draw useful information and insights from this page and it will help you a lot when you play your game practically, and you will be able to win and predict the perfect Jodi for your next game that will make you win a lot of money. Thank you. I wish you the best of luck, and may you always win!`}
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

export default MatkaJodiCountChart;