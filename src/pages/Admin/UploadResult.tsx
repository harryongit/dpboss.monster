

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/common/DataTable';
import { Toast } from '@/components/ui/ToastProvider';
import { confirmSwal } from '@/lib/ConfirmSwal';
import { useAllMarkets } from '@/hooks/common/useAllMarkets';
import { useListResults } from '@/hooks/admin/useListResults';
import { useCreateResult } from '@/hooks/admin/useCreateResult';
import { useDeleteResult } from '@/hooks/admin/useDeleteResult';
import { RefreshButton } from '@/components/ui/refresh-admin';
import { Loader2 } from 'lucide-react';

const UploadResult = () => {
  const [formData, setFormData] = useState({
    resultDate: '',
    marketId: '',
    resultNumber: '',
  });

  const [results, setResults] = useState([] as { id: number; marketId: number; gameName: string; number: string; date: string }[]);

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
  const resultsQuery = useListResults({ admin_id: adminId }, true);
  const createMutation = useCreateResult();
  const deleteMutation = useDeleteResult();

  const marketMap = useMemo(() => {
    const items = marketsQuery.data?.data?.items ?? [];
    const map = new Map<number, string>();
    items.forEach((m) => map.set(m.market_id, m.market_name));
    return map;
  }, [marketsQuery.data]);

  useEffect(() => {
    const items = resultsQuery.data?.data?.items ?? [];
    setResults(items.map((r: any) => ({
      id: r.result_id ?? r.sr_no,
      marketId: r.market_id,
      gameName: marketMap.get(r.market_id) ?? String(r.market_id),
      number: r.result,
      date: r.result_date,
    })));
  }, [resultsQuery.data, marketMap]);

  // no refetch on market change; we filter client-side

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resultDate || !formData.marketId || !formData.resultNumber) {
      Toast.error('Please fill all required fields');
      return;
    }
    const formattedDate = toDDMMYYYY(formData.resultDate);
    const selectedMarketId = parseInt(formData.marketId, 10);
    const duplicate = results.some((r) => r.marketId === selectedMarketId && r.date === formattedDate);
    if (duplicate) {
      Toast.error('Result already exist on this date so please change entry');
      return;
    }
    try {
      const resp = await createMutation.mutateAsync({
        date: formattedDate,
        market_id: selectedMarketId,
        result_number: formData.resultNumber,
        admin_id: adminId,
      });
      Toast.success(resp.message || 'Result created');
      await resultsQuery.refetch();
      setFormData({ resultDate: '', marketId: '', resultNumber: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create result';
      Toast.error(message);
    }
  };

  // DELETE WITH SWEETALERT CONFIRMATION
  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: 'Delete Result?',
      text: `This will delete the result for ${row.gameName}.`,
      confirmText: 'Delete',
      icon: 'warning',
    });

    if (!confirmed) return;

    try {
      const resp = await deleteMutation.mutateAsync({ result_id: row.id, admin_id: adminId });
      Toast.success(resp.message || `Result for ${row.gameName} deleted successfully!`);
      await resultsQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete result';
      Toast.error(message);
    }
  };

  const columns = [
    { header: 'Game Name', accessor: 'gameName' },
    { header: 'Result Number', accessor: 'number' },
    { header: 'Date', accessor: 'date' },
  
  ];

  return (
    <div className="space-y-6">
      {/* Upload Result Form */}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, resultDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketId">Game Name *</Label>
                <Select
                  value={formData.marketId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, marketId: value }))}
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
                <Label htmlFor="resultNumber">Result Number *</Label>
                <Input
                  id="resultNumber"
                  name="resultNumber"
                  value={formData.resultNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, resultNumber: e.target.value }))}
                  placeholder="XXX-XX-XXX"
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
          title="Result Report"
          columns={columns}
          data={results}
          onDelete={onDelete}
          headerRight={<RefreshButton onClick={() => { void resultsQuery.refetch(); }} loading={resultsQuery.isFetching} />}
        />
     
    </div>
  );
};

export default UploadResult;

function toDDMMYYYY(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
