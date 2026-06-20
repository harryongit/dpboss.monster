import React from "react";
import { NavLink } from "@/lib/router-compat";

const FooterSection = () => {
  const linkClass = ({ isActive }) =>
    `underline transition-colors ${isActive
      ? "text-violet-700 font-bold"
      : "text-gray-500 hover:text-gray-800"
    }`;

  return (
    <footer className="mt-6 rounded-t-2xl border-t border-red-500">
      <div className="text-center py-5 px-3 space-y-3">
        {/* Brand */}
        <p className="font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-sky-600 to-cyan-600 text-base">
          © 2024 DPBOSS.MONSTER
        </p>

        {/* Tagline */}
        <p className="text-xs text-gray-600 font-medium">
          Fast Result Updates • Clean Interface • Mobile Friendly
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs font-medium">
          <span className="text-gray-500">Powered by DPBOSS.MONSTER</span>
          <span className="text-gray-400">•</span>

          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>

          <span className="text-gray-400">•</span>

          <NavLink to="/contact" className={linkClass}>
            Contact Us
          </NavLink>

          <span className="text-gray-400">•</span>

          <NavLink to="/privacy-policy" className={linkClass}>
            Privacy Policy
          </NavLink>

          <span className="text-gray-400">•</span>

          <NavLink to="/terms" className={linkClass}>
            Terms & Conditions
          </NavLink>
        </div>


      </div>
    </footer>
  );
};

export default FooterSection;
