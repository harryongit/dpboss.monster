import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderLogo from "./HomeSections/HeaderLogo";
import FooterSection from "./HomeSections/FooterSection";
import { useMeta } from "@/hooks/useMeta";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";

const PrivacyPolicy = () => {
  useMeta({
    title: "Privacy Policy - DPBOSS.MONSTER",
    description:
      "Read the privacy policy of DPBOSS.MONSTER. Learn how we handle data, cookies, and user privacy.",
    keywords: "privacy policy dpboss, dpboss privacy, data policy",
  });

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <Card className="bg-white border-2 border-violet-400 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-sky-500 text-white py-2">
              <CardTitle className="text-center text-sm font-black tracking-wide">
                🔐 PRIVACY POLICY
              </CardTitle>
            </CardHeader>

            <CardContent className="p-3">
              <div className="space-y-3">
                {/* Intro */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Introduction
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    At DPBOSS.MONSTER, we respect your privacy and are committed to
                    protecting any information you share while using our
                    website. This Privacy Policy explains how we collect, use,
                    and safeguard information when you visit our platform.
                  </p>
                </div>

                {/* Information Collection */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Information We Collect
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER does not require users to create accounts or
                    submit personal details to access content. We do not collect
                    personal information such as name, phone number, or address.
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed mt-1">
                    Non-personal information like browser type, device
                    information, and general usage data may be collected
                    automatically for analytical purposes.
                  </p>
                </div>

                {/* Cookies */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Cookies Policy
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Cookies may be used to enhance user experience, analyze site
                    traffic, and improve website performance. Cookies do not
                    collect personally identifiable information.
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed mt-1">
                    By continuing to use DPBOSS.MONSTER, you consent to the use of
                    cookies as described in this policy.
                  </p>
                </div>

                {/* Third Party */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Third-Party Services
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER may use third-party services such as analytics
                    tools or advertising partners. These third parties may use
                    cookies or similar technologies according to their own
                    privacy policies.
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed mt-1">
                    We do not control how third-party services collect or use
                    data, and users are encouraged to review their respective
                    privacy policies.
                  </p>
                </div>

                {/* Data Usage */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    How We Use Information
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Any information collected is used solely to improve website
                    performance, content quality, and user experience. We do
                    not sell, rent, or trade user data.
                  </p>
                </div>

                {/* Security */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Data Security
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    We implement reasonable security measures to protect our
                    website and users. However, no online platform can guarantee
                    absolute security.
                  </p>
                </div>

                {/* User Responsibility */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    User Responsibility
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Users are responsible for maintaining the security of their
                    own devices and internet connections while accessing this
                    website.
                  </p>
                </div>

                {/* Policy Updates */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Changes to This Policy
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    DPBOSS.MONSTER reserves the right to update or modify this
                    Privacy Policy at any time. Changes will be effective
                    immediately upon posting on this page.
                  </p>
                </div>

                {/* Consent */}
                <div className="bg-gradient-to-br from-violet-50 to-sky-50 p-3 rounded-lg border border-violet-200">
                  <p className="font-black text-xs text-violet-900 mb-1">
                    Your Consent
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    By using DPBOSS.MONSTER, you acknowledge that you have read,
                    understood, and agree to this Privacy Policy.
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

export default PrivacyPolicy;
