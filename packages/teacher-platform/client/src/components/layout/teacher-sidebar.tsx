import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Calendar, 
  MessageSquare, 
  BarChart2, 
  BookMarked, 
  Bookmark, 
  Settings, 
  HelpCircle, 
  Menu, 
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export function TeacherSidebar({ collapsed, setCollapsed }: { 
  collapsed: boolean; 
  setCollapsed: (value: boolean) => void 
}) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  
  // Handle automatic collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile, setCollapsed]);

  const mainNavItems: SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Students",
      href: "/dashboard/students",
      icon: Users,
    },
    {
      title: "Lessons",
      href: "/dashboard/lessons",
      icon: BookOpen,
    },
    {
      title: "Curriculum",
      href: "/dashboard/curriculum",
      icon: FileText,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
      badge: 5,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart2,
    },
    {
      title: "Materials",
      href: "/dashboard/materials",
      icon: BookMarked,
    },
    {
      title: "Bookmarks",
      href: "/dashboard/bookmarks",
      icon: Bookmark,
    },
  ];

  const bottomNavItems: SidebarNavItem[] = [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help Center",
      href: "#",
      icon: HelpCircle,
    },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed z-20",
        "transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        isMobile && collapsed && "-translate-x-full"
      )}
    >
      {/* Logo section */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-yellow-400" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">ESL Explorers</span>
              <span className="text-xs text-white leading-tight">Teacher Portal</span>
            </div>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-sidebar-foreground" 
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main navigation */}
      <ScrollArea className="flex-1">
        <nav className="pt-4 px-2">
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <div
                    className={cn(
                      "flex items-center rounded-lg py-3 px-3 text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors cursor-pointer",
                      location === item.href && "bg-sidebar-accent"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                    {!collapsed && (
                      <span className="flex-1">{item.title}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      
      {/* Bottom actions */}
      <div className="border-t border-sidebar-border p-2 mt-auto">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <div
                  className={cn(
                    "flex items-center rounded-lg py-3 px-3 text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors cursor-pointer",
                    location === item.href && "bg-sidebar-accent"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && (
                    <span className="flex-1">{item.title}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
