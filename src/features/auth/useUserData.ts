import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface PackageFeatures {
  "Loyalty program": boolean;
  "Trade alert": boolean;
  "Beginner course": boolean;
  "Basics course": boolean;
  "Live trading": boolean;
  "Live sessions": boolean;
  "Advance course": boolean;
  "Expert course": boolean;
  "Expert plus course": boolean;
  "One Scanners": boolean;
  "Affiliate program": boolean;
}

export interface Package {
  id: number;
  name: string;
  price: string;
  billing_period: string;
  cv: number;
  features: PackageFeatures;
  pack_card: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  member_id: number;
  package_id: number;
  subscribed_at: string;
  created_at: string;
  updated_at: string;
  expiration_date: string;
  package: Package;
}

export interface Member {
  id: number;
  user_id: number;
  sponsor_id: number | null;
  left_leg_id: number | null;
  right_leg_id: number | null;
  current_cv: number;
  totla_left_volume: number;
  totla_right_volume: number;
  total_commision: string;
  is_first: string;
  created_at: string;
  updated_at: string;
  rank_id: number;
  sponsor: any | null;
  subscription: Subscription;
}

export interface UserData {
  id: number;
  id_code: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  phone: string | null;
  status: string;
  image: string;
  member: Member;
}

export interface Profile {
  user_first_name: string;
  user_last_name: string;
  sponsor_name: string | null;
  sponsor_id_code: unknown | null;
  subscription: string;
  id_code: number;
  current_cv: number;
  total_left_leg_cv: number;
  total_right_leg_cv: number;
  status: string;
  phone: string | null;
}

export interface UserDataResponse {
  status: boolean;
  message: string;
  "user data": UserData;
  subscription: string;
  sponsor: any | null;
  profile: Profile;
}

/**
 * Custom hook to fetch user data using React Query
 */
export const useUserData = (userId?: string | number) => {
  return useQuery<UserDataResponse>({
    queryKey: ["userData", userId],
    queryFn: async () => {
      const url = userId ? `/user/data/${userId}` : "/user/data";
      const response = await api.get(url);
      return response.data;
    },
    // Cache for 5 minutes, consider it stale after 1 minute
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
};

/**
 * Custom hook to fetch direct downline members
 */
export interface DownlineMember {
  user_id: number;
  id_code: number;
  full_name: string;
  subscription: { name: string } | string | null;
}

export interface DownlineResponse {
  status: boolean;
  members: {
    left_leg_member: DownlineMember | null;
    right_leg_member: DownlineMember | null;
  };
}

export const useDownline = (userId?: number | string) => {
  return useQuery<DownlineResponse>({
    queryKey: ["downline", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await api.get(`/get-direct-downline-members/${userId}`);

      // Handle the case where the API returns a string message instead of an object
      if (typeof response.data === "string") {
        return {
          status: false,
          members: {
            left_leg_member: null,
            right_leg_member: null,
          },
        };
      }

      return response.data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache downlines for longer
  });
};
