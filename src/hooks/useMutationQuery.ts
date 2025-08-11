import { httpDelete, httpGet, httpPost, httpPut } from "@/utils/axios/services";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

interface MutationParams<TArgs> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: TArgs;
  headers?: HeadersInit;
}
interface UseMutationParams<TResponse, TArgs> {
  mutationParams: MutationParams<TArgs>;
  invalidateTags?: QueryKey;
  errorInvalidateTags?: QueryKey;

  options?: UseMutationOptions<TResponse, unknown, TArgs, unknown>;
}

export function useMutationQuery<TResponse, TArgs>({
  mutationParams,
  invalidateTags,
  options,
  errorInvalidateTags,
}: UseMutationParams<TResponse, TArgs>) {
  const queryClient = useQueryClient();
  return useMutation<TResponse, unknown, TArgs>({
    mutationFn: async (body) => {
      if (mutationParams.method === "PUT")
        return await httpPut<TResponse, TArgs>(mutationParams.url, body);
      if (mutationParams.method === "DELETE")
        return await httpDelete<TResponse>(mutationParams.url);
      if (mutationParams.method === "GET")
        return await httpGet<TResponse>(mutationParams.url);
      return await httpPost<TResponse, TArgs>(mutationParams.url, body);
    },
    ...options,
    onSuccess: async (data: TResponse, variables: TArgs, context: unknown) => {
      if (invalidateTags) {
        invalidateTags.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      if (options?.onSuccess) options?.onSuccess(data, variables, context);
    },
    onError: async (error: unknown, variables: TArgs, context: unknown) => {
      if (errorInvalidateTags) {
        errorInvalidateTags.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }
      if (options?.onError) options?.onError(error, variables, context);
    },
  });
}
