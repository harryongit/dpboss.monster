import { Metadata } from "next";
import Contact from "@/views/Main/Contact";

export const metadata: Metadata = {
  title: "Contact Us | DP BOSS",
  description: "Get in touch with DP BOSS for any inquiries or support regarding our Satta Matka services and result updates.",
  alternates: {
    canonical: "https://dpboss.monster/contact",
  },
};

export default function Page() {
  return <Contact />;
}
