import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface WeeklyEarning {
  week: number;
  total: number | string;
}

export interface MonthlyBounce {
  month: string;
  total: number | string;
}

export interface WalletDataResponse {
  status: boolean;
  total_earnings: number | string;
  total_receive: number | string;
  total_transfer: number | string;
  total_bounce: number | string;
  weekly_earnings: WeeklyEarning[];
  monthly_bounce: MonthlyBounce[];
  balance: number | string;
  token_wallet_balance: number | string;
}

export const useWalletData = () => {
  return useQuery<WalletDataResponse>({
    queryKey: ["walletData"],
    queryFn: async () => {
      const response = await api.get("/member/wallet");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
