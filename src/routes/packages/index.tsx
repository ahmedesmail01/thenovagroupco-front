import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import api from "../../lib/api";
import { CourseFilters } from "../../features/courses/CourseFilters";
import { CourseGridSkeleton } from "../../features/courses/CourseGridSkeleton";
import { CourseCard } from "../../components/ui/CourseCard";
import { Pagination } from "../../components/ui/Pagination";
import { Button } from "../../components/ui/Button";

export function CoursesPage() {
  const [filters, setFilters] = useState<any>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["courses", filters, page],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise((r) => setTimeout(r, 800));
      const response = await api.get("/courses", {
        params: { ...filters, page },
      });
      return response.data;
    },
    // For demo purposes, returning mock data if API fails
    initialData: {
      courses: [
        {
          id: "1",
          title: "Modern UI/UX Design Essentials",
          category: "Design",
          level: "Beginner",
          hours: 12,
          price: 49,
          thumbnail:
            "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
          rating: 4.8,
          students: 250,
        },
        {
          id: "2",
          title: "Full-Stack React & Node Mastery",
          category: "Development",
          level: "Intermediate",
          hours: 45,
          price: 129,
          thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
          rating: 4.9,
          students: 1200,
        },
        {
          id: "3",
          title: "Financial Freedom & Stock Investing",
          category: "Finance",
          level: "All Level",
          hours: 8,
          price: 29,
          thumbnail:
            "https://images.unsplash.com/photo-1611974714851-2bc70460391d?q=80&w=2070&auto=format&fit=crop",
          rating: 4.5,
          students: 450,
        },
        {
          id: "4",
          title: "Professional Marketing Strategy",
          category: "Marketing",
          level: "Expert",
          hours: 22,
          price: 89,
          thumbnail:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
          rating: 4.7,
          students: 890,
        },
      ],
      total: 48,
      totalPages: 5,
    },
  });

  return (
    <div className="bg-brand-navy min-h-screen">
      {/* Hero banner */}
      <div className="relative pt-32 pb-20 bg-hero-gradient flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-[2px]" />
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Evolve Your <span className="text-brand-blue">Skills</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light">
            Discover the most essential courses to accelerate your professional
            journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Results header + mobile filter toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
          <p className="text-text-secondary text-lg">
            <span className="text-white font-bold">{data?.total || 0}</span>{" "}
            results found for you
          </p>
          <button
            className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-3 text-sm text-white font-bold border border-brand-border rounded-xl px-6 py-3 bg-brand-surface hover:bg-white/5 transition-all"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="text-lg">⚙</span> Filters & Categories
          </button>
        </div>

        <div className="flex gap-12 items-start">
          {/* Sidebar */}
          <aside
            className={`
            lg:block lg:w-72 lg:flex-shrink-0 lg:sticky lg:top-24
            ${
              mobileFiltersOpen
                ? "fixed inset-0 z-50 bg-brand-navy overflow-y-auto p-8"
                : "hidden"
            }
          `}
          >
            <div className="flex items-center justify-between mb-10 lg:hidden">
              <h2 className="text-2xl font-black text-white">Filters</h2>
              <button
                className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
                onClick={() => setMobileFiltersOpen(false)}
              >
                ✕
              </button>
            </div>
            <CourseFilters
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setPage(1);
              }}
            />
            {mobileFiltersOpen && (
              <div className="mt-10">
                <Button
                  className="w-full h-14"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            )}
          </aside>

          {/* Course grid */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <CourseGridSkeleton />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                {data?.courses.map((course: any) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewDetails={(id) =>
                      navigate({
                        to: "/packages/$courseId",
                        params: { courseId: id },
                      })
                    }
                    onPackage={(id) => console.log("package", id)}
                  />
                ))}
              </div>
            )}

            <div className="mt-20 border-t border-brand-border pt-10">
              <Pagination
                current={page}
                total={data?.totalPages ?? 5}
                onChange={setPage}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
