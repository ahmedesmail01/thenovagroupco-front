import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";
import { useAuthStore } from "../../features/auth/useAuthStore";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { CourseCard } from "../../components/ui/CourseCard";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";

export const Route = createFileRoute("/packages/$courseId")({
  component: CourseDetailPage,
});

function CourseDetailPage() {
  const { courseId } = Route.useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setLoginModalOpen = useAuthStore((s) => s.setLoginModalOpen);

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 600));
      return {
        id: courseId,
        title: "Modern UI/UX Design Essentials",
        description:
          "Master the art of creating stunning user interfaces and intuitive user experiences from scratch.",
        thumbnail:
          "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop",
        price: 49,
        duration: "12 Hours",
        learningOutcomes:
          "You will learn how to design professional-grade websites and mobile apps.",
        moduleCount: 6,
        totalHours: 12,
        availableForPackages: ["Basic", "Premium", "Pro"],
        availableForGroups: ["Designers", "Product Managers"],
        skills: ["UI Design", "UX Research", "Figma", "Prototyping"],
        modules: [
          {
            id: "m1",
            title: "Introduction to UI/UX",
            chapterCount: 3,
            chapters: [{ id: "c1", title: "What is UI/UX?" }],
          },
        ],
        relatedCourses: [
          {
            id: "r1",
            title: "Advanced Prototyping",
            category: "Design",
            price: 79,
            thumbnail:
              "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1760&auto=format&fit=crop",
          },
        ],
      };
    },
  });

  if (isLoading)
    return (
      <div className="pt-32 text-center text-white">Loading Course...</div>
    );

  return (
    <div className="bg-brand-navy min-h-screen text-text-primary">
      <div className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs
            items={[
              { label: "All Courses", to: "/packages" },
              { label: course?.title || "Details" },
            ]}
          />
        </div>

        <div className="bg-brand-surface/30 border-y border-brand-border backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-[500px] flex-shrink-0 aspect-video bg-black rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
              <img
                src={course?.thumbnail}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                alt={course?.title}
              />
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white text-brand-navy flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </button>
            </div>
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {course?.title}
              </h1>
              <p className="text-text-secondary text-lg font-light">
                {course?.description}
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div className="text-4xl font-black text-white">
                  ${course?.price}
                </div>
                <Button
                  size="lg"
                  className="px-10 h-14"
                  onClick={() => !isAuthenticated && setLoginModalOpen(true)}
                >
                  {isAuthenticated ? "Enroll Now" : "Join to Enroll"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-20">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white">Course Content</h2>
            <div className="space-y-4">
              {course?.modules.map((mod: any) => (
                <details
                  key={mod.id}
                  className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                    <span className="font-bold text-white text-lg">
                      {mod.title}
                    </span>
                    <span className="text-text-secondary group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-6 pt-0 border-t border-brand-border/50">
                    <ul className="space-y-4 pt-4">
                      {mod.chapters.map((c: any) => (
                        <li key={c.id} className="text-sm text-text-secondary">
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
