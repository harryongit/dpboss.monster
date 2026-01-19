

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
import { useAllUsers } from '@/hooks/common/useAllUsers';
import { useListUserMarkets } from '@/hooks/admin/useListUserMarkets';
import { useCreateUserMarket } from '@/hooks/admin/useCreateUserMarket';
import { useDeleteUserMarket } from '@/hooks/admin/useDeleteUserMarket';
import { RefreshButton } from '@/components/ui/refresh-admin';
import { Loader2 } from 'lucide-react';

const AddUserMarket = () => {
  const [formData, setFormData] = useState({
    userId: '',
    marketId: '',
    days: '30',
  });
  const [userMarkets, setUserMarkets] = useState([] as { id: number; userName: string; game: string; addedOn: string; status: string }[]);

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

  const usersQuery = useAllUsers({ admin_id: adminId });
  const marketsQuery = useAllMarkets({ admin_id: adminId });
  const listQuery = useListUserMarkets({ admin_id: adminId });
  const createMutation = useCreateUserMarket();
  const deleteMutation = useDeleteUserMarket();

  const userMap = useMemo(() => {
    const items = usersQuery.data?.data?.items ?? [];
    const map = new Map<number, string>();
    items.forEach((u) => map.set(u.user_id, u.user_name));
    return map;
  }, [usersQuery.data]);

  const marketMap = useMemo(() => {
    const items = marketsQuery.data?.data?.items ?? [];
    const map = new Map<number, string>();
    items.forEach((m) => map.set(m.market_id, m.market_name));
    return map;
  }, [marketsQuery.data]);

  useEffect(() => {
    const items = listQuery.data?.data?.items ?? [];
    setUserMarkets(
      items.map((it) => {
        const added = it.added_on;
        const till = it.active_till ?? formatAddDays(added, it.days);
        return {
          id: it.id,
          userName: userMap.get(it.user_id) ?? String(it.user_id),
          game: marketMap.get(it.market_id) ?? String(it.market_id),
          addedOn: added,
          status: till ? `Active till ${till}` : 'Active',
        };
      }),
    );
  }, [listQuery.data, userMap, marketMap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userId || !formData.marketId || !formData.days) {
      Toast.error('Please select user, market and days');
      return;
    }
    try {
      const resp = await createMutation.mutateAsync({
        user_id: parseInt(formData.userId, 10),
        market_id: parseInt(formData.marketId, 10),
        days: parseInt(formData.days, 10),
        admin_id: adminId,
      });
      Toast.success(resp.message || 'Assignment created');
      await listQuery.refetch();
      setFormData({ userId: '', marketId: '', days: '30' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to assign market';
      Toast.error(message);
    }
  };

  // DELETE USER MARKET WITH CONFIRMATION
  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: 'Delete User Market?',
      text: `This will remove ${row.userName} from ${row.game}.`,
      confirmText: 'Delete',
      icon: 'warning',
    });

    if (!confirmed) return;
    try {
      const resp = await deleteMutation.mutateAsync({ id: row.id, admin_id: adminId });
      Toast.success(resp.message || `${row.userName} removed from ${row.game} successfully!`);
      await listQuery.refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete assignment';
      Toast.error(message);
    }
  };

  const columns = [
    { header: 'User Name', accessor: 'userName' },
    { header: 'Game', accessor: 'game' },
    { header: 'Added On', accessor: 'addedOn' },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => <span className="text-success font-medium">{value}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Add User Market Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User Name *</Label>
                <Select
                  value={formData.userId}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, userId: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {(usersQuery.data?.data?.items ?? []).map((u) => (
                      <SelectItem key={u.user_id} value={String(u.user_id)}>{u.user_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketId">Game *</Label>
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
                <Label htmlFor="days">No. of Days *</Label>
                <Input
                  id="days"
                  name="days"
                  type="number"
                  value={formData.days}
                  onChange={(e) => setFormData(prev => ({ ...prev, days: e.target.value }))}
                  placeholder="30"
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

      {/* User Markets Table */}
      <DataTable
        title="User Market Report"
        columns={columns}
        data={userMarkets}
        onDelete={onDelete}
        headerRight={<RefreshButton onClick={() => { void listQuery.refetch(); }} loading={listQuery.isFetching} />}
      />
    </div>
  );
};

export default AddUserMarket;

function formatAddDays(dateStr: string, days: number): string {
  if (!dateStr || !days) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
