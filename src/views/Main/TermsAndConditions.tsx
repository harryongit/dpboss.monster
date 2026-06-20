import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "./HomeSections/HeaderLogo";
import FooterSection from "./HomeSections/FooterSection";
import { useMeta } from "@/hooks/useMeta";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const TermsAndConditions = () => {
  useMeta({
    title: "Terms and Conditions - DPBOSS.MONSTER",
    description:
      "Read the terms and conditions of DPBOSS.MONSTER. By using this website, you agree to these terms.",
    keywords: "terms and conditions dpboss, dpboss terms, website terms",
  });

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="bg-white border-2 border-violet-400 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-sky-500 text-white py-2">
              <CardTitle className="text-center text-sm font-black tracking-wide">
                📜 TERMS & CONDITIONS
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3">
              <div className="space-y-3">
                {/* Introduction */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Introduction
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Welcome to DPBOSS.MONSTER. By accessing or using this website,
                    you agree to be bound by these Terms and Conditions. If you
                    do not agree with any part of these terms, please discontinue
                    use of the website.
                  </p>
                </div>

                {/* Website Purpose */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Website Purpose
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER is an informational and entertainment-only
                    platform. The website does not promote, support, or
                    facilitate gambling, betting, or any form of illegal
                    activity.
                  </p>
                </div>

                {/* User Eligibility */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    User Eligibility
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    By using this website, you confirm that you are accessing
                    the content voluntarily and that you are responsible for
                    complying with all applicable local laws and regulations.
                  </p>
                </div>

                {/* Content Accuracy */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Content Accuracy
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    While we strive to provide accurate and timely information,
                    DPBOSS.MONSTER does not guarantee the completeness, reliability,
                    or accuracy of any content published on the website.
                  </p>
                </div>

                {/* No Liability */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Limitation of Liability
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER shall not be held liable for any direct or
                    indirect losses, damages, or consequences resulting from
                    the use of or reliance on the information provided on this
                    website.
                  </p>
                </div>

                {/* External Links */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    External Links
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    This website may contain links to third-party websites.
                    DPBOSS.MONSTER is not responsible for the content, accuracy, or
                    privacy practices of external sites.
                  </p>
                </div>

                {/* Intellectual Property */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Intellectual Property
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    All content, logos, text, and design elements on DPBOSS.MONSTER
                    are the intellectual property of the website unless stated
                    otherwise. Unauthorized use is strictly prohibited.
                  </p>
                </div>

                {/* Modifications */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Changes to Terms
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER reserves the right to update or modify these Terms
                    and Conditions at any time without prior notice. Continued
                    use of the website constitutes acceptance of the updated
                    terms.
                  </p>
                </div>

                {/* Termination */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Termination of Access
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    We reserve the right to restrict or terminate access to the
                    website at our discretion, without notice, for any reason.
                  </p>
                </div>

                {/* Governing Law */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Governing Law
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    These Terms and Conditions shall be governed and interpreted
                    in accordance with applicable laws of your jurisdiction.
                  </p>
                </div>

                {/* Acceptance */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Acceptance of Terms
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    By accessing DPBOSS.MONSTER, you acknowledge that you have read,
                    understood, and agreed to these Terms and Conditions in
                    full.
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

export default TermsAndConditions;
