import { Metadata } from "next";
import PrivacyPolicy from "@/views/Main/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy | DP BOSS",
  description: "Read the Privacy Policy of DP BOSS to understand how we protect your information while you access fast Satta Matka results.",
  alternates: {
    canonical: "https://dpboss.monster/privacy-policy",
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
