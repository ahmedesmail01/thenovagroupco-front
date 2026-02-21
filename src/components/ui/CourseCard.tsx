import { Button } from "./Button";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  duration: string;
  chapters: number;
  description: string;
  completedPercent: number;
}

interface CourseCardProps {
  course: Course;
  onViewDetails: (id: string) => void;
  onPackage: (id: string) => void;
}

export function CourseCard({
  course,
  onViewDetails,
  onPackage,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition-all duration-300 flex flex-col group border border-transparent hover:border-brand-blue/20">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-brand-blue/90 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm">
          {course.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between text-[11px] text-text-muted font-medium">
          <span className="flex items-center gap-1">
            🕒 {course.duration} Hours
          </span>
          <span>{course.chapters} chapters</span>
        </div>

        <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-brand-blue transition-colors">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 line-clamp-2 flex-1 leading-relaxed">
          {course.description}
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5 mt-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
            <span>Progress</span>
            <span className="text-brand-blue">{course.completedPercent}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-brand-blue transition-all duration-1000"
              style={{ width: `${course.completedPercent}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 !text-gray-700 !border-gray-200 hover:!bg-gray-50 !px-0"
            onClick={() => onViewDetails(course.id)}
          >
            View Details
          </Button>
          <Button
            size="sm"
            className="flex-1 !px-0 shadow-sm"
            onClick={() => onPackage(course.id)}
          >
            Package
          </Button>
        </div>
      </div>
    </div>
  );
}
