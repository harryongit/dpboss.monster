import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useGetMarketDetails } from '@/hooks/admin/useGetMarketDetails';
import { useUpdateMarket } from '@/hooks/admin/useUpdateMarket';
import { Toast } from "@/components/ui/ToastProvider";

interface Props {
  open: boolean;
  onClose: () => void;
  marketId?: number;
  onUpdated?: () => void;
}

export const MarketEditModal = ({ open, onClose, marketId, onUpdated }: Props) => {
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

  const { data, isFetching } = useGetMarketDetails(marketId, adminId, open);
  const updateMutation = useUpdateMarket();

  const item = data?.data?.item;
  const [name, setName] = useState('');
  const [days, setDays] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [openStartTime, setOpenStartTime] = useState('');
  const [openStopTime, setOpenStopTime] = useState('');
  const [closeStartTime, setCloseStartTime] = useState('');
  const [closeStopTime, setCloseStopTime] = useState('');
  const [chartType, setChartType] = useState('normal');
  const [sequence, setSequence] = useState('');
  const [liveResultSequence, setLiveResultSequence] = useState('');
  const [color, setColor] = useState('#000000');
  const [domain, setDomain] = useState('smboss.net');

  const format12 = (t: string) => {
    if (!t) return '';
    const parts = t.split(':');
    const hh = parseInt(parts[0] || '0', 10);
    const mm = parts[1] || '00';
    const suffix = hh >= 12 ? 'PM' : 'AM';
    const hour12 = ((hh + 11) % 12) + 1;
    return `${hour12}:${mm} ${suffix}`;
  };

  useEffect(() => {
    if (item) {
      const toHHMM = (t?: string) => t ? (t.length >= 5 ? t.slice(0,5) : t) : '';
      setName(item.game_name ?? item.game ?? item.name ?? '');
      setDays(String(item.days ?? ''));
      setOpenTime(toHHMM(item.open_time));
      setCloseTime(toHHMM(item.close_time));
      setOpenStartTime(toHHMM(item.open_start_time));
      setOpenStopTime(toHHMM(item.open_stop_time));
      setCloseStartTime(toHHMM(item.close_start_time));
      setCloseStopTime(toHHMM(item.close_stop_time));
      setChartType(item.chart_type === 'standard' ? 'normal' : item.chart_type ?? 'normal');
      setSequence(String(item.sequence ?? ''));
      setLiveResultSequence(String(item.live_result_sequence ?? ''));
      setColor(item.color );
      setDomain(item.domain ?? 'smboss.net');
    }
  }, [item]);

  const canSubmit = useMemo(() => name && days && openTime && closeTime , [name, days, openTime, closeTime]);

  const handleUpdate = async () => {
    if (!canSubmit) {
      Toast.error('Please fill all required fields');
      return;
    }
    try {
      const payload = {
        market_id: marketId ?? item?.market_id ?? 0,
        admin_id: adminId,
        name,
        days: parseInt(days, 10),
        open_time: openTime,
        close_time: closeTime,
        open_start_time: openStartTime || undefined,
        open_stop_time: openStopTime || undefined,
        close_start_time: closeStartTime || undefined,
        close_stop_time: closeStopTime || undefined,
        chart_type: chartType,
        sequence: parseInt(sequence, 10),
        live_result_sequence: liveResultSequence ? parseInt(liveResultSequence, 10) : undefined,
        color,
        domain,
      };
      const resp = await updateMutation.mutateAsync(payload);
      Toast.success(resp?.message ?? 'Market updated');
      onClose();
      onUpdated?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update market';
      Toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v ? onClose() : void 0}>
      <DialogContent className="sm:!max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Market</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Game Name *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Game Days</Label>
              <Select value={days} onValueChange={(v) => setDays(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="2">2 Days</SelectItem>
                  <SelectItem value="3">3 Days</SelectItem>
                  <SelectItem value="4">4 Days</SelectItem>
                  <SelectItem value="5">5 Days</SelectItem>
                  <SelectItem value="6">6 Days</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Open Time *</Label>
                {openTime && (
                  <span className="text-xs text-muted-foreground">({format12(openTime)})</span>
                )}
              </div>
              <Input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Close Time *</Label>
                {closeTime && (
                  <span className="text-xs text-muted-foreground">({format12(closeTime)})</span>
                )}
              </div>
              <Input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Open Start Time</Label>
                {openStartTime && (
                  <span className="text-xs text-muted-foreground">({format12(openStartTime)})</span>
                )}
              </div>
              <Input type="time" value={openStartTime} onChange={(e) => setOpenStartTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Open Stop Time</Label>
                {openStopTime && (
                  <span className="text-xs text-muted-foreground">({format12(openStopTime)})</span>
                )}
              </div>
              <Input type="time" value={openStopTime} onChange={(e) => setOpenStopTime(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Close Start Time</Label>
                {closeStartTime && (
                  <span className="text-xs text-muted-foreground">({format12(closeStartTime)})</span>
                )}
              </div>
              <Input type="time" value={closeStartTime} onChange={(e) => setCloseStartTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Close Stop Time</Label>
                {closeStopTime && (
                  <span className="text-xs text-muted-foreground">({format12(closeStopTime)})</span>
                )}
              </div>
              <Input type="time" value={closeStopTime} onChange={(e) => setCloseStopTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Chart Type </Label>
            <Select value={chartType} onValueChange={(v) => setChartType(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="extra">Extra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Sequence </Label>
              <Input type="number" value={sequence} onChange={(e) => setSequence(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Live Result Sequence</Label>
              <Input type="number" value={liveResultSequence} onChange={(e) => setLiveResultSequence(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Color </Label>
              <Select value={color} onValueChange={(v) => setColor(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="#ff0000">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      Red
                    </div>
                  </SelectItem>
                  <SelectItem value="#00ff00">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      Green
                    </div>
                  </SelectItem>
                  <SelectItem value="#0000ff">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      Blue
                    </div>
                  </SelectItem>
                  <SelectItem value="#ffff00">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                      Yellow
                    </div>
                  </SelectItem>
                  <SelectItem value="#ff7f00">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                      Orange
                    </div>
                  </SelectItem>
                  <SelectItem value="#ffc0cb">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                      Pink
                    </div>
                  </SelectItem>
                  <SelectItem value="#800080">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                      Purple
                    </div>
                  </SelectItem>
                  <SelectItem value="#000000">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-black"></span>
                      Black
                    </div>
                  </SelectItem>
                  <SelectItem value="#ffffff">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-white border border-gray-400"></span>
                      White
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Domain</Label>
              <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose} disabled={updateMutation.isPending}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={!canSubmit || updateMutation.isPending || isFetching}>
              {updateMutation.isPending ? (
                <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Updating...</span>
              ) : 'Update'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};