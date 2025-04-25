import { useQuery } from "@tanstack/react-query";
import { StatsCard } from "@/components/dashboard/stats-card";
import { UpcomingClassesCard } from "@/components/dashboard/upcoming-classes-card";
import { PerformanceCard } from "@/components/dashboard/performance-card";
import { TasksCard } from "@/components/dashboard/tasks-card";
import { AnnouncementsCard } from "@/components/dashboard/announcements-card";
import { Button } from "@/components/ui/button";
import { UserRound, BookOpen, Calendar, Clock, Plus } from "lucide-react";
import { Student, Lesson, Task } from "@shared/schema";

export default function DashboardPage() {
  // Queries for dashboard stats
  const { data: students } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const { data: lessons } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  const { data: tasks } = useQuery<Task[]>({
    queryKey: ["/api/tasks/1"], // Assuming current user ID is 1
  });

  const activeCourses = Array.from(
    new Set(lessons?.map((lesson) => lesson.subject) || [])
  ).length;

  const upcomingEvents =
    lessons?.filter((lesson) => lesson.status === "upcoming").length || 0;

  const teachingHours =
    lessons?.reduce((total, lesson) => {
      // Safely handle potentially undefined values
      if (!lesson.startTime || !lesson.endTime) return total;

      try {
        const start = parseInt(lesson.startTime.split(":")[0]);
        const end = parseInt(lesson.endTime.split(":")[0]);

        // Check if the parsed values are valid numbers
        if (isNaN(start) || isNaN(end)) return total;

        return total + (end - start);
      } catch (error) {
        console.error("Error calculating teaching hours:", error);
        return total;
      }
    }, 0) || 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ESL Teacher Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back, John! Here's what's happening in your language classes
            today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Language Lesson
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="ESL Students"
          value={students?.length || 0}
          icon={<UserRound className="text-primary" />}
          change={{
            value: "4.6% from last month",
            type: "increase",
          }}
          iconClassName="bg-primary/10"
        />

        <StatsCard
          title="Language Levels"
          value={activeCourses || 0}
          icon={<BookOpen className="text-secondary-600" />}
          change={{
            value: "From Pre A1 to C2",
            type: "neutral",
          }}
          iconClassName="bg-secondary-100"
        />

        <StatsCard
          title="Upcoming Lessons"
          value={upcomingEvents}
          icon={<Calendar className="text-purple-600" />}
          change={{
            value: `${
              upcomingEvents > 0 ? upcomingEvents : "No"
            } scheduled this week`,
            type: "neutral",
          }}
          iconClassName="bg-purple-100"
        />

        <StatsCard
          title="Language Teaching Hours"
          value={teachingHours}
          icon={<Clock className="text-green-600" />}
          change={{
            value: "2.1 more than average",
            type: "increase",
          }}
          iconClassName="bg-green-100"
        />
      </div>

      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <UpcomingClassesCard />
          <PerformanceCard />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <TasksCard />
          <AnnouncementsCard />
        </div>
      </div>
    </div>
  );
}
