import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export interface TopEarner {
  id_code: number;
  name: string;
  total_commission: string;
  rank: string;
}

export interface RankPerformance {
  rank: string;
  left: number;
  right: number;
}

export interface PackagePerformance {
  package: string;
  left: number;
  right: number;
}

export interface NewMember {
  id_code: number;
  name: string;
  joined_at: string;
  rank: string;
  package: string;
}

export interface TeamFilters {
  start_date: string | null;
  end_date: string | null;
  days: number;
}

export interface TeamPerformanceResponse {
  top_earners: TopEarner[];
  rank_overview: RankPerformance[];
  package_overview: PackagePerformance[];
  new_members: NewMember[];
  filters: TeamFilters;
}

export const useTeamPerformance = (filters?: Partial<TeamFilters>) => {
  return useQuery<TeamPerformanceResponse>({
    queryKey: ["teamPerformance", filters],
    queryFn: async () => {
      const response = await api.get("/team-performance", { params: filters });
      return response.data;
    },
    staleTime: 0,
  });
};
