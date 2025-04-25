import { useState } from "react";
import { TeacherSidebar } from "./teacher-sidebar";
import { TeacherHeader } from "./teacher-header";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <TeacherSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${collapsed ? 'md:ml-16' : 'md:ml-64'}`}
      >
        <TeacherHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
