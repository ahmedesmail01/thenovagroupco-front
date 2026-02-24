import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  useCourses,
  type CourseFiltersType,
} from "../../features/courses/courseQueries";
import { CourseFilters } from "../../features/courses/CourseFilters";
import { CourseGridSkeleton } from "../../features/courses/CourseGridSkeleton";
import { CourseCard } from "../../components/ui/CourseCard";
import { Pagination } from "../../components/ui/Pagination";

export const Route = createLazyFileRoute("/courses/")({
  component: CoursesPage,
});

function CoursesPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CourseFiltersType>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useCourses(filters, page);

  const handleFilterChange = (newFilters: CourseFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const ui = (
    <div className="bg-brand-navy min-h-screen">
      {/* Hero banner */}
      <div className="relative pt-16 h-52 bg-hero-gradient flex flex-col items-center justify-center text-center border-b border-brand-border">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background image – place hero-courses-bg.jpg in /public/images/ */}
          <img
            src="/images/hero-courses-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-10 pointer-events-none"
            aria-hidden="true"
          />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Courses</h1>
          <p className="text-text-secondary mt-2 text-sm sm:text-base">
            Discover the Best Courses to Develop Your Skills
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results header + mobile filter toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted text-sm">
            <span className="text-white font-semibold">
              {data?.total?.toLocaleString() ?? "—"}
            </span>{" "}
            results found
          </p>
          <button
            className="lg:hidden flex items-center gap-2 text-sm text-white border border-brand-border rounded-lg px-3 py-2 bg-brand-surface hover:bg-white/5 transition-colors"
            onClick={() => setMobileFiltersOpen(true)}
          >
            ⚙ Filters &amp; Categories
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <aside
            className={`lg:block lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-24
              ${
                mobileFiltersOpen
                  ? "fixed inset-0 z-50 bg-brand-navy overflow-y-auto p-6"
                  : "hidden"
              }`}
          >
            {mobileFiltersOpen && (
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <button
                  className="text-white w-8 h-8 flex items-center justify-center bg-white/10 rounded-full"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  ✕
                </button>
              </div>
            )}
            <CourseFilters filters={filters} onChange={handleFilterChange} />
          </aside>

          {/* Mobile overlay backdrop */}
          {mobileFiltersOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileFiltersOpen(false)}
            />
          )}

          {/* Course grid */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <CourseGridSkeleton />
            ) : !data?.courses.length ? (
              <div className="py-24 text-center">
                <p className="text-6xl mb-4">📚</p>
                <h3 className="text-xl font-bold text-white mb-2">
                  No courses found
                </h3>
                <p className="text-text-secondary text-sm">
                  Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewDetails={(id) =>
                      navigate({
                        to: "/courses/$courseId",
                        params: { courseId: id },
                      })
                    }
                    onPackage={(id) =>
                      navigate({
                        to: "/courses/$courseId",
                        params: { courseId: id },
                      })
                    }
                  />
                ))}
              </div>
            )}

            {data && data.totalPages > 1 && (
              <Pagination
                current={page}
                total={data.totalPages}
                onChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-10"
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );

  console.log(ui);

  return <>Courses page</>;
}
