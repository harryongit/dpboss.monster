import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface SubmitRequest {
  cmmstargold_number_id: number;
  result_value: string;
}

interface SubmitResponse {
  status_code: number;
  message: string;
  data?: { result_id: number };
}

async function postSubmit(body: SubmitRequest): Promise<SubmitResponse> {
  const { data } = await api.post('/common/cmmstargold_resultupload_publiclink', body);
  if (data?.status_code !== 201) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to upload result';
    throw new Error(message);
  }
  return data as SubmitResponse;
}

export function useCmmStarGoldPublicUploadSubmit() {
  return useMutation<SubmitResponse, Error, SubmitRequest>({
    mutationFn: (body) => postSubmit(body),
  });
}
