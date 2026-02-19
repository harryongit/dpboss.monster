

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { toast } from "sonner";
import { Edit, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Toast } from "@/components/ui/ToastProvider";
// Import the reusable confirmation
import { confirmSwal } from "@/lib/ConfirmSwal";
import { useAdminListUsers } from "@/hooks/admin/useListUsers";
import { RefreshButton } from "@/components/ui/refresh-admin";
import { useGetUserDetails } from "@/hooks/admin/useGetUserDetails";
import { useCreateUser } from "@/hooks/admin/useCreateUser";
import { useUpdateUser } from "@/hooks/admin/useUpdateUser";
import { useUpdateUserStatus } from "@/hooks/admin/useUpdateUserStatus";
import { UserEditModal } from "@/components/admin/UserEditModal";
import { useDeleteUser } from "@/hooks/admin/useDeleteUser";
import { Switch } from "@/components/ui/switch";
import { useUpdateUserFreeFix } from "@/hooks/admin/useUpdateUserFreeFix";


const UserRegister = () => {
  const [formData, setFormData] = useState({
    userName: "",
    mobileNo: "",
    password: "",
  });
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const [editUserId, setEditUserId] = useState<number | null>(null);
  const getDetailsMutation = useGetUserDetails();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const updateStatusMutation = useUpdateUserStatus();
  const deleteMutation = useDeleteUser();

  const [users, setUsers] = useState([] as { id: number; userName: string; password: string; mobile: string; registerOn: string; status: string; freeFixFlag?: number }[]);
  const { data, isFetching, refetch } = useAdminListUsers();
  const updateUserFreeFixMutation = useUpdateUserFreeFix();
  const [pendingToggleId, setPendingToggleId] = useState<number | null>(null);
  useEffect(() => {
    const items = data?.data?.items ?? [];
    setUsers(
      items.map((u) => ({
        id: u.id,
        userName: u.username,
        password: u.password,
        mobile: u.mobile,
        registerOn: (u as any).created_date ?? "-",
        status: u.status === 1 ? "Active" : "Inactive",
        freeFixFlag: (u as any).free_fix_flag,
      }))
    );
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      if (editUserId) {
        const resp = await updateMutation.mutateAsync({
          user_id: editUserId,
          username: formData.userName,
          mobile: formData.mobileNo,
          password: formData.password,
          admin_id: adminId,
        });
        Toast.success(resp.message || 'User updated');
        await refetch();
        setEditUserId(null);
      } else {
        const resp = await createMutation.mutateAsync({
          username: formData.userName,
          mobile: formData.mobileNo,
          password: formData.password,
          admin_id: adminId,
          free_fix_flag: 1,
        });
        Toast.success(resp.message || 'User created');
        await refetch();
      }
      setFormData({ userName: "", mobileNo: "", password: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Request failed';
      Toast.error(message);
    }
  };

  // ---------------------------
  // Toggle Status
  // ---------------------------
  const toggleStatus = async (row: any) => {
    const action = row.status === "Active" ? "Deactivate" : "Activate";
    const confirmed = await confirmSwal({
      title: `${action} User?`,
      text: `Are you sure you want to ${action.toLowerCase()} ${row.userName}?`,
      confirmText: action,
    });

    if (!confirmed) return;
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
    try {
      const newStatus = row.status === 'Active' ? 0 : 1;
      const resp = await updateStatusMutation.mutateAsync({ user_id: row.id, status: newStatus, admin_id: adminId });
      await refetch();
      Toast.success(resp.message || `${row.userName} ${action}d successfully!`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      Toast.error(message);
    }
  };

  // ---------------------------
  // Delete User
  // ---------------------------
  const onDelete = async (row: any) => {
    const confirmed = await confirmSwal({
      title: "Delete User?",
      text: `This will permanently delete ${row.userName}.`,
      confirmText: "Delete",
      icon: "warning",
    });

    if (!confirmed) return;
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
    try {
      const resp = await deleteMutation.mutateAsync({ user_id: row.id, admin_id: adminId });
      await refetch();
      Toast.success(resp.message || `${row.userName} deleted successfully!`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete user';
      Toast.error(message);
    }
  };

  const [editOpen, setEditOpen] = useState(false);
  const onEdit = (row: any) => {
    setEditUserId(row.id);
    setEditOpen(true);
  };

  // ---------------------------
  // Table Config
  // ---------------------------
  const columns = [
    { header: "User Name", accessor: "userName" },
    { header: "Password", accessor: "password" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Register On", accessor: "registerOn" },
    {
      header: "Free Fix",
      accessor: "freeFixFlag",
      cell: (_value: any, row: any) => {
        const checked = (row.freeFixFlag ?? 1) === 1;
        const loading = pendingToggleId === row.id && updateUserFreeFixMutation.isPending;
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={checked}
              disabled={loading}
              onCheckedChange={async (v) => {
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
                setPendingToggleId(row.id);
                try {
                  const next = v ? 1 : 0;
                  const resp = await updateUserFreeFixMutation.mutateAsync({ user_id: row.id, free_fix_flag: next, admin_id: adminId });
                  Toast.success(resp.message || "Free fix flag updated");
                  setUsers((prev) => prev.map((r) => r.id === row.id ? { ...r, freeFixFlag: next } : r));
                } catch (err: unknown) {
                  const message = err instanceof Error ? err.message : 'Failed to update free fix';
                  Toast.error(message);
                } finally {
                  setPendingToggleId(null);
                }
              }}
            />
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </div>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value: string) => (
        <span
          className={
            value === "Active"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {value}
        </span>
      ),
    },
  ];

  const customActions = (row: any) => (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="icon"
        className="bg-blue-600 text-white hover:bg-blue-700 rounded-full"
        onClick={() => onEdit(row)}
      >
        <Edit size={18} />
      </Button>

      <Button
        variant="default"
        size="icon"
        className="bg-red-600 text-white hover:bg-red-700 rounded-full"
        onClick={() => onDelete(row)}
      >
        <Trash2 size={18} />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={
          row.status === "Active"
            ? "border-red-600 text-red-600 hover:bg-red-50"
            : "border-green-600 text-green-600 hover:bg-green-50"
        }
        onClick={() => toggleStatus(row)}
      >
        {row.status === "Active" ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="userName">User Name *</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNo">Mobile Number *</Label>
                <Input
                  id="mobileNo"
                  name="mobileNo"
                  maxLength={10}
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  type="tel"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showCreatePassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowCreatePassword((v) => !v)}
                    aria-label={showCreatePassword ? 'Hide password' : 'Show password'}
                  >
                    {showCreatePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

     
        <DataTable
          title="Users Report"
          columns={columns}
          data={users}
          customActions={customActions}
          headerRight={<RefreshButton onClick={() => { void refetch(); }} loading={isFetching} />}
        />
      {/* )} */}

      <UserEditModal
        open={editOpen}
        userId={editUserId ?? undefined}
        onClose={() => setEditOpen(false)}
        onUpdated={() => { void refetch(); }}
      />
    </div>
  );
};

export default UserRegister;
