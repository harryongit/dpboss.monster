import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Mail } from 'lucide-react';

const NoticeSection = () => {
  // Phone & WhatsApp links with country code (+91 for India)
  const countryCode = "+91";
  const phoneNumber = "";
  const fullNumber = `${countryCode}${phoneNumber}`;
  const whatsappLink = `https://wa.me/${phoneNumber}`; // WhatsApp needs number without '+'

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 shadow-md rounded-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-t-xl">
        <CardTitle className="text-center text-sm font-black">☆ NOTICE ☆</CardTitle>
      </CardHeader>

      <CardContent className="py-3 text-center space-y-2">
  <p className="text-xs text-blue-900 font-semibold leading-relaxed">
    अपना बाजार spdpboss.net वेबसाइट में डलवाने के लिए आज ही हमे कॉल या WhatsApp करे
  </p>

  {/* Buttons with spacing */}
  <div className="flex justify-center items-center gap-3 mt-2">
    {/* Call Button */}
    <a
      href={`tel:${fullNumber}`}
      className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition"
    >
      <Phone className="h-4 w-4" />
      कॉल करें
    </a>

    {/* WhatsApp Button */}
    <a
      href={`https://wa.me/${countryCode.replace('+','')}${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 bg-teal-500 hover:bg-teal-600 text-white font-bold px-4 py-2 rounded-lg shadow-md transition"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp करें
    </a>
  </div>

  <div className="flex justify-center items-center mt-2">
    <a
      href="mailto:support@dpboss.net"
      className="inline-flex items-center gap-2 text-blue-800 font-bold hover:text-blue-900 transition"
    >
      <Mail className="h-4 w-4" />
      Email: support@spdpboss.net
    </a>
  </div>

  <p className="text-xs text-gray-600 mt-1">शर्ते लागु</p>
</CardContent>

    </Card>
  );
};

export default NoticeSection;
