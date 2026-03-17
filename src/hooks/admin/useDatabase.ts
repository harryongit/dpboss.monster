import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { databaseService } from '@/services/admin/database';
import { Toast } from '@/components/ui/ToastProvider';

export const useGetDbStats = () => {
  return useQuery({
    queryKey: ['admin', 'db', 'dashboard-stats'],
    queryFn: databaseService.getDashboardStats,
  });
};

export const useExportDb = () => {
  return useMutation({
    mutationFn: databaseService.exportDatabase,
    onSuccess: (response) => {
      // Create a link and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Try to get filename from content-disposition
      const contentDisposition = response.headers['content-disposition'];
      let fileName = `db_export_${new Date().toISOString().split('T')[0]}.sql`;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch?.[1]) fileName = fileNameMatch[1];
      }
      
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      Toast.success('Database export downloaded');
    },
    onError: (error: any) => {
      Toast.error('Failed to export database');
    },
  });
};

export const useGetTables = (params?: { page_no?: number; page_size?: number }) => {
  return useQuery({
    queryKey: ['admin', 'db', 'tables', params],
    queryFn: () => databaseService.getTables(params),
  });
};

export const useGetTableSchema = (tableName: string | null) => {
  return useQuery({
    queryKey: ['admin', 'db', 'schema', tableName],
    queryFn: () => databaseService.getTableSchema(tableName!),
    enabled: !!tableName,
  });
};

export const useGetTableData = (tableName: string | null, params: {
  page?: number;
  page_size?: number;
  filters?: Record<string, any>;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}) => {
  return useQuery({
    queryKey: ['admin', 'db', 'data', tableName, params],
    queryFn: () => databaseService.getTableData(tableName!, params),
    enabled: !!tableName,
  });
};

export const useInsertRow = (tableName: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, any>) => databaseService.insertRow(tableName, data),
    onSuccess: (response) => {
      if (response.status_code === 200 || response.status === 200) {
        Toast.success('Row inserted successfully');
        queryClient.invalidateQueries({ queryKey: ['admin', 'db', 'data', tableName] });
      } else {
        Toast.error(response.message || 'Failed to insert row');
      }
    },
    onError: (error: any) => {
      Toast.error(error.response?.data?.message || 'Error inserting row');
    },
  });
};

export const useUpdateRow = (tableName: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ where, data }: { where: Record<string, any>; data: Record<string, any> }) =>
      databaseService.updateRow(tableName, where, data),
    onSuccess: (response) => {
      if (response.status_code === 200 || response.status === 200) {
        Toast.success('Row updated successfully');
        queryClient.invalidateQueries({ queryKey: ['admin', 'db', 'data', tableName] });
      } else {
        Toast.error(response.message || 'Failed to update row');
      }
    },
    onError: (error: any) => {
      Toast.error(error.response?.data?.message || 'Error updating row');
    },
  });
};

export const useDeleteRow = (tableName: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (where: Record<string, any>) => databaseService.deleteRow(tableName, where),
    onSuccess: (response) => {
      if (response.status_code === 200 || response.status === 200) {
        Toast.success('Row deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['admin', 'db', 'data', tableName] });
      } else {
        Toast.error(response.message || 'Failed to delete row');
      }
    },
    onError: (error: any) => {
      Toast.error(error.response?.data?.message || 'Error deleting row');
    },
  });
};

export const useExecuteQuery = () => {
  return useMutation({
    mutationFn: ({ query, params }: { query: string; params?: Record<string, any> }) =>
      databaseService.executeQuery(query, params),
    onSuccess: (response) => {
      if (response.status_code === 200 || response.status === 200) {
        Toast.success('Query executed successfully');
      } else {
        Toast.error(response.message || 'Query execution failed');
      }
    },
    onError: (error: any) => {
      Toast.error(error.response?.data?.message || 'Error executing query');
    },
  });
};
