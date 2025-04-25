import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Announcement } from "@shared/schema";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

export function AnnouncementsCard() {
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"]
  });
  
  const recentAnnouncements = announcements 
    ? [...announcements]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 2)
    : [];
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Important</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">General</Badge>;
    }
  };
  
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Recent Announcements</h2>
        <Link href="/dashboard/messages">
          <span className="text-primary-600 hover:text-primary-700 text-sm font-medium cursor-pointer">View All</span>
        </Link>
      </CardHeader>
      
      <CardContent className="p-0 divide-y divide-gray-100">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Loading announcements...</div>
        ) : recentAnnouncements.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No recent announcements</div>
        ) : (
          recentAnnouncements.map((announcement) => (
            <div key={announcement.id} className="p-4">
              <div className="flex items-center mb-2">
                {getPriorityBadge(announcement.priority)}
                <span className="ml-auto text-gray-500 text-xs">
                  {getTimeAgo(announcement.createdAt)}
                </span>
              </div>
              <h4 className="font-medium text-gray-900">{announcement.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{announcement.content}</p>
            </div>
          ))
        )}
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 p-4">
        <Button 
          variant="ghost" 
          className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
        >
          <Megaphone className="h-4 w-4 mr-1" />
          Create announcement
        </Button>
      </CardFooter>
    </Card>
  );
}
