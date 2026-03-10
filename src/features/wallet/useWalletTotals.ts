import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface WalletTotalsResponse {
  status: boolean;
  total_earnings: number;
  total_receive: number;
  total_transfer: number;
  total_bounce: number;
}

export const useWalletTotals = () => {
  return useQuery<WalletTotalsResponse>({
    queryKey: ["walletTotals"],
    queryFn: async () => {
      const response = await api.get("/wallet-totals");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
