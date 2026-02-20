import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/common/DataTable';
import { Toast } from '@/components/ui/ToastProvider';
import { confirmSwal } from '@/lib/ConfirmSwal';
import { RefreshButton } from '@/components/ui/refresh-admin';
import { useDropdownCmmStarGoldNumberList } from '@/hooks/admin/useDropdownCmmStarGoldNumberList';
import { useListCmmStarGoldTodayResults } from '@/hooks/admin/useListCmmStarGoldTodayResults';
import { useCreateCmmStarGoldResult } from '@/hooks/admin/useCreateCmmStarGoldResult';
import { useDeleteCmmStarGoldResult } from '@/hooks/admin/useDeleteCmmStarGoldResult';
import { Loader2 } from 'lucide-react';

const CmmStarGoldUploadResult = () => {
  const [formData, setFormData] = useState({
    slotId: '',
    resultValue: '',
  });

  const [results, setResults] = useState([] as { id: number; slotId: number; slotLabel: string; value: string; datetime: string }[]);

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

  const dropdownQuery = useDropdownCmmStarGoldNumberList({ admin_id: adminId });
  const listQuery = useListCmmStarGoldTodayResults({ admin_id: adminId });
  const createMutation = useCreateCmmStarGoldResult();
  const deleteMutation = useDeleteCmmStarGoldResult();

  const slotMap = useMemo(() => {
    const items = dropdownQuery.data?.data?.items ?? [];
    const map = new Map<number, string>();
    items.forEach((it) => {
      const label = it.display_label ?? `${it.number} (${formatTimeLabel(it.result_time)})`;
      map.set(it.cmmstargold_number_id, label);
    });
    return map;
  }, [dropdownQuery.data]);

  useEffect(() => {
    const raw: any = listQuery.data?.data;
    const items: any[] = Array.isArray(raw) ? raw : (raw?.items ?? []);
    setResults(items.map((r: any) => ({
      id: r.result_id,
      slotId: r.cmmstargold_number_id,
      slotLabel: slotMap.get(r.cmmstargold_number_id) ?? String(r.cmmstargold_number_id),
      value: r.result_value,
      datetime: r.result_datetime,
    })));
  }, [listQuery.data, slotMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slotId || !formData.resultValue) {
      Toast.error('Please select time slot and enter result');
      return;
    }
    try {
      const resp = await createMutation.mutateAsync({
        admin_id: adminId,
        cmmstargold_number_id: parseInt(formData.slotId, 10),
        result_value: formData.resultValue,
      });
      Toast.success(resp.message || 'Result uploaded successfully');
      await listQuery.refetch();
      setFormData({ slotId: '', resultValue: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to upload result';
      Toast.error(message);
    }
  };

  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: 'Delete Result?',
      text: `This will delete the result for ${row.slotLabel}.`,
      confirmText: 'Delete',
      icon: 'warning',
    });
    if (!confirmed) return;
    try {
      const resp = await deleteMutation.mutateAsync({ admin_id: adminId, result_id: row.id });
      Toast.success(resp.message || `Result deleted successfully`);
      await listQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete result';
      Toast.error(message);
    }
  };

  const columns = [
    { header: 'Time Slot', accessor: 'slotLabel' },
    { header: 'Result', accessor: 'value' },
    { header: 'Date Time', accessor: 'datetime' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slotId">Time Slot *</Label>
                <Select
                  value={formData.slotId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, slotId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {(dropdownQuery.data?.data?.items ?? []).map((it) => (
                      <SelectItem key={it.cmmstargold_number_id} value={String(it.cmmstargold_number_id)}>
                        {it.display_label ?? `${it.number} (${formatTimeLabel(it.result_time)})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resultValue">Result *</Label>
                <Input
                  id="resultValue"
                  value={formData.resultValue}
                  onChange={(e) => setFormData((prev) => ({ ...prev, resultValue: e.target.value }))}
                  placeholder="XXX-X or XXX-XX-XXX"
                  required
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full" disabled={createMutation.isPending}>
                  {createMutation.isPending ? (
                    <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</span>
                  ) : 'Submit'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <DataTable
        title="CMM Star Gold Today Results"
        columns={columns}
        data={results}
        onDelete={onDelete}
        headerRight={<RefreshButton onClick={() => { void listQuery.refetch(); }} loading={listQuery.isFetching} />}
      />
    </div>
  );
};

export default CmmStarGoldUploadResult;

function formatTimeLabel(t: string): string {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hh = Number(h);
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const displayHour = hh % 12 === 0 ? 12 : hh % 12;
  return `${String(displayHour).padStart(2, '0')}:${m} ${suffix}`;
}
