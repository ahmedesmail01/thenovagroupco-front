import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface WeeklyEarning {
  week: number;
  total: number;
}

export interface MonthlyBounce {
  month: string;
  total: number;
}

export interface WalletDataResponse {
  status: boolean;
  total_earnings: number;
  total_receive: number;
  total_transfer: number;
  total_bounce: number;
  weekly_earnings: WeeklyEarning[];
  monthly_bounce: MonthlyBounce[];
  balance: string;
  token_wallet_balance: string;
  pending_earnings: string;
  personal_purchases: number;
  total_payout: number;
  profit_gained: number;
}

export type WalletFilter = "last_7_days" | "last_month" | "last_year" | "now";

export const useWalletData = (filter: WalletFilter = "last_7_days") => {
  return useQuery<WalletDataResponse>({
    queryKey: ["walletData", filter],
    queryFn: async () => {
      const response = await api.get("/member/wallet");
      const raw = response.data;

      return {
        ...raw,
        total_earnings: Number(raw.total_earnings || 0),
        total_receive: Number(raw.total_receive || 0),
        total_transfer: Number(raw.total_transfer || 0),
        total_bounce: Number(raw.total_bounce || 0),
        personal_purchases: Number(raw.personal_purchases || 0),
        total_payout: Number(raw.total_payout || 0),
        profit_gained: Number(raw.profit_gained || 0),
        weekly_earnings:
          raw.weekly_earnings?.map(
            (w: { week: number; total: string | number }) => ({
              ...w,
              total: Number(w.total || 0),
            }),
          ) || [],
        monthly_bounce:
          raw.monthly_bounce?.map(
            (m: { month: string; total: string | number }) => ({
              ...m,
              total: Number(m.total || 0),
            }),
          ) || [],
        balance: String(raw.balance || "0"),
        token_wallet_balance: String(raw.token_wallet_balance || "0"),
        pending_earnings: Number(raw.pending_earnings || 0),
      };
    },
    staleTime: 0,
  });
};
