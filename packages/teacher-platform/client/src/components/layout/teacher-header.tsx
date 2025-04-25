import { useState } from "react";
import { Bell, MessageSquare, Search, Menu, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeacherHeaderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export function TeacherHeader({ collapsed, setCollapsed }: TeacherHeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="bg-primary text-primary-foreground h-16 flex items-center px-4 justify-between sticky top-0 z-10 shadow-md">
      <div className="flex items-center md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground mr-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative flex-1 max-w-xl mx-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for lessons, resources..."
            className="bg-primary/80 text-primary-foreground w-full pl-10 pr-4 py-2 focus-visible:ring-accent border-primary/60"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-4 w-4 text-primary-foreground/60" />
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-primary-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="p-3 focus:bg-accent/10">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New assignment submitted</p>
                    <p className="text-xs text-muted-foreground">
                      Emma Wilson submitted Science Lab worksheet
                    </p>
                    <p className="text-xs text-muted-foreground/70">10 minutes ago</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <span className="text-accent text-sm font-medium">View all notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-primary-foreground">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Messages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <DropdownMenuItem key={i} className="p-3 focus:bg-accent/10">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent/20 text-accent-foreground">
                        {i % 2 === 0 ? "SW" : "RM"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {i % 2 === 0 ? "Sarah Wilson" : "Robert Miller"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate w-48">
                        Can we discuss Emma's progress in class?
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        {i} {i === 1 ? "hour" : "hours"} ago
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <span className="text-accent text-sm font-medium">View all messages</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 px-1 py-1 hover:bg-primary/80">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted text-muted-foreground">JD</AvatarFallback>
              </Avatar>
              <span className="text-primary-foreground hidden md:inline-block">John Doe</span>
              <ChevronDown className="h-4 w-4 text-primary-foreground hidden md:inline-block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
