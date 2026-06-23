"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "./HomeSections/HeaderLogo";
import FooterSection from "./HomeSections/FooterSection";
import { useMeta } from "@/hooks/useMeta";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const Contact = () => {
  useMeta({
    title: "Contact Us - DPBOSS.MONSTER",
    description:
      "Contact DPBOSS.MONSTER for feedback, corrections, or general inquiries. We aim to respond within 24–48 hours.",
    keywords: "contact dpboss, dpboss support, dpboss feedback",
  });

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="bg-white border-2 border-violet-400 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-sky-500 text-white py-2">
              <CardTitle className="text-center text-sm font-black tracking-wide">
                📞 CONTACT DPBOSS.MONSTER
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3">
              <div className="space-y-3">
                {/* Intro */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Get in Touch
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    If you have any questions, feedback, or notice incorrect
                    information on our website, feel free to contact us.
                  </p>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Email Support
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    📧 support@dpboss.monster <br />
                    Please include clear details so we can assist you better.
                  </p>
                </div>

                {/* Response Time */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Response Time
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    We aim to respond to all genuine inquiries within
                    <span className="font-semibold"> 24–48 hours</span>.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Important Note
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER is an informational and entertainment-only
                    platform. We do not provide betting services or personal
                    gambling advice.
                  </p>
                </div>
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

export default Contact;
