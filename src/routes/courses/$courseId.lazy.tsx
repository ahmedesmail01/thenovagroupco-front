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
    <div className="bg-brand-navy min-h-screen text-white">
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
        <div className="bg-brand-surface border-y border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 items-start">
            {/* Video thumbnail */}
            <div className="w-full md:w-96 flex-shrink-0 aspect-video bg-brand-navy rounded-xl overflow-hidden relative group cursor-pointer border border-brand-border">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/courses/placeholder.jpg";
                }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-2xl hover:bg-white/50 transition-colors">
                  ▶
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="inline-block bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-light text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                {course.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                {course.title}
              </h1>
              <p className="text-text-secondary mt-3 leading-relaxed text-sm sm:text-base">
                {course.description}
              </p>
              <p className="text-3xl font-bold text-white mt-4">
                ${course.price}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate({ to: "/login" });
                    }
                  }}
                >
                  {isAuthenticated ? "Enroll Now" : "Login to Enroll"}
                </Button>
                {!isAuthenticated && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => navigate({ to: "/login" })}
                  >
                    Preview Course
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course details */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
          {/* Duration */}
          <section className="text-center py-8 border-b border-brand-border">
            <p className="text-text-muted text-xs uppercase tracking-widest font-bold mb-2">
              Course Duration
            </p>
            <p className="text-5xl font-black text-white">
              {course.duration} Hours
            </p>
          </section>

          {/* What You'll Learn */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1 h-6 bg-brand-blue rounded-full" />
              What You Will Learn
            </h2>
            <p className="text-text-secondary leading-relaxed bg-brand-surface border border-brand-border rounded-xl p-6">
              {course.learningOutcomes}
            </p>
          </section>

          {/* Course Content accordion */}
          <section>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
              <span className="w-1 h-6 bg-brand-blue rounded-full" />
              Course Content
            </h2>
            <p className="text-text-muted text-sm mb-4">
              {course.moduleCount} Modules · {course.totalHours} Hours total
            </p>
            <div className="flex flex-col gap-3">
              {course.modules.map((mod) => (
                <details
                  key={mod.id}
                  className="bg-white rounded-xl overflow-hidden group cursor-pointer"
                >
                  <summary className="flex items-center justify-between px-5 py-4 font-semibold text-gray-800 list-none hover:bg-gray-50 transition-colors">
                    <span>{mod.title}</span>
                    <span className="text-text-muted text-sm flex items-center gap-2">
                      {mod.chapterCount} Chapters
                      <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform inline-block">
                        ▼
                      </span>
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
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-brand-blue rounded-full" />
              Available For
            </h2>
            <div className="flex flex-col gap-6 bg-brand-surface border border-brand-border rounded-xl p-6">
              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest font-bold mb-3">
                  Packages
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.availableForPackages.map((p) => (
                    <span
                      key={p}
                      className="px-4 py-1.5 rounded-full bg-brand-blue text-white text-sm font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest font-bold mb-3">
                  Groups
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.availableForGroups.map((g) => (
                    <span
                      key={g}
                      className="px-4 py-1.5 rounded-full border border-brand-border text-text-secondary text-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-widest font-bold mb-3">
                  Skills You Will Gain
                </p>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-1.5 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue-light text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related courses */}
          <section>
            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-3">
              <span className="w-1 h-6 bg-brand-blue rounded-full" />
              Other Courses of the Author
            </h2>
            <p className="text-text-muted text-sm mb-6">
              Other courses from the same publisher
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
  );
}
