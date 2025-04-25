import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  MapPin,
  Users,
  Grid3X3,
  Calendar as CalendarViewIcon,
  List
} from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { Event } from "@shared/schema";
import { cn } from "@/lib/utils";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"]
  });
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Group events by date for the schedule view
  const todaysEvents = events?.filter(event => 
    isSameDay(new Date(event.date), new Date())
  ).sort((a, b) => a.startTime.localeCompare(b.startTime)) || [];
  
  // Format time from 24h to 12h
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };
  
  // Determine event badge color based on type
  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'class':
        return "bg-primary-100 text-primary-800 hover:bg-primary-100";
      case 'meeting':
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case 'deadline':
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };
  
  const renderCells = () => {
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayEvents = events?.filter(event => 
          isSameDay(new Date(event.date), cloneDay)
        ) || [];
        
        days.push(
          <div
            key={day.toString()}
            className={cn(
              "min-h-[120px] p-2 border border-gray-200",
              !isSameMonth(day, monthStart) && "bg-gray-50 text-gray-400",
              isSameDay(day, new Date()) && "bg-blue-50 font-semibold"
            )}
          >
            <div className="flex justify-between">
              <span className={cn(
                "text-sm font-medium",
                isSameDay(day, new Date()) && "text-blue-600"
              )}>
                {formattedDate}
              </span>
              {dayEvents.length > 0 && (
                <Badge variant="outline" className="text-xs font-normal">
                  {dayEvents.length}
                </Badge>
              )}
            </div>
            <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
              {dayEvents.slice(0, 3).map((event, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "text-xs p-1 rounded truncate",
                    getEventBadgeColor(event.type)
                  )}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex-1">{rows}</div>;
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500">Manage your schedule and events</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex rounded-md overflow-hidden">
            <Button variant="outline" size="sm" className="rounded-r-none" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-l-none" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className={view === "month" ? "bg-gray-100" : ""} onClick={() => setView("month")}>
                  <Grid3X3 className="h-4 w-4 mr-1" />
                  Month
                </Button>
                <Button variant="outline" size="sm" className={view === "week" ? "bg-gray-100" : ""} onClick={() => setView("week")}>
                  <CalendarViewIcon className="h-4 w-4 mr-1" />
                  Week
                </Button>
                <Button variant="outline" size="sm" className={view === "day" ? "bg-gray-100" : ""} onClick={() => setView("day")}>
                  <List className="h-4 w-4 mr-1" />
                  Day
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-b border-gray-200">
                {weekDays.map((day) => (
                  <div key={day} className="py-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              
              {isLoading ? (
                <div className="py-20 text-center text-gray-500">Loading calendar events...</div>
              ) : (
                renderCells()
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-gray-200">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Today's Schedule</h2>
              <p className="text-sm text-gray-500">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
            </CardHeader>
            
            <CardContent className="p-0">
              {isLoading ? (
                <div className="py-10 text-center text-gray-500">Loading events...</div>
              ) : todaysEvents.length === 0 ? (
                <div className="py-10 text-center text-gray-500">No events scheduled for today</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {todaysEvents.map((event) => (
                    <div key={event.id} className="p-4">
                      <div className="flex items-start">
                        <div className={cn(
                          "w-2 h-2 mt-1.5 rounded-full mr-2",
                          event.type === 'class' ? "bg-primary-500" :
                          event.type === 'meeting' ? "bg-orange-500" :
                          "bg-blue-500"
                        )}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-gray-500 text-sm mt-1">{event.description}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
