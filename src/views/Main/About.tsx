"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "./HomeSections/HeaderLogo";
import FooterSection from "./HomeSections/FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const About = () => {
  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="bg-white border-2 border-violet-400 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-sky-500 text-white py-2">
              <CardTitle className="text-center text-sm font-black tracking-wide">
                ℹ️ ABOUT DPBOSS.MONSTER
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3">
              <div className="space-y-3">
                {[
                  {
                    title: "What is DPBOSS.MONSTER?",
                    text: "DPBOSS.MONSTER is an informational platform that provides fast and regularly updated satta matka result information in a clean and easy-to-use format.",
                  },
                  {
                    title: "Our Purpose",
                    text: "Our purpose is to present publicly available matka results for users who want to view result updates quickly and conveniently, without confusion or unnecessary distractions.",
                  },
                  {
                    title: "Why Choose DPBOSS.MONSTER?",
                    text: "✔ Fast result updates\n✔ Simple and mobile-friendly design\n✔ Clean layout with minimal ads\n✔ Easy navigation for all users",
                  },
                  {
                    title: "Entertainment Disclaimer",
                    text: "DPBOSS.MONSTER is strictly an entertainment and information-only website. We do not promote, support, or encourage gambling, betting, or any illegal activity.",
                  },
                  {
                    title: "Legal Notice",
                    text: "All content published on this website is intended for general informational and entertainment purposes only. Users are advised to follow their local laws and regulations.",
                  },
                  {
                    title: "Transparency & Accuracy",
                    text: "We focus on accuracy, clarity, and a smooth browsing experience. If you notice any incorrect information, you can contact us for corrections or feedback.",
                  },
                  {
                    title: "User Responsibility",
                    text: "By using this website, users agree that they are accessing content voluntarily and understand the nature of the information provided for entertainment purposes only.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200"
                  >
                    <p className="font-black text-xs text-violet-900 mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <FooterSection />
        </div>
      </div>

      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};

export default About;
