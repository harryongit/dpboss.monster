
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/common/DataTable';
import { Toast } from '@/components/ui/ToastProvider';
import { confirmSwal } from '@/lib/ConfirmSwal';
import { useAllMarkets } from '@/hooks/common/useAllMarkets';
import { useListFreeFix } from '@/hooks/admin/useListFreeFix';
import { useCreateFreeFix } from '@/hooks/admin/useCreateFreeFix';
import { useDeleteFreeFix } from '@/hooks/admin/useDeleteFreeFix';
import { RefreshButton } from '@/components/ui/refresh-admin';
import { Skeleton } from '@/components/ui/skeleton';

const FreeFix = () => {
  const [formData, setFormData] = useState({
    resultDate: '',
    marketId: '',
    singleResult: '',
    jodiResult: '',
    pannaResult: '',
  });

  const [results, setResults] = useState([] as { id: number; marketId: number; gameName: string; singleResult: string; jodiResult: string; pannaResult: string }[]);

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
  const listQuery = useListFreeFix({ admin_id: adminId });
  const createMutation = useCreateFreeFix();
  const deleteMutation = useDeleteFreeFix();

  const marketMap = useMemo(() => {
    const items = marketsQuery.data?.data?.items ?? [];
    const map = new Map<number, string>();
    items.forEach((m) => map.set(m.market_id, m.market_name));
    return map;
  }, [marketsQuery.data]);

  useEffect(() => {
    const items = listQuery.data?.data?.items ?? [];
    setResults(items.map((it: any) => ({
      id: it.freefix_id ?? it.id,
      marketId: it.market_id,
      gameName: marketMap.get(it.market_id) ?? String(it.market_id),
      singleResult: it.single,
      jodiResult: it.jodi,
      pannaResult: it.panna,
    })));
  }, [listQuery.data, marketMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.marketId || !formData.singleResult || !formData.jodiResult || !formData.pannaResult || !formData.resultDate) {
      Toast.error('Please fill in all fields!');
      return;
    }
    try {
      const resp = await createMutation.mutateAsync({
        date: toDDMMYYYY(formData.resultDate),
        market_id: parseInt(formData.marketId, 10),
        single: formData.singleResult,
        jodi: formData.jodiResult,
        panna: formData.pannaResult,
        admin_id: adminId,
      });
      Toast.success(resp.message || 'Free fix added successfully!');
      await listQuery.refetch();
      setFormData({ resultDate: '', marketId: '', singleResult: '', jodiResult: '', pannaResult: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create free fix';
      Toast.error(message);
    }
  };

  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: 'Delete Free Fix?',
      text: `This will delete the free fix for ${row.gameName}.`,
      confirmText: 'Delete',
      icon: 'warning',
    });
    if (!confirmed) return;
    try {
      const resp = await deleteMutation.mutateAsync({ freefix_id: row.id, market_id: row.marketId, admin_id: adminId });
      Toast.success(resp.message || `Deleted free fix for ${row.gameName}`);
      await listQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete free fix';
      Toast.error(message);
    }
  };

  const columns = [
    { header: 'Game Name', accessor: 'gameName' },
    { header: 'Single Result', accessor: 'singleResult' },
    { header: 'Jodi Result', accessor: 'jodiResult' },
    { header: 'Panna Result', accessor: 'pannaResult' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resultDate">Result Date *</Label>
                <Input
                  id="resultDate"
                  name="resultDate"
                  type="date"
                  value={formData.resultDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, resultDate: e.target.value }))}
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
                <Label htmlFor="singleResult">Single Result *</Label>
                <Input
                  id="singleResult"
                  value={formData.singleResult}
                  onChange={(e) => setFormData((prev) => ({ ...prev, singleResult: e.target.value }))}
                  placeholder="XXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jodiResult">Jodi Result *</Label>
                <Input
                  id="jodiResult"
                  value={formData.jodiResult}
                  onChange={(e) => setFormData((prev) => ({ ...prev, jodiResult: e.target.value }))}
                  placeholder="XX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pannaResult">Panna Result *</Label>
                <Input
                  id="pannaResult"
                  value={formData.pannaResult}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pannaResult: e.target.value }))}
                  placeholder="XXX"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="bg-success hover:bg-success/90 text-success-foreground px-8">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    
      <DataTable
        title="Free Fix Report"
        columns={columns}
        data={results}
        onDelete={onDelete}
        headerRight={<RefreshButton onClick={() => { void listQuery.refetch(); }} loading={listQuery.isFetching} />}
      />
    </div>
  );
};

export default FreeFix;

function toDDMMYYYY(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
