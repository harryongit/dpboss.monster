import { Metadata } from "next";
import MatkaFinalNumberChart from "@/views/Main/HomeSections/specialgamezone/MatkaFinalNumberChart";


export const metadata: Metadata = {
  title: "Matka Final Number Chart | DP BOSS",
  description: "Check out the Matka Final Number Chart on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/matka-final-number-chart",
  },
};

export default function Page() {
  return <MatkaFinalNumberChart />;
}
