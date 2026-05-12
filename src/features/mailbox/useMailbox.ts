import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import type {
  ApiResponse,
  PaginatedResponse,
  InboxMessage,
  SentMessage,
  ComposeMessageDto,
} from "./types";

export const useInbox = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ["mailbox", "inbox", page, perPage],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginatedResponse<InboxMessage>>>(
        `/messages/inbox`,
        { params: { page, per_page: perPage } }
      );
      return response.data;
    },
  });
};

export const useSentMessages = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ["mailbox", "sent", page, perPage],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginatedResponse<SentMessage>>>(
        `/messages/sent`,
        { params: { page, per_page: perPage } }
      );
      return response.data;
    },
  });
};

export const useTrashMessages = (page = 1, perPage = 20) => {
  return useQuery({
    queryKey: ["mailbox", "trash", page, perPage],
    queryFn: async () => {
      const response = await api.get<ApiResponse<PaginatedResponse<InboxMessage>>>(
        `/messages/trash`,
        { params: { page, per_page: perPage } }
      );
      return response.data;
    },
  });
};

export const useMessageDetails = (id: number | null) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["mailbox", "message", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await api.get<ApiResponse<InboxMessage | SentMessage>>(
        `/messages/${id}`
      );
      // Invalidate inbox to refresh unread count / status if we just read it
      queryClient.invalidateQueries({ queryKey: ["mailbox", "inbox"] });
      return response.data;
    },
    enabled: !!id,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ComposeMessageDto) => {
      const response = await api.post<ApiResponse<any>>("/messages/compose", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "sent"] });
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post<ApiResponse<any>>(`/messages/${id}/read`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "inbox"] });
    },
  });
};

export const useMoveToTrash = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post<ApiResponse<any>>(`/messages/${id}/trash`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "inbox"] });
      queryClient.invalidateQueries({ queryKey: ["mailbox", "sent"] });
      queryClient.invalidateQueries({ queryKey: ["mailbox", "trash"] });
    },
  });
};

export const useRestoreMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.post<ApiResponse<any>>(`/messages/${id}/restore`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailbox", "inbox"] });
      queryClient.invalidateQueries({ queryKey: ["mailbox", "trash"] });
    },
  });
};
