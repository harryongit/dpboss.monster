"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyGuessingFreeFix } from "@/hooks/common/useDailyGuessingFreeFix";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const FixOpenToCloseByDate = () => {
  const query = useDailyGuessingFreeFix();
  const items = query.data?.data?.items ?? [];
  const firstDate = items[0]?.date;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-violet-100">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-4 space-y-6">
          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">

            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-center text-white font-extrabold tracking-wide text-base flex-1">
                  Fix open to close by date
                </CardTitle>

              </div>

            </CardHeader>

            <CardContent className="p-5 space-y-8 text-sm text-gray-800 leading-7 font-semibold">

              {/* Hindi Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-inner border border-indigo-100 whitespace-pre-line">
                {`धनवर्षा
तारीख के हिसाब से ओपन तू क्लोज निकालने को धनवर्षा कहते हैं इस धनवर्षा को तारीख के हिसाब से बहुत कठोर परिश्रम के बाद हमने आपके लिए निकाला है यह धनवर्षा हर एक मारकेट पर लागू होगा`}
              </div>

              {/* Table Section */}
              <div className="rounded-2xl overflow-hidden shadow-lg border">
                <table className="w-full text-center">
                  <thead className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                    <tr>
                      <th className="py-2">DATE (TAREK)</th>
                      <th className="py-2">OPEN TO CLOSE FIGURE (ANK)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {[
                      ["1", "4-5-9-8"], ["2", "1-0-6-9"], ["3", "2-5-6-7"], ["4", "3-1-9-6"],
                      ["5", "4-2-3-7"], ["6", "0-8-9-5"], ["7", "7-0-2-6"], ["8", "1-6-3-9"],
                      ["9", "2-7-8-5"], ["10", "4-6-3-2"], ["11", "5-4-9-1"], ["12", "8-9-4-3"],
                      ["13", "4-5-6-0"], ["14", "7-9-4-6"], ["15", "0-8-9-5"], ["16", "7-8-9-0"],
                      ["17", "4-5-2-3"], ["18", "1-6-2-7"], ["19", "4-8-5-7"], ["20", "4-9-2-3"],
                      ["21", "6-9-3-1"], ["22", "9-8-2-7"], ["23", "2-5-4-3"], ["24", "9-7-6-8"],
                      ["25", "4-9-3-7"], ["26", "4-5-7-9"], ["27", "5-0-1-6"], ["28", "7-3-1-5"],
                      ["29", "2-0-3-8"], ["30", "4-5-0-1"], ["31", "6-3-2-1"]
                    ].map(([date, ank], index) => (
                      <tr key={index} className="border-t hover:bg-rose-50 transition">
                        <td className="py-2">{date}</td>
                        <td className="py-2">{ank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>



              {/* English Explanation */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-inner border border-indigo-100 whitespace-pre-line">
                {`Hello everyone, how are you all the Satta Matka Enthusiasta, today I am very excited to welcome all of you on DpBoss.Services and today I will introduce you to our very important page which is Fix Open to Close by Date.

This concept is called Dhanvarsha, finding your open and close according to the current date of any month or year, is a concept which we call Dhanvarsha in the language of Satta Matka, so here is a fixed formula for we have already calculated it and it depends on the date you need to remember that the date is very important here and this Dhanvarsha concept works for every market and there is no difference between the markets, you can use it for every market and below you can find a breakdown of the dates and their open to close and fix.

Here is the date column on the left side and here is the open to close on the right side for date 1, there is 4-5-9-8, then for date 2, there is 1-0-6-9, then continuously for 3-4-5-6 all the Anks are mentioned here so whatever the month is whatever the year is these 31 dates will remain same in the Dhanvarsha concept.

So, this page tells you and teaches you about what you need to know if you want to play games and this will help you a lot to find out your fixed open to close by the date, and this will keep you uplifted in the competition, and you will have the highest chances of winning than your competitors. So I hope you will love it and will utilize it to get better results.

It will apply to any market you love to play so I wish you the best and I hope you will win the big money using this Dhanvarsha concept Thank you.`}
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

export default FixOpenToCloseByDate;