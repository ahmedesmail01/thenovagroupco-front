import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

// ─── Types ────────────────────────────────────────────────────
export interface PromotionalTool {
  id?: number;
  title: string;
  description: string;
  thumbnail: string;
  pdf_link: string;
  created_at?: string | null;
  updated_at?: string | null;
}

// ─── Dummy Data (Fallback) ────────────────────────────────────
const DUMMY_PROMOTIONAL_TOOLS: PromotionalTool[] = [
  {
    title: "Nova Group Introduction",
    description: "A comprehensive overview of Nova Group's services and mission.",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pdf_link: "#",
  },
  {
    title: "Compensation Plan 2026",
    description: "Detailed breakdown of the updated compensation and reward structure.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pdf_link: "#",
  },
  {
    title: "Product Catalog",
    description: "Explore our latest digital products and educational courses.",
    thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pdf_link: "#",
  },
  {
    title: "Event Flyer - Summer Summit",
    description: "Promotional flyer for the upcoming annual summer summit event.",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pdf_link: "#",
  },
];

// ─── Query Keys ───────────────────────────────────────────────
export const promotionalKeys = {
  all: () => ["promotional-tools"] as const,
};

// ─── Hooks ────────────────────────────────────────────────────
export function usePromotionalTools() {
  return useQuery<PromotionalTool[]>({
    queryKey: promotionalKeys.all(),
    queryFn: async (): Promise<PromotionalTool[]> => {
      try {
        
        // Fetch from the real endpoint
        const response = await api.get("/promotional-tools");
        
        // Return data. We assume it's returning { data: PromotionalTool[] } or similar structure
        // Adjust depending on actual API response structure (e.g. response.data.data)
        if (response.data && Array.isArray(response.data)) {
          return response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          return response.data.data;
        }
        
        throw new Error("Invalid response format");
      } catch (error) {
        console.warn("Failed to fetch promotional tools, falling back to dummy data:", error);
        // Fallback to dummy data
        return DUMMY_PROMOTIONAL_TOOLS;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
