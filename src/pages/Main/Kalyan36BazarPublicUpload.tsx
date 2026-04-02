import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import HeaderLogo from "./HomeSections/HeaderLogo";
import FooterSection from "./HomeSections/FooterSection";
import ScrollToggleButton from "@/components/ui/ScrollToggleButton";
import HomeButton from "@/components/ui/HomeButton";
import { Button } from "@/components/ui/button";
import { useKalyan36BazarPublicUploadSlots } from "@/hooks/common/useKalyan36BazarPublicUploadSlots";
import { useKalyan36BazarPublicUploadSubmit } from "@/hooks/common/useKalyan36BazarPublicUploadSubmit";

const Kalyan36BazarPublicUpload = () => {
  const slotsQuery = useKalyan36BazarPublicUploadSlots();
  const submitMutation = useKalyan36BazarPublicUploadSubmit();
  const [values, setValues] = useState<{ [key: number]: string }>({});
  const [pendingId, setPendingId] = useState<number | null>(null);

  const items = useMemo(() => {
    const raw: any = slotsQuery.data?.data;
    return Array.isArray(raw) ? raw : (raw?.items ?? []);
  }, [slotsQuery.data]);

  const handleChange = (id: number, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = async (slotId: number) => {
    const val = values[slotId];
    if (!val || val.trim().length === 0) return;
    setPendingId(slotId);
    try {
      await submitMutation.mutateAsync({ kalyan36bazar_number_id: slotId, result_value: val.trim() });
      setPendingId(null);
      await slotsQuery.refetch();
    } catch {
      setPendingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-peach">
      <div className="max-w-md mx-auto">
        <HeaderLogo />

        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-extrabold text-black drop-shadow-lg uppercase">Kalyan 36 Bazar Public Upload</div>
            <Button
              size="sm"
              disabled={slotsQuery.isFetching}
              onClick={() => slotsQuery.refetch()}
              className="bg-white text-orange-700 border border-orange-700 font-bold rounded shadow-md px-3 py-2 hover:bg-white/80 transition-all duration-300"
            >
              Refresh
            </Button>
          </div>

          {slotsQuery.isFetching && (
            <div className="text-center text-purple-700 font-semibold bg-purple-50 border border-purple-200 rounded-md p-2">
              Loading slots...
            </div>
          )}

          {slotsQuery.isError && !slotsQuery.isFetching && (
            <div className="text-center text-red-700 font-semibold bg-red-50 border border-red-200 rounded-md p-2">
              Failed to load slots.
            </div>
          )}

          {!slotsQuery.isFetching && !slotsQuery.isError && items.length === 0 && (
            <div className="text-center text-purple-700 font-semibold bg-purple-50 border border-purple-200 rounded-md p-2">
              No upload slots available.
            </div>
          )}

          {!slotsQuery.isFetching && !slotsQuery.isError && items.length > 0 && (
            <div className="grid gap-4 grid-cols-1">
              {items.map((slot: any) => (
                <Card key={slot.kalyan36bazar_number_id} className="border-2 border-red-600 shadow-xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 py-2">
                    <CardTitle className="text-white font-black tracking-wide text-lg">
                      {slot.display_label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-black">
                        Today Result: <span className={`font-black ${slot.today_result && slot.today_result !== "-" ? "text-red-600" : "text-gray-500"}`}>{slot.today_result}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        className="flex-1 border border-red-600 rounded px-3 py-2 text-center font-bold"
                        placeholder="Enter result (e.g., 345)"
                        value={values[slot.kalyan36bazar_number_id] ?? ""}
                        onChange={(e) => handleChange(slot.kalyan36bazar_number_id, e.target.value)}
                      />
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold"
                        disabled={submitMutation.isPending && pendingId === slot.kalyan36bazar_number_id}
                        onClick={() => handleUpload(slot.kalyan36bazar_number_id)}
                      >
                        {submitMutation.isPending && pendingId === slot.kalyan36bazar_number_id ? 'Submitting...' : 'Upload'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <FooterSection />
      </div>
      <ScrollToggleButton />
      <HomeButton />
    </div>
  );
};

export default Kalyan36BazarPublicUpload;
