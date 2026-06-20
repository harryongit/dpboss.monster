import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "../HeaderLogo";
import FooterSection from "../FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const JodiChartFamilyMatka = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-violet-100">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-4 space-y-6">

          <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-4">
              <CardTitle className="text-center text-white font-extrabold tracking-wide text-base">
                Matka Jodi Family Chart
              </CardTitle>
            </CardHeader>

            <CardContent className="p-5 space-y-8 text-sm text-gray-800 leading-7 font-semibold">

              {/* Explanation Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-inner border border-indigo-100 whitespace-pre-line">
                {`Matka Jodi Family Record
जोड़ियों को उनके कट के आधार पर 11 समूहों में बांटा जा सकता है जिसे मटका जोड़ी की फेमिली कहते है एक ही फेमिली की किसी जोड़ी को सम्बंधित जोड़ी और लगभग एक जैसा माना जाता है मटका छेत्र में यह कहा और माना जाता है की जोड़ियों को उनके फॅमिली जोड़ी के हिसाब से बनाया जाता है उदाहरण के लिए - आज 31 बनने बाला है और सायद ये 86 बन जाये या फिर 13 की फॅमिली की कोई भी जोड़ी बन जाये जोड़ी का कट सिर्फ उनकी फॅमिली जोड़ी में से बन सकता है`}
              </div>

              {/* Family Chart Section */}
              {/* Family Chart Section */}
              <div className="space-y-8">

                {/* Family Chart Box */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-rose-200 bg-gradient-to-br from-white via-rose-50 to-pink-50">

                  {/* Header */}
                  <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 py-4 text-center">
                    <h2 className="text-white font-extrabold tracking-widest text-base">
                      MATKA JODI FAMILY CHART
                    </h2>
                  </div>

                  {/* Families Grid */}
                  <div className="p-5 grid grid-cols-1 gap-4 text-sm font-bold text-gray-800">

                    {[
                      ["12 FAMILY", "12,17,21,26,62,67,71,76"],
                      ["13 FAMILY", "13,18,31,36,63,68,81,86"],
                      ["14 FAMILY", "14,19,41,46,64,69,91,96"],
                      ["15 FAMILY", "01,06,10,15,51,56,60,65"],
                      ["23 FAMILY", "23,28,32,37,73,78,82,87"],
                      ["24 FAMILY", "24,29,42,47,74,79,92,97"],
                      ["25 FAMILY", "02,07,20,25,52,57,70,75"],
                      ["34 FAMILY", "34,39,43,48,84,89,93,98"],
                      ["35 FAMILY", "03,08,30,35,53,58,80,85"],
                      ["45 FAMILY", "04,09,40,45,54,59,90,95"],
                      ["HALF RED", "05,16,27,38,49,50,61,72,83,94"],
                      ["FULL RED", "00,11,22,33,44,55,66,77,88,99"],
                    ].map(([title, numbers]) => (
                      <div
                        key={title}
                        className="bg-white rounded-2xl shadow-md border border-rose-100 p-4 text-center hover:shadow-xl transition duration-300"
                      >
                        <div className="text-rose-600 font-extrabold tracking-wide mb-2">
                          {title}
                        </div>
                        <div className="text-gray-700 leading-7">
                          {numbers}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                {/* English Explanation Section */}
                <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-xl border border-indigo-100 p-6">

                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 rounded-xl mb-5 font-bold text-sm tracking-wide">
                    Matka Jodi Family Explanation
                  </div>

                  <div className="whitespace-pre-line text-gray-800 leading-8 text-sm font-semibold">
                    {`Hello, all the Satta Matka players on our platform dpboss.services Today we are exploring a very important Jodi Chart. This is called the Matka Jodi Family Chart. So, according to the definition of the Matka Jodi Family Record, the Jodis, which are called the pairs of two numbers, can be divided into 11 different types of groups, based on their cut.

So, whenever Jodis of the same family, they are considered to be related together, and they are almost the same. They have very minor differences. In terms of Satta Matka, we all know and believe that the pairs, the Jodis of the same family are named according to their family, for example, Today 31 is going to be made and maybe it becomes over 86, or any pair from the family 13 can be made, the cut of the pair can be made only from their family pair.

This is a simple definition. So, now let's move on to the Matka Jodi Family chart, as you can see, here are some different families, so the first family name is 12 family, and here you can find 8 Jodis, then we have 13 Family here, again 8 Jodis, then 14 family 8 Jodis, Then 15 family, 23 family 24 family, 25 family 34, 35, 45, Half red and full red.

These are the families of the Jodis, and their mentioned Jodis, and the concept of the Matka Family Jodi, I have already told you earlier, so this is all about the Matka Jodi Family Chart. This is very important if you are a regular player or even a seasoned player.

You need to understand this concept, and then act upon it while you are playing the games. This can make you win a lot of big games in the Satta Matka. Especially if you are a Jodi lover, Good Luck, thank you for visiting us, wish you always win!`}
                  </div>
                </div>

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

export default JodiChartFamilyMatka;