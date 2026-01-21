
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/common/DataTable";
import { Toast } from "@/components/ui/ToastProvider";
import { confirmSwal } from "@/lib/ConfirmSwal";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useAdminListMarkets } from "@/hooks/admin/useListMarkets";
import { RefreshButton } from "@/components/ui/refresh-admin";
import { useCreateMarket } from "@/hooks/admin/useCreateMarket";
import { MarketEditModal } from "@/components/admin/MarketEditModal";
import { useDeleteMarket } from "@/hooks/admin/useDeleteMarket";
import { Loader2 } from "lucide-react";

const AddMarket = () => {
  const [formData, setFormData] = useState({
    gameName: "",
    gameDays: "",
    openTime: "",
    closeTime: "",
    openStartTime: "",
    openStopTime: "",
    closeStartTime: "",
    closeStopTime: "",
    chart: "",
    liveResultSequence: "",
    sequenceNumber: "",
    color: "",
    domain: "smboss.net",
  });

  const [markets, setMarkets] = useState([] as { id: number; gameName: string; openTime: string; closeTime: string }[]);
  const { data, isFetching, refetch } = useAdminListMarkets();
  const createMutation = useCreateMarket();
  const deleteMutation = useDeleteMarket();
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | undefined>(undefined);
  useEffect(() => {
    const items = data?.data?.items ?? [];
    if (items.length) {
      setMarkets(
        items.map((m: any) => ({
          id: m.market_id ?? m.id,
          gameName: m.game_name ?? m.name,
          openTime: m.open_time,
          closeTime: m.close_time,
        })),
      );
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gameName) {
      Toast.error("Please enter game name");
      return;
    }
    if (!formData.openTime || !formData.closeTime) {
      Toast.error("Please enter open/close time");
      return;
    }
    // if (!formData.chart) {
    //   Toast.error("Please select chart type");
    //   return;
    // }
    // if (!formData.sequenceNumber) {
    //   Toast.error("Please enter sequence number");
    //   return;
    // }
    // if (!formData.color) {
    //   Toast.error("Please select color");
    //   return;
    // }

    const colorHexMap: Record<string, string> = {
      Red: '#ff0000',
      Green: '#00ff00',
      Blue: '#0000ff',
      Yellow: '#ffff00',
      Orange: '#ff7f00',
      Pink: '#ffc0cb',
      Purple: '#800080',
      Black: '#000000',
      White: '#ffffff',
    };
    const colorHex = colorHexMap[formData.color];
    // if (!colorHex) {
    //   Toast.error("Invalid color selected");
    //   return;
    // }

    const toApiTime = (t: string) => t;
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
      const chartType = formData.chart;
      const hexRegex = /^#([0-9A-Fa-f]{6})$/;
      const colorValue = hexRegex.test(formData.color) ? formData.color : colorHex;

      const payload = {
        admin_id: adminId,
        name: formData.gameName,
        days: parseInt(formData.gameDays || '7', 10),
        open_time: toApiTime(formData.openTime),
        close_time: toApiTime(formData.closeTime),
        open_start_time: formData.openStartTime || undefined,
        open_stop_time: formData.openStopTime || undefined,
        close_start_time: formData.closeStartTime || undefined,
        close_stop_time: formData.closeStopTime || undefined,
        chart_type: chartType,
        sequence: parseInt(formData.sequenceNumber ),
        live_result_sequence: formData.liveResultSequence ? parseInt(formData.liveResultSequence) : undefined,
        color: colorValue,
        domain: 'smboss.net',
      };
      const resp = await createMutation.mutateAsync(payload);
      const apiMsg = resp?.message ?? 'Market created';
      const marketId = resp?.data?.market_id;
      Toast.success(marketId ? `${apiMsg} (ID: ${marketId})` : apiMsg);
      await refetch();
      setFormData({
        gameName: "",
        gameDays: "",
        openTime: "",
        closeTime: "",
        openStartTime: "",
        openStopTime: "",
        closeStartTime: "",
        closeStopTime: "",
        chart: "",
        liveResultSequence: "",
        sequenceNumber: "",
        color: "",
        domain: "smboss.net",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create market';
      Toast.error(message);
    }
  };

  // Delete market with confirmation
  const onDelete = async (row: { id: number; gameName: string }) => {
    const confirmed = await confirmSwal({
      title: "Delete Market?",
      text: `This will permanently delete ${row.gameName}.`,
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
      const resp = await deleteMutation.mutateAsync({ market_id: row.id, admin_id: adminId });
      Toast.success(resp?.message ?? `${row.gameName} deleted successfully`);
      await refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete market';
      Toast.error(message);
    }
  };

  const columns = [
    { header: "Game Name", accessor: "gameName" },
    { header: "Open Time", accessor: "openTime" },
    { header: "Close Time", accessor: "closeTime" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
        
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Game Name */}
              <div className="space-y-2">
                <Label>Game Name *</Label>
                <Input
                  name="gameName"
                  value={formData.gameName}
                  onChange={handleInputChange}
                  placeholder="Enter game name"
                 
                />
              </div>

              {/* Game Days Number */}
              <div className="space-y-2">
                <Label>Game Days</Label>
                <Select
                  value={formData.gameDays}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, gameDays: value }))
                  }
                >
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

              {/* Open Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Open Time *</Label>
                  {formData.openTime && (
                    <span className="text-xs text-muted-foreground">({format12(formData.openTime)})</span>
                  )}
                </div>
                <Input
                  type="time"
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleInputChange}
                
                />
              </div>

              {/* Close Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Close Time *</Label>
                  {formData.closeTime && (
                    <span className="text-xs text-muted-foreground">({format12(formData.closeTime)})</span>
                  )}
                </div>
                <Input
                  type="time"
                  name="closeTime"
                  value={formData.closeTime}
                  onChange={handleInputChange}
                  
                />
              </div>

              {/* Open Start Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Open Start Time</Label>
                  {formData.openStartTime && (
                    <span className="text-xs text-muted-foreground">({format12(formData.openStartTime)})</span>
                  )}
                </div>
                <Input
                  type="time"
                  name="openStartTime"
                  value={formData.openStartTime}
                  onChange={handleInputChange}
                />
              </div>

              {/* Open Stop Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Open Stop Time</Label>
                  {formData.openStopTime && (
                    <span className="text-xs text-muted-foreground">({format12(formData.openStopTime)})</span>
                  )}
                </div>
                <Input
                  type="time"
                  name="openStopTime"
                  value={formData.openStopTime}
                  onChange={handleInputChange}
                />
              </div>

              {/* Close Start Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Close Start Time</Label>
                  {formData.closeStartTime && (
                    <span className="text-xs text-muted-foreground">({format12(formData.closeStartTime)})</span>
                  )}
                </div>
                <Input
                  type="time"
                  name="closeStartTime"
                  value={formData.closeStartTime}
                  onChange={handleInputChange}
                />
              </div>

              {/* Close Stop Time */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Close Stop Time</Label>
                  {formData.closeStopTime && (
                    <span className="text-xs text-muted-foreground">({format12(formData.closeStopTime)})</span>
                  )}
                </div>
                <Input
                  type="time"
                  name="closeStopTime"
                  value={formData.closeStopTime}
                  onChange={handleInputChange}
                />
              </div>

              {/* Chart Dropdown */}
              <div className="space-y-2">
                <Label>Chart </Label>

                <Select
                  value={formData.chart}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, chart: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Chart Type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="extra">Extra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sequence Number */}
              <div className="space-y-2">
                <Label>Sequence Number </Label>
                <Input
                  type="number"
                  name="sequenceNumber"
                  value={formData.sequenceNumber}
                  onChange={handleInputChange}
                  placeholder="Enter sequence number"
                 
                />
              </div>

              {/* Live Result Sequence */}
              <div className="space-y-2">
                <Label>Live Result Sequence</Label>
                <Input
                  type="number"
                  name="liveResultSequence"
                  value={formData.liveResultSequence}
                  onChange={handleInputChange}
                  placeholder="Enter sequence"
                />
              </div>

              {/* Color Dropdown */}
              <div className="space-y-2">
                <Label>Color </Label>

                <Select
                  value={formData.color}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, color: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>

                  <SelectContent>
  <SelectItem value="Red">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-red-500"></span>
      Red
    </div>
  </SelectItem>

  <SelectItem value="Green">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-green-500"></span>
      Green
    </div>
  </SelectItem>

  <SelectItem value="Blue">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
      Blue
    </div>
  </SelectItem>

  <SelectItem value="Yellow">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
      Yellow
    </div>
  </SelectItem>

  <SelectItem value="Orange">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-orange-500"></span>
      Orange
    </div>
  </SelectItem>

  <SelectItem value="Pink">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-pink-500"></span>
      Pink
    </div>
  </SelectItem>

  <SelectItem value="Purple">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-purple-500"></span>
      Purple
    </div>
  </SelectItem>

  <SelectItem value="Black">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-black"></span>
      Black
    </div>
  </SelectItem>

  <SelectItem value="White">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-white border border-gray-400"></span>
      White
    </div>
  </SelectItem>
</SelectContent>


                </Select>
              </div>
            </div>

            {/* Domain */}
            <div className="space-y-2">
              <Label>Domain (Fixed)</Label>
              <Input
                value="smboss.net"
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-success hover:bg-success/90 text-success-foreground px-8"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </span>
                ) : 'Submit'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

    
        <DataTable
          title="Market Report"
          columns={columns}
          data={markets}
          headerRight={<RefreshButton onClick={() => { void refetch(); }} loading={isFetching} />}
          onEdit={(row) => { setEditId(row.id); setEditOpen(true); }}
          onDelete={onDelete} 
        />
      {/* )} */}

      <MarketEditModal
        open={editOpen}
        marketId={editId}
        onClose={() => setEditOpen(false)}
        onUpdated={() => { void refetch(); }}
      />
    </div>
  );
};

export default AddMarket;

function format12(t: string) {
  if (!t) return '';
  const parts = t.split(':');
  const hh = parseInt(parts[0] || '0', 10);
  const mm = parts[1] || '00';
  const suffix = hh >= 12 ? 'PM' : 'AM';
  const hour12 = ((hh + 11) % 12) + 1;
  return `${hour12}:${mm} ${suffix}`;
}
