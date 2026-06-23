import React from "react";
import { Metadata } from "next";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PanelRecordChart from "@/views/Main/HomeSections/allmarkets/PanelRecordChart";
import { api } from "@/lib/http";

export async function generateMetadata({ params }: { params: Promise<{ marketName: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedMarketName = decodeURIComponent(resolvedParams.marketName).toUpperCase();
  
  return {
    title: `${decodedMarketName} Panel Chart | DPBOSS Satta Matka`,
    description: `View the latest ${decodedMarketName} Panel chart. DP BOSS provides accurate Satta Matka results for ${decodedMarketName}.`,
    keywords: `${decodedMarketName} panel chart, satta matka, dp boss, dpboss, matka result`,
    alternates: {
      canonical: `https://dpboss.monster/panel-page/${resolvedParams.marketName}`,
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

    // 3. Prefetch the panel chart records using the matched marketId
    if (marketId) {
      await queryClient.prefetchQuery({
        queryKey: ['panelChart', marketId],
        queryFn: async () => {
          const { data } = await api.get(`/panel-chart/${marketId}`);
          return data;
        }
      });
    }
  } catch (error) {
    console.error("Failed to prefetch Panel Chart SSR data", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PanelRecordChart />
    </HydrationBoundary>
  );
}
