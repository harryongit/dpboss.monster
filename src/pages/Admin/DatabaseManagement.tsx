import React, { useState, useMemo } from "react";
import { 
  Database, 
  Download, 
  Trash2, 
  RotateCw, 
  FileText, 
  HardDrive, 
  Table as TableIcon, 
  Clock,
  ShieldCheck,
  Zap,
  RefreshCw,
  ChevronLeft,
  Plus,
  Edit,
  Search,
  Filter,
  Save,
  X,
  ChevronRight,
  Terminal,
  Play,
  History,
  Users
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Toast } from "@/components/ui/ToastProvider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  useGetTables, 
  useGetTableSchema, 
  useGetTableData, 
  useInsertRow, 
  useUpdateRow, 
  useDeleteRow, 
  useExecuteQuery,
  useGetDbStats,
  useExportDb
} from "@/hooks/admin/useDatabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Pagination from "./DatabaseManagementComponents/Pagination";

const DatabaseManagement = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [rawQuery, setRawQuery] = useState("");
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [tableSearchTerm, setTableSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tablesPage, setTablesPage] = useState(1);
  const [tablesPageSize] = useState(20);

  // API Hooks
  const { data: dbStatsData, isLoading: isLoadingStats, refetch: refetchStats } = useGetDbStats();
  const { data: tablesData, isLoading: isLoadingTables, refetch: refetchTables } = useGetTables({
    page_no: tablesPage,
    page_size: tablesPageSize,
  });
  const { data: schemaData, isLoading: isLoadingSchema } = useGetTableSchema(selectedTable);
  const { data: tableData, isLoading: isLoadingData, refetch: refetchData } = useGetTableData(selectedTable, {
    page,
    page_size: pageSize,
    filters: searchTerm ? { [schema.columns[0]?.name || 'id']: searchTerm } : undefined
  });

  const insertMutation = useInsertRow(selectedTable || "");
  const updateMutation = useUpdateRow(selectedTable || "");
  const deleteMutation = useDeleteRow(selectedTable || "");
  const queryMutation = useExecuteQuery();
  const exportMutation = useExportDb();

  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName);
    setPage(1);
    setSearchTerm("");
  };

  const stats = useMemo(() => {
    const raw = dbStatsData?.data || {};
    return {
      database: raw.database || { name: "N/A", size_mb: 0, total_tables: 0, total_rows: 0 },
      connections: raw.connections || { active: 0, running: 0, max_allowed: 0 },
      performance: raw.performance || { queries_per_second: 0, uptime_seconds: 0 },
      storage: raw.storage || { used_mb: 0, usage_percent: 0 },
      indexes: raw.indexes || { total_indexes: 0 },
      activity: raw.activity || { active_users: 0 },
      backup: raw.backup || { last_backup: null, status: "unknown" },
      tables: raw.tables || []
    };
  }, [dbStatsData]);

  const tables = tablesData?.data?.tables || [];
  const totalTablesCount = tablesData?.data?.total_count || 0;
  const currentTablesPage = tablesData?.data?.page || tablesPage;
  const totalTablesPages = Math.ceil(totalTablesCount / tablesPageSize);
  const detailedTables = stats.tables;
  const schema = schemaData?.data || { columns: [], primary_keys: [] };
  const items = tableData?.data?.items || [];
  const totalCount = tableData?.data?.total_count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    return days > 0 ? `${days}d ${hours}h` : `${hours}h`;
  };

  
  const handleDownload = () => exportMutation.mutate();
 

  const handleRefreshAll = () => {
    refetchStats();
    refetchTables();
    Toast.success("Dashboard statistics updated!");
  };

  const handleEditRow = (row: any) => {
    setCurrentRow({ ...row });
    setIsEditing(true);
  };

  const handleDeleteRow = (row: any) => {
    const pk = schema.primary_keys[0] || 'id';
    const where = { [pk]: row[pk] };
    if (window.confirm(`Are you sure you want to delete this record?`)) {
      deleteMutation.mutate(where);
    }
  };

  const handleSaveRow = () => {
    const pk = schema.primary_keys[0] || 'id';
    if (currentRow[pk]) {
      // Update
      const where = { [pk]: currentRow[pk] };
      const { [pk]: _, ...data } = currentRow; // Don't send PK in update data if it's the identifier
      updateMutation.mutate({ where, data }, {
        onSuccess: () => setIsEditing(false)
      });
    } else {
      // Insert
      insertMutation.mutate(currentRow, {
        onSuccess: () => setIsEditing(false)
      });
    }
  };

  const handleRunQuery = () => {
    if (!rawQuery.trim()) return;
    queryMutation.mutate({ query: rawQuery }, {
      onSuccess: () => {
        setQueryHistory(prev => [rawQuery, ...prev.slice(0, 9)]);
      }
    });
  };

  if (selectedTable) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => { setSelectedTable(null); setPage(1); }}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Overview
          </Button>
          <div className="flex items-center gap-3">
             <Button onClick={() => { setCurrentRow({}); setIsEditing(true); }} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> Add New Record
             </Button>
          </div>
        </div>

        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <TableIcon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 uppercase tracking-wide">
                  Table: {selectedTable}
                </CardTitle>
                <p className="text-xs text-slate-500 font-medium">Total Records: {totalCount.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                   placeholder="Search records..." 
                   className="pl-9 w-64 h-9 text-sm"
                   value={searchTerm}
                   onChange={(e) => {
                     setSearchTerm(e.target.value);
                     setPage(1);
                   }}
                 />
               </div>
               <Button variant="outline" size="sm" onClick={() => refetchData()} className="h-9">
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingData ? "animate-spin" : ""}`} /> Refresh
               </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                    {schema.columns.map(col => (
                      <th key={col.name} className="px-6 py-4 border-b">
                        <div className="flex items-center gap-1">
                          {col.name}
                          {col.primary_key && <ShieldCheck className="h-3 w-3 text-amber-500" />}
                        </div>
                        <span className="text-[10px] font-normal text-slate-400 capitalize">{col.type}</span>
                      </th>
                    ))}
                    <th className="px-6 py-4 border-b text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoadingData ? (
                    <tr><td colSpan={schema.columns.length + 1} className="p-12 text-center text-slate-400">Loading data...</td></tr>
                  ) : items.length > 0 ? items.map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                      {schema.columns.map(col => (
                        <td key={col.name} className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                          {row[col.name]?.toString() || '-'}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-blue-600 hover:bg-blue-100"
                            onClick={() => handleEditRow(row)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-rose-600 hover:bg-rose-100"
                            onClick={() => handleDeleteRow(row)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={schema.columns.length + 1} className="px-6 py-12 text-center text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                           <FileText className="h-10 w-10 opacity-20" />
                           <p>No records found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={page}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </CardContent>
        </Card>

        {/* Edit/Add Modal */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {currentRow?.[schema.primary_keys[0] || 'id'] ? <Edit className="h-5 w-5 text-blue-500" /> : <Plus className="h-5 w-5 text-green-500" />}
                {currentRow?.[schema.primary_keys[0] || 'id'] ? `Edit Record` : `Add New Record`}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              {schema.columns.map(col => (
                <div key={col.name} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={col.name} className="text-right capitalize text-xs font-bold text-slate-500">
                    {col.name.replace('_', ' ')}
                    {col.primary_key && <span className="text-amber-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={col.name}
                    value={currentRow?.[col.name] || ""}
                    disabled={col.primary_key && !!currentRow?.[col.name]}
                    onChange={(e) => setCurrentRow({...currentRow, [col.name]: e.target.value})}
                    placeholder={col.nullable ? "(Optional)" : ""}
                    className="col-span-3 h-9"
                  />
                </div>
              ))}
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex items-center gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button 
                onClick={handleSaveRow} 
                disabled={insertMutation.isPending || updateMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                {(insertMutation.isPending || updateMutation.isPending) ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl p-6 shadow-lg overflow-hidden">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 -right-10 w-40 h-40 bg-indigo-400 rounded-full opacity-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Database className="h-7 w-7" /> SQLite Database Management
            </h2>
            <p className="text-blue-50/90 max-w-xl text-sm">
              Manage your application database tables and execute custom SQL queries directly from the admin panel.
            </p>
          </div>
          <Button 
            onClick={() => refetchTables()} 
            disabled={isLoadingTables}
            className="bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold rounded-lg backdrop-blur-sm transition-all"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingTables ? "animate-spin" : ""}`} />
            Refresh Tables
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tables" className="w-full">
        <TabsList className="bg-slate-100 p-1 mb-4">
          <TabsTrigger value="tables" className="flex items-center gap-2">
            <TableIcon className="h-4 w-4" /> Tables Overview
          </TabsTrigger>
          <TabsTrigger value="console" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" /> SQL Console
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-6">
          {/* Main Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatCard 
              title="Database Size" 
              value={`${stats.database.size_mb.toFixed(1)} MB`} 
              icon={HardDrive} 
              iconColor="text-blue-600" 
            />
            <StatCard 
              title="Total Tables" 
              value={stats.database.total_tables.toString()} 
              icon={TableIcon} 
              iconColor="text-indigo-600" 
            />
            <StatCard 
              title="Total Records" 
              value={stats.database.total_rows.toLocaleString()} 
              icon={FileText} 
              iconColor="text-purple-600" 
            />
            <StatCard 
              title="Last Backup" 
              value={stats.backup.last_backup ? new Date(stats.backup.last_backup).toLocaleDateString() : "Never"} 
              icon={Clock} 
              iconColor="text-amber-600" 
            />
          </div>

          {/* Secondary Stats: Performance & Health */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance</p>
                    <p className="text-lg font-bold text-slate-700">{stats.performance.queries_per_second} QPS</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uptime</p>
                  <p className="text-sm font-semibold text-emerald-600">{formatUptime(stats.performance.uptime_seconds)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Connections</p>
                    <p className="text-lg font-bold text-slate-700">{stats.connections.active} Active</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Limit</p>
                  <p className="text-sm font-semibold text-slate-500">{stats.connections.max_allowed}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Storage Usage</p>
                    <p className="text-lg font-bold text-slate-700">{stats.storage.usage_percent}%</p>
                  </div>
                </div>
                <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-1000" 
                    style={{ width: `${stats.storage.usage_percent}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Actions Card */}
            <Card className="lg:col-span-1 border-none shadow-md bg-white">
              <CardHeader className="border-b bg-slate-50/50">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <Zap className="h-5 w-5 text-amber-500" /> Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-indigo-600 border-indigo-100 hover:bg-indigo-50" 
                  onClick={handleDownload}
                  disabled={exportMutation.isPending}
                >
                  {exportMutation.isPending ? <RefreshCw className="mr-3 h-5 w-5 animate-spin" /> : <Download className="mr-3 h-5 w-5" />}
                  Download Latest DB (.sql)
                </Button>
              </CardContent>
            </Card>

            {/* Tables Overview */}
            <Card className="lg:col-span-2 border-none shadow-md bg-white overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                    <TableIcon className="h-5 w-5 text-blue-500" /> Tables List
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search tables..." 
                      className="pl-9 w-full sm:w-64 h-9 text-sm"
                      value={tableSearchTerm}
                      onChange={(e) => setTableSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold border-b">Table Name</th>
                        <th className="px-6 py-4 font-semibold border-b text-center">Rows</th>
                        <th className="px-6 py-4 font-semibold border-b text-center">Size</th>
                        <th className="px-6 py-4 font-semibold border-b text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoadingTables || isLoadingStats ? (
                        <tr><td colSpan={4} className="p-12 text-center text-slate-400">Loading tables...</td></tr>
                      ) : tables.length > 0 ? tables
                          .filter((t: any) => (t.name || t).toLowerCase().includes(tableSearchTerm.toLowerCase()))
                          .map((table: any) => {
                            const name = typeof table === 'string' ? table : table.name;
                            const rows = typeof table === 'string' ? '-' : (table.rows?.toLocaleString() || '0');
                            const size = typeof table === 'string' ? '-' : ((table.size_mb || 0).toFixed(2) + ' MB');
                            
                            return (
                              <tr 
                                key={name} 
                                className="hover:bg-blue-50/50 transition-all cursor-pointer group"
                                onClick={() => handleTableSelect(name)}
                              >
                                <td className="px-6 py-4 font-medium text-slate-700 flex items-center gap-2 uppercase tracking-wide">
                                  <TableIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                                  {name}
                                </td>
                                <td className="px-6 py-4 text-center text-slate-600">{rows}</td>
                                <td className="px-6 py-4 text-center text-slate-600">{size}</td>
                                <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="sm" className="text-blue-600 group-hover:bg-blue-100">
                                    Manage Data <ChevronRight className="h-4 w-4 ml-1" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          }) : (
                        <tr>
                          <td colSpan={4} className="p-12 text-center text-slate-400 italic">
                            No tables found
                          </td>
                        </tr>
                      )}
                      {tables.length > 0 && tables.filter((t: any) => (t.name || t).toLowerCase().includes(tableSearchTerm.toLowerCase())).length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-12 text-center text-slate-400 italic">
                            No tables matching "{tableSearchTerm}"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Tables Pagination */}
                <Pagination 
                  currentPage={currentTablesPage}
                  totalCount={totalTablesCount}
                  pageSize={tablesPageSize}
                  onPageChange={setTablesPage}
                  label="tables"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="console" className="space-y-6">
          <Card className="border-none shadow-md bg-white">
            <CardHeader className="border-b bg-slate-50/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <Terminal className="h-5 w-5 text-indigo-500" /> SQL Command Console
                </CardTitle>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" onClick={() => setRawQuery("")} className="text-slate-500">Clear</Button>
                   <Button onClick={handleRunQuery} disabled={queryMutation.isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      {queryMutation.isPending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      Execute Query
                   </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                   <Textarea 
                    placeholder="SELECT * FROM markets WHERE status = 'Active'..." 
                    className="min-h-[200px] font-mono text-sm bg-slate-900 text-blue-300 border-slate-700 p-4 focus:ring-indigo-500"
                    value={rawQuery}
                    onChange={(e) => setRawQuery(e.target.value)}
                   />
                   
                   {/* Results Area */}
                   {queryMutation.data && (
                     <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="bg-slate-50 border rounded-lg overflow-hidden">
                           <div className="bg-slate-100 px-4 py-2 border-b flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-600">Results: {queryMutation.data?.data?.row_count || 0} rows</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 text-[10px]" 
                                onClick={() => {
                                  navigator.clipboard.writeText(JSON.stringify(queryMutation.data?.data?.items, null, 2));
                                  Toast.success("Copied to clipboard");
                                }}
                              >
                                Copy JSON
                              </Button>
                           </div>
                           <div className="overflow-x-auto max-h-[400px]">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-white text-slate-500 text-[10px] uppercase font-bold">
                                    {queryMutation.data?.data?.columns?.map((col: string) => (
                                      <th key={col} className="px-4 py-2 border-b">{col}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                  {queryMutation.data?.data?.items?.map((item: any, i: number) => (
                                    <tr key={i} className="hover:bg-slate-50">
                                      {queryMutation.data?.data?.columns?.map((col: string) => (
                                        <td key={col} className="px-4 py-2 text-xs text-slate-600 font-mono">{item[col]?.toString() || 'NULL'}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                   )}
                </div>

                <div className="lg:col-span-1 space-y-4">
                   <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                        <History className="h-3 w-3" /> Recent History
                      </h4>
                      <div className="space-y-2">
                        {queryHistory.length > 0 ? queryHistory.map((q, i) => (
                          <div 
                            key={i} 
                            className="text-[10px] font-mono bg-white border p-2 rounded cursor-pointer hover:border-indigo-400 truncate text-slate-600"
                            onClick={() => setRawQuery(q)}
                            title={q}
                          >
                            {q}
                          </div>
                        )) : <p className="text-[10px] text-slate-400 italic">No history yet</p>}
                      </div>
                   </div>

                   <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="text-xs font-bold text-blue-700 uppercase mb-2 flex items-center gap-2">
                        <Zap className="h-3 w-3" /> Pro Tips
                      </h4>
                      <ul className="text-[10px] text-blue-600 space-y-2 list-disc pl-4">
                        <li>Always use <b>LIMIT</b> for large tables.</li>
                        <li>Back up before running <b>DELETE</b> or <b>UPDATE</b>.</li>
                        <li>SQL console runs with admin privileges.</li>
                      </ul>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseManagement;
