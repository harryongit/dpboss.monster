import { Metadata } from "next";
import FixOpenToCloseByDate from "@/views/Main/HomeSections/matkajodilist/FixOpenToCloseByDate";


export const metadata: Metadata = {
  title: "Fix Open To Close By Date | DP BOSS",
  description: "Check out the Fix Open To Close By Date on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/fix-open-to-close-by-date",
  },
};

export default function Page() {
  return <FixOpenToCloseByDate />;
}
