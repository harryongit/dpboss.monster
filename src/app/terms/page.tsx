import { Metadata } from "next";
import TermsAndConditions from "@/views/Main/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms and Conditions | DP BOSS",
  description: "Review the terms and conditions for using DP BOSS, the premier platform for Satta Matka and Kalyan results.",
  alternates: {
    canonical: "https://dpboss.monster/terms",
  },
};

export default function Page() {
  return <TermsAndConditions />;
}
