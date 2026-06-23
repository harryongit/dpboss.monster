import { Metadata } from "next";
import PanelTotalChart from "@/views/Main/HomeSections/matkajodilist/PanelTotalChart";


export const metadata: Metadata = {
  title: "Panel Total Chart | DP BOSS",
  description: "Check out the Panel Total Chart on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/panel-total-chart",
  },
};

export default function Page() {
  return <PanelTotalChart />;
}
