import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface PackageDetails {
  id: number;
  name: string;
  price: string;
  level: number;
  billing_period: string;
  cv: number;
  features: Record<string, boolean>;
  pack_card: string | null;
  pack_icon: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id?: number;
  member_id?: number;
  package_id?: number;
  subscription_price?: string;
  payment_method: string;
  subscribed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  expiration_date?: string;
  package?: PackageDetails;
  package_name: string;
  billing_period: string;
  price: string;
  cv: number;
}

export interface SubscriptionResponse {
  status: boolean;
  message: string;
  subscription: Subscription[] | null;
}

export const useSubscription = () => {
  return useQuery<SubscriptionResponse>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await api.get<SubscriptionResponse>("/billing/subscription");
      return response.data;
    },
    staleTime: 0,
  });
};
