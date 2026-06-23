import { Metadata } from "next";
import MatkaFreeOpen from "@/views/Main/HomeSections/specialgamezone/MatkaFreeOpen";

export const metadata: Metadata = {
  title: "Matka Free Open | DP BOSS Fast Result",
  description: "Check the daily Matka Free Open predictions and fastest guessing for Kalyan Matka and other top Satta markets.",
  alternates: {
    canonical: "https://dpboss.monster/matka-free-open",
  },
};

export default function Page() {
  return <MatkaFreeOpen />;
}
