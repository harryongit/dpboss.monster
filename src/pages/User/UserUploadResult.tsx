

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/ToastProvider";
import { useUserResultMarkets } from "@/hooks/user/useUserResultMarkets";
import { useSubmitUserResult } from "@/hooks/user/useSubmitUserResult";
import { RefreshButton } from "@/components/ui/refresh-admin";

const UserUploadResult = () => {
  const listQuery = useUserResultMarkets();
  const submitMutation = useSubmitUserResult();
  const [values, setValues] = useState<{ [key: number]: string }>({});
  const [pendingId, setPendingId] = useState<number | null>(null);
  

  const handleChange = (id: number, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpload = (id: number, name: string, existing?: string | null) => {
    const hasLocal = Object.prototype.hasOwnProperty.call(values, id);
    const valueToSubmit = hasLocal ? (values[id] ?? "") : (existing ?? "");
    if (!valueToSubmit) {
      Toast.error("Please enter a result number!");
      return;
    }
    setPendingId(id);
    const saved = localStorage.getItem('user');
    let user_id = 0;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.id) user_id = parsed.id as number;
      } catch {}
    }
    submitMutation.mutate(
      { user_id, market_id: id, result_number: valueToSubmit },
      {
        onSuccess: () => {
          Toast.success(`Result for ${name} submitted`);
          setValues((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
          void listQuery.refetch();
        },
        onError: (err) => {
          const anyErr: any = err as any;
          const msg = anyErr?.message ?? anyErr?.response?.data?.message ?? 'Failed to submit result';
          Toast.error(msg);
        },
        onSettled: () => {
          setPendingId(null);
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upload Results</h2>
        <RefreshButton onClick={async () => { await listQuery.refetch(); Toast.success('Markets fetched'); }} loading={listQuery.isFetching} />
      </div>
      {listQuery.data?.data.items && listQuery.data.data.items.length > 0 && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {listQuery.data.data.items.map((market) => (
            <Card key={market.market_id} className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{market.market_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Enter result number"
                  value={Object.prototype.hasOwnProperty.call(values, market.market_id) ? (values[market.market_id] ?? "") : (market.result ?? "")}
                  onChange={(e) => handleChange(market.market_id, e.target.value)}
                />
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                  disabled={(submitMutation.isPending && pendingId === market.market_id)}
                  onClick={() => handleUpload(market.market_id, market.market_name, market.result)}
                >
                  {submitMutation.isPending && pendingId === market.market_id ? 'Submitting...' : 'Upload Result'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {(!listQuery.data?.data.items || listQuery.data.data.items.length === 0) && (
        <div className="p-4 text-sm text-gray-600 dark:text-gray-300">No markets available</div>
      )}
    </div>
  );
};

export default UserUploadResult;
