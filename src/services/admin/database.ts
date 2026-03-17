import { api } from '@/lib/http';

export interface TableSchema {
  table_name: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
    primary_key: boolean;
  }[];
  primary_keys: string[];
}

export interface TableDataResponse {
  table_name: string;
  total_count: number;
  page: number;
  page_size: number;
  items: any[];
}

export interface QueryResponse {
  columns: string[];
  items: any[];
  row_count: number;
}

export interface DashboardStats {
  database: {
    name: string;
    size_mb: number;
    total_tables: number;
    total_rows: number;
  };
  connections: {
    active: number;
    running: number;
    max_allowed: number;
  };
  performance: {
    queries_per_second: number;
    uptime_seconds: number;
  };
  storage: {
    used_mb: number;
    usage_percent: number;
  };
  tables: {
    name: string;
    rows: number;
    size_mb: number;
    last_updated: string;
  }[];
  indexes: {
    total_indexes: number;
  };
  activity: {
    recent_queries: any[];
    active_users: number;
  };
  alerts: any[];
  backup: {
    last_backup: string | null;
    status: string;
  };
}

export const databaseService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/db/dashboard/table-stats');
    return response.data;
  },

  exportDatabase: async () => {
    // For file downloads, we typically want the blob
    const response = await api.get('/admin/db/export', { responseType: 'blob' });
    return response;
  },

  getTables: async (params?: { page_no?: number; page_size?: number }) => {
    const response = await api.get('/admin/db/tables', { params });
    return response.data;
  },

  getTableSchema: async (tableName: string) => {
    const response = await api.get(`/admin/db/tables/${tableName}/schema`);
    return response.data;
  },

  getTableData: async (tableName: string, params: {
    page?: number;
    page_size?: number;
    filters?: Record<string, any>;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }) => {
    const response = await api.post(`/admin/db/tables/${tableName}/data`, params);
    return response.data;
  },

  insertRow: async (tableName: string, data: Record<string, any>) => {
    const response = await api.post(`/admin/db/tables/${tableName}/insert`, { data });
    return response.data;
  },

  updateRow: async (tableName: string, where: Record<string, any>, data: Record<string, any>) => {
    const response = await api.put(`/admin/db/tables/${tableName}/update`, { where, data });
    return response.data;
  },

  deleteRow: async (tableName: string, where: Record<string, any>) => {
    const response = await api.delete(`/admin/db/tables/${tableName}/delete`, { data: { where } });
    return response.data;
  },

  executeQuery: async (query: string, params?: Record<string, any>) => {
    const response = await api.post('/admin/db/query', { query, params });
    return response.data;
  },
};
