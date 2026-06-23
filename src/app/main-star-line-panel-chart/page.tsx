import { Metadata } from "next";
import MainStarLinePanelChart from "@/views/Main/HomeSections/MainStarLinePanelChart";


export const metadata: Metadata = {
  title: "Main Star Line Panel Chart | DP BOSS",
  description: "Check out the Main Star Line Panel Chart on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/main-star-line-panel-chart",
  },
};

export default function Page() {
  return <MainStarLinePanelChart />;
}
