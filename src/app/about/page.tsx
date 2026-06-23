import { Metadata } from "next";
import About from "@/views/Main/About";

export const metadata: Metadata = {
  title: "About Us | DP BOSS",
  description: "Learn more about DP BOSS, the leading platform for fast and accurate Satta Matka results, charts, and guessing.",
  alternates: {
    canonical: "https://dpboss.monster/about",
  },
};

export default function Page() {
  return <About />;
}
