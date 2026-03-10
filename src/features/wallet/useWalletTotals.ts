import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface WalletTotalsResponse {
  status: boolean;
  total_earnings: number;
  total_receive: number;
  total_transfer: number;
  total_bounce: number;
}

export interface CurrentBalanceResponse {
  status: boolean;
  balance: string;
}

export interface TokenWalletBalanceResponse {
  status: boolean;
  token_wallet_balance: string;
}

export interface WeeklyEarning {
  week: number;
  total: number;
}

export interface MonthlyBounce {
  month: string;
  total: number;
}

export interface WalletReportsResponse {
  status: boolean;
  weekly_earnings: WeeklyEarning[];
  monthly_bounce: MonthlyBounce[];
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

export const useCurrentBalance = () => {
  return useQuery<CurrentBalanceResponse>({
    queryKey: ["currentBalance"],
    queryFn: async () => {
      const response = await api.get("/current-balance");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTokenWalletBalance = () => {
  return useQuery<TokenWalletBalanceResponse>({
    queryKey: ["tokenWalletBalance"],
    queryFn: async () => {
      const response = await api.get("/token-wallet-balance");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useWalletReports = () => {
  return useQuery<WalletReportsResponse>({
    queryKey: ["walletReports"],
    queryFn: async () => {
      const response = await api.get("/wallet-reports");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
