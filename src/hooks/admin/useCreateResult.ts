import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateResultRequest {
  date: string;
  market_id: number;
  result_number: string;
  admin_id: number;
}

interface CreateResultResponse {
  status_code: number;
  message: string;
  data: { result_id: number };
}

function extractMessage(src: any): string {
  if (typeof src?.message === 'string') return src.message;
  if (Array.isArray(src?.detail)) {
    const m = src.detail.map((d: any) => (typeof d?.msg === 'string' ? d.msg : typeof d?.message === 'string' ? d.message : '')).filter(Boolean).join(', ');
    if (m) return m;
  }
  if (typeof src?.error === 'string') return src.error;
  if (typeof src === 'string') return src;
  return '';
}

async function postCreateResult(body: CreateResultRequest): Promise<CreateResultResponse> {
  try {
    const { data } = await api.post('/admin/create/result', body);
    if (data?.status_code === 201) return data as CreateResultResponse;
    const msg = extractMessage(data) || (data?.status_code === 400 ? 'Result already exist on this date so please change entry' : 'Failed to create result');
    throw new Error(msg);
  } catch (error: any) {
    const resp = error?.response;
    const msg = extractMessage(resp?.data) || (resp?.status === 400 ? 'Result already exist on this date so please change entry' : 'Failed to create result');
    throw new Error(msg);
  }
}

export function useCreateResult() {
  return useMutation<CreateResultResponse, Error, CreateResultRequest>({
    mutationFn: (body) => postCreateResult(body),
  });
}