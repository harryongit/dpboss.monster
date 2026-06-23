import { Metadata } from "next";
import JodiChartFamilyMatka from "@/views/Main/HomeSections/matkajodilist/JodiChartFamilyMatka";


export const metadata: Metadata = {
  title: "Jodi Chart Family Matka | DP BOSS",
  description: "Check out the Jodi Chart Family Matka on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/jodi-chart-family-matka",
  },
};

export default function Page() {
  return <JodiChartFamilyMatka />;
}
