import { Metadata } from "next";
import KhatrisFavouritePannaChart from "@/views/Main/HomeSections/specialgamezone/KhatrisFavouritePannaChart";


export const metadata: Metadata = {
  title: "Khatris Favourite Panna Chart | DP BOSS",
  description: "Check out the Khatris Favourite Panna Chart on DP BOSS for the fastest and most accurate Satta Matka results and charts.",
  alternates: {
    canonical: "https://dpboss.monster/khatris-favourite-panna-chart",
  },
};

export default function Page() {
  return <KhatrisFavouritePannaChart />;
}
