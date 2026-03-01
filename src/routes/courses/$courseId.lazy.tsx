import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCourse } from "../../features/courses/courseQueries";
import { useAuthStore } from "../../features/auth/useAuthStore";
import { Button } from "../../components/ui/Button";
import { CourseCard } from "../../components/ui/CourseCard";

export const Route = createLazyFileRoute("/courses/$courseId")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourse(courseId);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isLoading) {
    return (
      <div className="bg-brand-navy min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-text-secondary">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <>
      <div className="bg-white min-h-screen text-[#1D2026]">
        <div className="pt-16">
          {/* Back link */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/courses"
              className="text-text-secondary text-sm hover:text-white flex items-center gap-1 w-fit transition-colors"
            >
              ← Back to All Courses
            </Link>
          </div>

          {/* Hero: video thumbnail + course info */}
          <div className="bg-[#0D1B2A] border-b border-brand-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Video thumbnail */}
              <div className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-brand-border/30 shadow-2xl">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/courses/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#458FCE] text-xl shadow-xl transform group-hover:scale-110 transition-transform">
                    <span className="ml-1">▶</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  {course.title}
                </h1>
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {course.description}
                </p>
                <div className="text-3xl font-bold text-white mb-8">
                  ${course.price}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="w-full sm:w-auto rounded-full bg-[#458FCE] hover:bg-[#3b7db5] px-10 py-4 text-lg font-bold"
                    onClick={() => {
                      if (!isAuthenticated) {
                        navigate({ to: "/login" });
                      }
                    }}
                  >
                    {isAuthenticated ? "Enroll Now" : "Login to Enroll"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Course details */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
            {/* Duration */}
            <section className="text-center py-16">
              <h2 className="text-2xl font-bold text-[#1D2026] mb-4">
                Course Duration
              </h2>
              <p className="text-5xl font-medium text-[#4E5566]">
                {course.duration.includes(":")
                  ? course.duration
                  : `${course.duration}:00:00`}
              </p>
            </section>

            {/* What You'll Learn */}
            <section>
              <h2 className="text-3xl font-bold text-[#1D2026] mb-6">
                What You Will Learn
              </h2>
              <p className="text-[#4E5566] text-lg leading-relaxed">
                {course.learningOutcomes}
              </p>
            </section>

            {/* Course Content */}
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#1D2026]">
                  Course Content
                </h2>
                <p className="text-[#999DA3] text-sm mt-2">
                  {course.moduleCount} Modules | {course.totalHours} Hours total
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {course.modules.map((mod) => (
                  <details
                    key={mod.id}
                    className="bg-[#F9F9F9] rounded-xl overflow-hidden group cursor-pointer border border-[#E9EAF0]"
                  >
                    <summary className="flex items-center justify-between px-6 py-5 font-semibold text-[#1D2026] list-none hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-[#4E5566] group-open:rotate-180 transition-transform inline-block text-xs">
                          ▼
                        </span>
                        <span>{mod.title}</span>
                      </div>
                      <span className="text-[#4E5566] text-sm font-medium">
                        {mod.chapterCount} Chapters
                      </span>
                    </summary>
                    <ul className="px-5 pb-4 space-y-1 border-t border-gray-100">
                      {mod.chapters.map((c) => (
                        <li
                          key={c.id}
                          className="text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0 flex items-center gap-2"
                        >
                          <span className="text-gray-300">▸</span>
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            {/* Available For */}
            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-[#1D2026]">
                Available for
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-[#4E5566] text-sm font-bold mb-3 uppercase tracking-wider">
                    Packages
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {course.availableForPackages.map((p) => (
                      <span
                        key={p}
                        className="px-8 py-2.5 rounded-full bg-[#1A334B] text-white text-sm font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[#4E5566] text-sm font-bold mb-3 uppercase tracking-wider">
                    Groups
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {course.availableForGroups.map((g) => (
                      <span
                        key={g}
                        className="px-8 py-2.5 rounded-full bg-[#458FCE] text-white text-sm font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[#4E5566] text-sm font-bold mb-3 uppercase tracking-wider">
                    Skills You Will Gain
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {course.skills.map((s) => (
                      <span
                        key={s}
                        className="px-8 py-2.5 rounded-full bg-[#1A334B] text-white text-sm font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="pt-12 border-t border-brand-border/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-[#1D2026]">
                  Other Courses Of the Author
                </h2>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-[#E9EAF0] flex items-center justify-center text-[#999DA3] hover:bg-gray-50 transition-colors">
                    ←
                  </button>
                  <button className="w-10 h-10 rounded-full border border-[#E9EAF0] flex items-center justify-center text-[#458FCE] bg-[#E8F1F8] hover:bg-[#D1E5F3] transition-colors">
                    →
                  </button>
                </div>
              </div>
              <p className="text-[#999DA3] text-sm mb-10">
                Other courses from the Same publisher
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:mx-0 sm:px-0">
                {course.relatedCourses.map((c) => (
                  <div key={c.id} className="min-w-[260px] sm:min-w-0">
                    <CourseCard
                      course={c}
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
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
