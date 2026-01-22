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
  data: {
    result_id: number;
  };
}

// Extract message safely from API response
function extractMessage(src: any): string {
  if (typeof src?.message === 'string') return src.message;

  if (Array.isArray(src?.detail)) {
    const msg = src.detail
      .map((d: any) =>
        typeof d?.msg === 'string'
          ? d.msg
          : typeof d?.message === 'string'
          ? d.message
          : ''
      )
      .filter(Boolean)
      .join(', ');

    if (msg) return msg;
  }

  if (typeof src?.error === 'string') return src.error;
  if (typeof src === 'string') return src;

  return 'Something went wrong';
}

// API call
async function postCreateResult(
  body: CreateResultRequest
): Promise<CreateResultResponse> {
  try {
    const { data } = await api.post('/admin/create/result', body);

    // ✅ Accept success status codes
    if (data?.status_code === 200 || data?.status_code === 201) {
      return data as CreateResultResponse;
    }

    // ❌ Generic error only (removed "already exists" message)
    throw new Error(extractMessage(data));

  } catch (error: any) {
    const resp = error?.response;

    // ❌ Generic error only
    const msg = extractMessage(resp?.data);

    throw new Error(msg);
  }
}

// React Query Hook
export function useCreateResult() {
  return useMutation<CreateResultResponse, Error, CreateResultRequest>({
    mutationFn: postCreateResult,
  });
}
