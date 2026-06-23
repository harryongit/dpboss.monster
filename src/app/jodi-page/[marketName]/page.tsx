import React from "react";
import { Metadata } from "next";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import JodiRecordChart from "@/views/Main/HomeSections/allmarkets/JodiRecordChart";
import { api } from "@/lib/http";

export async function generateMetadata({ params }: { params: Promise<{ marketName: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedMarketName = decodeURIComponent(resolvedParams.marketName).toUpperCase();
  
  return {
    title: `${decodedMarketName} Jodi Chart | DPBOSS Satta Matka`,
    description: `View the latest ${decodedMarketName} Jodi chart. DP BOSS provides accurate Satta Matka results for ${decodedMarketName}.`,
    keywords: `${decodedMarketName} jodi chart, satta matka, dp boss, dpboss, matka result`,
    alternates: {
      canonical: `https://dpboss.monster/jodi-page/${resolvedParams.marketName}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ marketName: string }> }) {
  const resolvedParams = await params;
  const decodedMarketName = decodeURIComponent(resolvedParams.marketName);
  const queryClient = new QueryClient();

  try {
    // 1. Prefetch the market list to resolve marketName to ID
    const liveResults = await queryClient.fetchQuery({
      queryKey: ['website', 'liveResults'],
      queryFn: async () => {
        const { data } = await api.get('/website/live-results');
        return data;
      }
    });

    // 2. Find the market ID by matching names on the server
    const allMarkets = (liveResults as any)?.data?.all_markets || [];
    const foundMarket = allMarkets.find(
      (m: any) => m.market_name.toLowerCase() === decodedMarketName.toLowerCase()
    );
    const marketId = foundMarket?.market_id;

    // 3. Prefetch the jodi chart records using the matched marketId
    if (marketId) {
      await queryClient.prefetchQuery({
        queryKey: ['jodiChart', marketId],
        queryFn: async () => {
          const { data } = await api.get(`/jodi-chart/${marketId}`);
          return data;
        }
      });
    }
  } catch (error) {
    console.error("Failed to prefetch Jodi Chart SSR data", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JodiRecordChart />
    </HydrationBoundary>
  );
}
