

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/common/DataTable";
import { Toast } from "@/components/ui/ToastProvider";
import { confirmSwal } from "@/lib/ConfirmSwal";
import { useAllMarkets } from "@/hooks/common/useAllMarkets";
import { useListFinalAnk } from "@/hooks/admin/useListFinalAnk";
import { useCreateFinalAnk } from "@/hooks/admin/useCreateFinalAnk";
import { useDeleteFinalAnk } from "@/hooks/admin/useDeleteFinalAnk";
import { RefreshButton } from "@/components/ui/refresh-admin";
import { Loader2 } from "lucide-react";


const AddFinalAnk = () => {
  const [formData, setFormData] = useState({
    marketId: "",
    ankNumber: "",
    resultDate: "",
  });

  const [finalAnks, setFinalAnks] = useState([] as { id: number; gameName: string; finalAnk: string; resultDate: string }[]);

  let adminId = 1;
  try {
    const saved = localStorage.getItem('admin');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.id) adminId = parsed.id as number;
    }
  } catch {
    adminId = 1;
  }

  const marketsQuery = useAllMarkets({ admin_id: adminId });
  const listQuery = useListFinalAnk({ admin_id: adminId });
  const createMutation = useCreateFinalAnk();
  const deleteMutation = useDeleteFinalAnk();

  const marketMap = useMemo(() => {
    const items = marketsQuery.data?.data?.items ?? [];
    const map = new Map<number, string>();
    items.forEach((m) => map.set(m.market_id, m.market_name));
    return map;
  }, [marketsQuery.data]);

  useEffect(() => {
    const items = listQuery.data?.data?.items ?? [];
    setFinalAnks(items.map((it: any) => ({
      id: it.id ?? it.sr_no,
      gameName: marketMap.get(it.market_id) ?? String(it.market_id),
      finalAnk: it.ank_number,
      resultDate: it.result_date,
    })));
  }, [listQuery.data, marketMap]);

  // HANDLE INPUT CHANGE
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.marketId || !formData.ankNumber || !formData.resultDate) {
      Toast.error('Please fill in all fields!');
      return;
    }
    try {
      const resp = await createMutation.mutateAsync({
        date: toDDMMYYYY(formData.resultDate),
        market_id: parseInt(formData.marketId, 10),
        ank_number: formData.ankNumber,
        admin_id: adminId,
      });
      Toast.success(resp.message || 'Final ank added successfully!');
      await listQuery.refetch();
      setFormData({ marketId: "", ankNumber: "", resultDate: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create final ank';
      Toast.error(message);
    }
  };

  // DELETE RECORD WITH CONFIRMATION
  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: "Delete Final Ank?",
      text: `This will delete the final ank number "${row.finalAnk}" for ${row.gameName}.`,
      confirmText: "Delete",
      icon: "warning",
    });

    if (!confirmed) return;
    try {
      const resp = await deleteMutation.mutateAsync({ id: row.id, admin_id: adminId });
      Toast.success(resp.message || `Deleted final ank ${row.finalAnk} for ${row.gameName}`);
      await listQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete final ank';
      Toast.error(message);
    }
  };

  // TABLE COLUMNS
  const columns = [
   
    { header: "Game Name", accessor: "gameName" },
    { header: "Number", accessor: "finalAnk" },
   
  ];

  return (
    <div className="space-y-6">
      {/* Add Final Ank Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="resultDate">Result Date *</Label>
                <Input
                  id="resultDate"
                  name="resultDate"
                  type="date"
                  value={formData.resultDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketId">Game Name *</Label>
                <Select
                  value={formData.marketId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, marketId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent>
                    {(marketsQuery.data?.data?.items ?? []).map((m) => (
                      <SelectItem key={m.market_id} value={String(m.market_id)}>{m.market_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ankNumber">Final Ank Number *</Label>
                <Input
                  id="ankNumber"
                  name="ankNumber"
                  type="text"
                  value={formData.ankNumber}
                  onChange={handleInputChange}
                  placeholder="Enter final ank number"
                  required
                />
              </div>

             
            </div>

            <div className="flex justify-center">
              <Button type="submit" className="bg-success hover:bg-success/90 text-success-foreground px-8" disabled={createMutation.isPending}>
                {createMutation.isPending ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</span>
                ) : 'Submit'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

     
        <DataTable
          title="Final Ank Report"
          columns={columns}
          data={finalAnks}
          onDelete={onDelete}
          headerRight={<RefreshButton onClick={() => { void listQuery.refetch(); }} loading={listQuery.isFetching} />}
        />
      {/* )} */}
    </div>
  );
};

export default AddFinalAnk;

function toDDMMYYYY(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
