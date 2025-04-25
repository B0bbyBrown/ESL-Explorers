import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Lesson } from "@shared/schema";
import { Languages, BookOpen, Mic, HeadphonesIcon, PenTool, BookText, GraduationCap } from "lucide-react";
import { format, isToday, isTomorrow } from "date-fns";
import { Link } from "wouter";

const subjectIcons: Record<string, any> = {
  "Speaking": { icon: Mic, bgColor: "bg-primary/10", textColor: "text-primary" },
  "Listening": { icon: HeadphonesIcon, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
  "Reading": { icon: BookOpen, bgColor: "bg-blue-100", textColor: "text-blue-700" },
  "Writing": { icon: PenTool, bgColor: "bg-green-100", textColor: "text-green-700" },
  "Vocabulary": { icon: BookText, bgColor: "bg-purple-100", textColor: "text-purple-700" },
  "Grammar": { icon: Languages, bgColor: "bg-amber-100", textColor: "text-amber-700" },
  "Assessment": { icon: GraduationCap, bgColor: "bg-red-100", textColor: "text-red-700" },
};

export function UpcomingClassesCard() {
  const { data: lessons, isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"]
  });
  
  // Sort lessons by date and time
  const upcomingLessons = lessons 
    ? [...lessons]
        .filter(lesson => lesson.status === 'upcoming')
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getTime() !== dateB.getTime()) {
            return dateA.getTime() - dateB.getTime();
          }
          return a.startTime.localeCompare(b.startTime);
        })
        .slice(0, 3)
    : [];
  
  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };
  
  const getSubjectIcon = (subject: string) => {
    const iconConfig = subjectIcons[subject] || { 
      icon: Languages, 
      bgColor: "bg-gray-100", 
      textColor: "text-gray-600" 
    };
    
    const IconComponent = iconConfig.icon;
    
    return (
      <div className={`rounded-lg p-3 mr-4 ${iconConfig.bgColor}`}>
        <IconComponent className={iconConfig.textColor} />
      </div>
    );
  };
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Language Lessons</h2>
        <Link href="/dashboard/lessons">
          <span className="text-primary hover:text-primary/90 text-sm font-medium cursor-pointer">View All</span>
        </Link>
      </CardHeader>
      
      <CardContent className="p-0 divide-y divide-gray-100">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading upcoming classes...</div>
        ) : upcomingLessons.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No upcoming classes scheduled</div>
        ) : (
          upcomingLessons.map((lesson) => (
            <div key={lesson.id} className="p-4 flex items-center">
              {getSubjectIcon(lesson.subject)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                <p className="text-gray-500 text-sm">Class {lesson.classId} • {lesson.location}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-900 font-medium">{lesson.startTime}</p>
                <p className="text-gray-500 text-sm">{getDateLabel(new Date(lesson.date))}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
