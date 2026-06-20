import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyGuessingFreeFix } from "@/hooks/common/useDailyGuessingFreeFix";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const All22CardPannaPanelPattiChart = () => {

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-4">

          {/* Main Chart Card */}
          <Card className="border-2 border-rose-500 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-3">
              <CardTitle className="text-center text-white font-black tracking-wide text-sm">
                All 22 Card Panna Panel Patti Chart
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-6 text-center text-green-900 font-bold">

              {/* Single Digit Panels */}
              {[
                { digit: "1", lines: ["128 137 236 678", "245 290 470 579"] },
                { digit: "2", lines: ["129 147 246 679", "345 390 480 589"] },
                { digit: "3", lines: ["120 157 256 670", "139 148 346 689"] },
                { digit: "4", lines: ["130 158 356 680", "239 248 347 789"] },
                { digit: "5", lines: ["140 159 456 690", "230 258 357 780"] },
                { digit: "6", lines: ["123 178 268 367", "240 259 457 790"] },
                { digit: "7", lines: ["124 179 269 467", "340 359 458 890"] },
                { digit: "8", lines: ["125 170 260 567", "134 189 369 468"] },
                { digit: "9", lines: ["135 180 360 568", "234 289 379 478"] },
                { digit: "0", lines: ["145 190 460 569", "235 280 370 578"] },
              ].map((item) => (
                <div key={item.digit} className="border-2 border-green-700 rounded-xl overflow-hidden">
                  <div className="bg-green-700 text-white py-2 font-extrabold">
                    {item.digit}
                  </div>
                  <div className="bg-white py-3 space-y-1 text-base leading-7">
                    <div>{item.lines[0]}</div>
                    <div>{item.lines[1]}</div>
                  </div>
                </div>
              ))}

            </CardContent>
          </Card>

          {/* 22 Satta Matka Card Section */}
          <Card className="border-2 border-indigo-500 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 py-3">
              <CardTitle className="text-center text-white font-black text-sm">
                All 22 Satta Matka Card
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-5 text-sm font-semibold text-gray-800">

              {[
                {
                  title: "777 !!-1-!! 100",
                  lines: [
                    "128-137-146-236-245- 290-380-470-489-560",
                    "678-579-119-155-227- 335-344-399-588-669"
                  ],
                },
                {
                  title: "444 !!-2-!! 200",
                  lines: [
                    "129-138-147-156-237- 246-345-390-480-570",
                    "679-589-110-228-255- 336-499-660-688-778"
                  ],
                },
                {
                  title: "111 !!-3-!! 300",
                  lines: [
                    "120-139-148-157-238- 247-256-346-490-580",
                    "670-689-166-229-337- 355-445-599-779-788"
                  ],
                },
                {
                  title: "888 !!-4-!! 400",
                  lines: [
                    "130-149-158-167-239- 248-257-347-356-590",
                    "680-789-112-220-266- 338-446-455-699-770"
                  ],
                },
                {
                  title: "555 !!-5-!! 500",
                  lines: [
                    "140-159-168-230-249- 258-267-348-357-456",
                    "690-780-113-122-177- 339-366-447-799-889"
                  ],
                },
                {
                  title: "222 !!-6-!! 600",
                  lines: [
                    "123-150-169-178-240- 259-268-349-358-457",
                    "367-790-114-277-330- 448-466-556-880-899"
                  ],
                },
                {
                  title: "999 !!-7-!! 700",
                  lines: [
                    "124-160-179-250-269- 278-340-359-368-458",
                    "467-890-115-133-188- 223-377-449-557-566"
                  ],
                },
                {
                  title: "666 !!-8-!! 800",
                  lines: [
                    "125-134-170-189-260- 279-350-369-378-459",
                    "567-468-116-224-233- 288-440-477-558-990"
                  ],
                },
                {
                  title: "333 !!-9-!! 900",
                  lines: [
                    "126-135-180-234-270- 289-360-379-450-469",
                    "117-478-568-144-199- 225-388-559-577-667"
                  ],
                },
                {
                  title: "000 !!-0-!! 550",
                  lines: [
                    "127-136-145-190-235-280 370-389-460-479",
                    "569-578-118-226-244-299-334-488-668-677"
                  ],
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-indigo-300 rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="bg-indigo-600 text-white text-center py-2 font-bold tracking-wide">
                    {item.title}
                  </div>
                  <div className="bg-white text-center py-3 px-2 leading-7">
                    <div>{item.lines[0]}</div>
                    <div>{item.lines[1]}</div>
                  </div>
                </div>
              ))}

            </CardContent>
          </Card>

          {/* Description Section */}
          <Card className="border shadow-md">
            <CardContent className="p-4 text-sm text-gray-800 leading-7 space-y-4">
              <p>Hello everyone, how are you all? I hope you all are doing well. Welcome to dpboss.Services Today we are exploring a very important page of our website, it will help you a lot to learn the Panna Panel and Patti Chart. So this page includes all 22 cards of Panna Panel Patti, in the form of a chart.</p>

              <p>When you visit this page, you see on the top, there are panels written for every single digit like 1, 2, 3, 4, 5, 6, 7, 8, 9, and 0, and then below it, you will find another section, where you can see all 22 Satta Matka cards, and here you will find the complete sequence and the combinations of the panels.</p>

              <p>Here the first entry is 777, then 1, and then 100. So this is a complete formula of the panel, and below you will see a long figure written which is 128, 137, 146, 236, 245, 290, 380, 470, 489, 550, 678, 579, 119, 155, 227, 335, 344, 399, 588, 669, then similarly, we have many more combinations of them.</p>

              <p>These combinations, formulas, and calculated figures of the panels are very important if you are a panel lover, they will help you a lot to understand the basics of the panel, how they are formed, how you can pick the correct figure for the panel to win it, and win a lot of money in Satta Matka panel games.</p>

              <p>So these are called all 22 Panna Panel, and Patti Chart, and these are very important if you are a panel lover, they will really help you to improve your understanding of the panels. So that you will be able to pick a winning panel for your next big game and you will definitely make a lot of money from that. Thank you. I hope you always win here. Good Luck!</p>
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

export default All22CardPannaPanelPattiChart;