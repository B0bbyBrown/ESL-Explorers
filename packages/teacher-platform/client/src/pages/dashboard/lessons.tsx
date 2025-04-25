import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ClipboardList, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Lesson } from "@shared/schema";
import { format } from "date-fns";

export default function LessonsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("upcoming");
  
  const { data: lessons, isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"]
  });
  
  // Filter lessons based on search and tab
  const filteredLessons = lessons?.filter(lesson => 
    (lesson.title.toLowerCase().includes(search.toLowerCase()) ||
     lesson.subject.toLowerCase().includes(search.toLowerCase())) &&
    lesson.status === tab
  ) || [];
  
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Science':
        return "bg-purple-100 text-purple-800";
      case 'Mathematics':
        return "bg-blue-100 text-blue-800";
      case 'English':
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Lessons</h1>
          <p className="text-muted-foreground">Create and manage your lesson plans</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Lesson
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
                className="pl-8 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex rounded-md border border-input overflow-hidden w-full sm:w-auto">
              <button 
                onClick={() => setTab("upcoming")}
                className={`flex-1 px-4 py-2 text-sm font-medium ${tab === 'upcoming' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setTab("completed")}
                className={`flex-1 px-4 py-2 text-sm font-medium ${tab === 'completed' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Completed
              </button>
              <button 
                onClick={() => setTab("draft")}
                className={`flex-1 px-4 py-2 text-sm font-medium ${tab === 'draft' ? 'bg-primary text-white' : 'bg-background'}`}
              >
                Drafts
              </button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading lessons...</div>
          ) : filteredLessons.length === 0 ? (
            <div className="text-center py-8">
              {tab === "draft" ? (
                <div>
                  <div className="mx-auto bg-muted rounded-full p-4 inline-flex mb-4">
                    <ClipboardList className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Draft Lessons</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't saved any lessons as drafts yet. Draft lessons can be edited and published later.
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Draft Lesson
                  </Button>
                </div>
              ) : (
                `No ${tab} lessons found`
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={getSubjectColor(lesson.subject)}>
                        {lesson.subject}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">{lesson.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{lesson.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      <span>Class {lesson.classId}</span>
                    </div>
                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium">{format(new Date(lesson.date), "MMM d, yyyy")}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-medium">{lesson.startTime} - {lesson.endTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Room</p>
                        <p className="font-medium">{lesson.location && lesson.location.replace ? lesson.location.replace("Room ", "") : ""}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
