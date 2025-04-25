import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

// Performance data (would come from API in a real app)
const performanceData = [
  { name: "Week 1", average: 70, top: 90, improvement: 0 },
  { name: "Week 2", average: 72, top: 92, improvement: 2 },
  { name: "Week 3", average: 75, top: 93, improvement: 3 },
  { name: "Week 4", average: 78, top: 94, improvement: 3 },
];

type TimeRange = "30days" | "3months" | "6months";

export function PerformanceCard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");
  
  // This would fetch different data based on the time range in a real app
  const data = performanceData;
  
  // Calculate current stats
  const currentAverage = data[data.length - 1].average;
  const topPerformer = data[data.length - 1].top;
  const totalImprovement = data.reduce((sum, item) => sum + item.improvement, 0);

  return (
    <Card className="border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6">
        <h2 className="text-lg font-semibold text-gray-800">Class Performance</h2>
        <Select 
          defaultValue={timeRange}
          onValueChange={(value) => setTimeRange(value as TimeRange)}
        >
          <SelectTrigger className="w-36 h-8 text-sm border-gray-300">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="px-6 pb-4">
        <div className="h-64 bg-gray-50 rounded-lg mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="hsl(var(--primary))" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="top" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Average Score</p>
            <p className="font-bold text-gray-900 text-xl">{currentAverage}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Top Performer</p>
            <p className="font-bold text-gray-900 text-xl">{topPerformer}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Improvement</p>
            <p className="font-bold text-green-600 text-xl">+{totalImprovement}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
