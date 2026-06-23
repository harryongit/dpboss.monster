import React from "react";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import SattaMatkaWebsite from "@/views/Main/MainHome";
import { api } from "@/lib/http";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DP BOSS | Fastest Satta Matka Result | Kalyan Matka | DPBoss",
  description: "Welcome to DP BOSS. Get the fastest Satta Matka results, Kalyan Matka, Milan Day, Rajdhani Night, and live Matka charts and panel records.",
  alternates: {
    canonical: "https://dpboss.monster/",
  },
};

export default async function Home() {
  const queryClient = new QueryClient();

  try {
    // 🚀 Prefetch live results on the server
    await queryClient.prefetchQuery({
      queryKey: ['website', 'liveResults'],
      queryFn: async () => {
        const { data } = await api.get('/website/live-results');
        return data;
      }
    });
  } catch (error) {
    console.error("Failed to prefetch live-results on server", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SattaMatkaWebsite />
    </HydrationBoundary>
  );
}
