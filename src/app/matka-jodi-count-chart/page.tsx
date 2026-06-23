import { Metadata } from "next";
import MatkaJodiCountChart from "@/views/Main/HomeSections/matkajodilist/MatkaJodiCountChart";


export const metadata: Metadata = {
  title: "Matka Jodi Count Chart | DP BOSS",
  description: "Check out the Matka Jodi Count Chart on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/matka-jodi-count-chart",
  },
};

export default function Page() {
  return <MatkaJodiCountChart />;
}
