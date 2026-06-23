import { Metadata } from "next";
import PanelCountChart from "@/views/Main/HomeSections/matkajodilist/PanelCountChart";


export const metadata: Metadata = {
  title: "Panel Count Chart | DP BOSS",
  description: "Check out the Panel Count Chart on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/panel-count-chart",
  },
};

export default function Page() {
  return <PanelCountChart />;
}
