import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/common/DataTable';
import { RefreshButton } from '@/components/ui/refresh-admin';
import { Toast } from '@/components/ui/ToastProvider';
import { confirmSwal } from '@/lib/ConfirmSwal';
import { useListCmmStarGoldNumbers } from '@/hooks/admin/useListCmmStarGoldNumbers';
import { useCreateCmmStarGoldNumber } from '@/hooks/admin/useCreateCmmStarGoldNumber';
import { useUpdateCmmStarGoldNumber } from '@/hooks/admin/useUpdateCmmStarGoldNumber';
import { useDeleteCmmStarGoldNumber } from '@/hooks/admin/useDeleteCmmStarGoldNumber';

const AddTimeCmmStarGold = () => {
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

  const listQuery = useListCmmStarGoldNumbers({ admin_id: adminId });
  const createMutation = useCreateCmmStarGoldNumber();
  const updateMutation = useUpdateCmmStarGoldNumber();
  const deleteMutation = useDeleteCmmStarGoldNumber();

  const [rows, setRows] = useState([] as { id: number; number: number; resultTime: string }[]);
  const [form, setForm] = useState({ number: '', resultTime: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const items = listQuery.data?.data?.items ?? [];
    setRows(items.map((it: any) => ({
      id: it.cmmstargold_number_id ?? it.cmmstargold_id,
      number: Number(it.number),
      resultTime: it.result_time,
    })));
  }, [listQuery.data]);

  const onEdit = (row: any) => {
    setEditingId(row.id);
    setForm({ number: String(row.number), resultTime: row.resultTime });
  };

  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: 'Delete Time Entry?',
      text: `This will delete entry #${row.number} at ${row.resultTime}.`,
      confirmText: 'Delete',
      icon: 'warning',
    });
    if (!confirmed) return;
    try {
      const resp = await deleteMutation.mutateAsync({ admin_id: adminId, cmmstargold_number_id: row.id });
      Toast.success(resp.message || 'Deleted successfully');
      await listQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete';
      Toast.error(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.number || !form.resultTime) {
      Toast.error('Please fill in all fields');
      return;
    }
    const num = parseInt(form.number, 10);
    if (Number.isNaN(num)) {
      Toast.error('Number must be numeric');
      return;
    }
    try {
      if (editingId) {
        const resp = await updateMutation.mutateAsync({
          admin_id: adminId,
          cmmstargold_number_id: editingId,
          number: num,
          result_time: form.resultTime,
        });
        Toast.success(resp.message || 'Updated successfully');
      } else {
        const resp = await createMutation.mutateAsync({
          admin_id: adminId,
          number: num,
          result_time: form.resultTime,
        });
        Toast.success(resp.message || 'Created successfully');
      }
      setForm({ number: '', resultTime: '' });
      setEditingId(null);
      await listQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : (editingId ? 'Failed to update' : 'Failed to create');
      Toast.error(message);
    }
  };

  const columns = useMemo(() => ([
    { header: 'Number', accessor: 'number' },
    { header: 'Result Time', accessor: 'resultTime' },
  ]), []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary">Add Time CMM Star Gold</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number *</Label>
              <Input id="number" value={form.number} onChange={(e) => setForm((p) => ({ ...p, number: e.target.value }))} placeholder="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resultTime">Result Time *</Label>
              <Input id="resultTime" type="time" value={form.resultTime} onChange={(e) => setForm((p) => ({ ...p, resultTime: e.target.value }))} required />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">{editingId ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <DataTable
        title="CMM Star Gold Time List"
        columns={columns as any}
        data={rows}
        onEdit={onEdit}
        onDelete={onDelete}
        headerRight={<RefreshButton onClick={() => { void listQuery.refetch(); }} loading={listQuery.isFetching} />}
      />
    </div>
  );
};

export default AddTimeCmmStarGold;
