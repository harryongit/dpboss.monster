import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/http';
import { Toast } from '@/components/ui/ToastProvider';

interface SubmitParams {
  kalyan36bazar_number_id: number;
  result_value: string;
}

interface SubmitResponse {
  status_code: number;
  message: string;
}

async function submitResult(params: SubmitParams): Promise<SubmitResponse> {
  const { data } = await api.post('/common/kalyan36bazar_resultupload_publiclink', params);
  if (data?.status_code !== 201) {
     const msg = typeof data?.message === 'string' ? data.message : 'Failed to upload result';
     throw new Error(msg);
  }
  return data as SubmitResponse;
}

export function useKalyan36BazarPublicUploadSubmit() {
  const queryClient = useQueryClient();
  return useMutation<SubmitResponse, Error, SubmitParams>({
    mutationFn: submitResult,
    onSuccess: (resp) => {
      Toast.success(resp.message || 'Result uploaded successfully');
      void queryClient.invalidateQueries({ queryKey: ['common', 'kalyan36bazar', 'public-upload-slots'] });
      void queryClient.invalidateQueries({ queryKey: ['common', 'kalyan36bazar', 'today'] });
    },
    onError: (err: Error) => {
      Toast.error(err.message || 'Failed to submit result');
    }
  });
}
