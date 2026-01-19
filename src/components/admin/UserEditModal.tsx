import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useGetUserDetails } from '@/hooks/admin/useGetUserDetails';
import { useUpdateUser } from '@/hooks/admin/useUpdateUser';
import { Toast } from "@/components/ui/ToastProvider";

interface Props {
  open: boolean;
  onClose: () => void;
  userId?: number;
  onUpdated?: () => void;
}

export const UserEditModal = ({ open, onClose, userId, onUpdated }: Props) => {
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

  const getDetails = useGetUserDetails();
  const updateMutation = useUpdateUser();

  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (open && userId) {
        try {
          const resp = await getDetails.mutateAsync({ user_id: userId, admin_id: adminId });
          const user = resp.data.user;
          setUsername(user.username ?? '');
          setMobile(user.mobile ?? '');
          setPassword(user.password ?? '');
          Toast.success(resp.message || 'User fetched');
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'Failed to fetch user';
          Toast.error(message);
        }
      }
    };
    void fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId]);

  const canSubmit = useMemo(() => username && mobile && password, [username, mobile, password]);

  const handleUpdate = async () => {
    if (!canSubmit || !userId) {
      Toast.error('Please fill all required fields');
      return;
    }
    try {
      const resp = await updateMutation.mutateAsync({
        user_id: userId,
        username,
        mobile,
        password,
        admin_id: adminId,
      });
      Toast.success(resp.message || 'User updated');
      onUpdated?.();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update user';
      Toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v ? onClose() : void 0}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>User Name *</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Mobile *</Label>
            <Input value={mobile} maxLength={10} onChange={(e) => setMobile(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Password *</Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} disabled={updateMutation.isPending}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={!canSubmit || updateMutation.isPending}>
              {updateMutation.isPending ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};