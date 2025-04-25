import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  iconClassName?: string;
}

export function StatsCard({ title, value, icon, change, iconClassName }: StatsCardProps) {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <p className={cn(
                "text-sm flex items-center mt-1",
                change.type === "increase" && "text-green-600",
                change.type === "decrease" && "text-red-600",
                change.type === "neutral" && "text-gray-500"
              )}>
                {change.type === "increase" && <ArrowUp className="mr-1 h-3 w-3" />}
                {change.type === "decrease" && <ArrowDown className="mr-1 h-3 w-3" />}
                <span>{change.value}</span>
              </p>
            )}
          </div>
          
          <div className={cn("p-3 rounded-lg", iconClassName || "bg-primary-100")}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
