import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  BarChart4,
  PieChart,
  LineChart as LineChartIcon,
  DownloadCloud
} from "lucide-react";
import { Student } from "@shared/schema";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as PieChartRecharts,
  Pie,
  Cell,
  LineChart as LineChartRecharts,
  Line
} from "recharts";

// Mock data for visualizations
const performanceData = [
  { name: "Grade A", students: 12, color: "#4ade80" },
  { name: "Grade B", students: 25, color: "#60a5fa" },
  { name: "Grade C", students: 18, color: "#facc15" },
  { name: "Grade D", students: 8, color: "#f87171" },
  { name: "Grade F", students: 2, color: "#ef4444" },
];

const attendanceData = [
  { name: "90-100%", students: 35, color: "#4ade80" },
  { name: "80-90%", students: 20, color: "#60a5fa" },
  { name: "70-80%", students: 12, color: "#facc15" },
  { name: "<70%", students: 8, color: "#f87171" },
];

const progressData = [
  { month: "Jan", science: 78, math: 72, english: 65 },
  { month: "Feb", science: 80, math: 75, english: 68 },
  { month: "Mar", science: 82, math: 78, english: 70 },
  { month: "Apr", science: 85, math: 80, english: 75 },
  { month: "May", science: 87, math: 83, english: 78 },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("performance");
  const [timeFilter, setTimeFilter] = useState("quarter");
  const [classFilter, setClassFilter] = useState("all");
  
  const { data: students, isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"]
  });
  
  const getPerformanceBadge = (grade: string | undefined | null) => {
    if (!grade) return <Badge variant="outline">Not Graded</Badge>;
    
    switch (grade) {
      case 'A':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>;
      case 'B':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Good</Badge>;
      case 'C':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Average</Badge>;
      case 'D':
      case 'F':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Needs Improvement</Badge>;
      default:
        return <Badge variant="outline">Not Graded</Badge>;
    }
  };
  
  const getAttendanceBadge = (rate: number | undefined | null) => {
    if (rate === undefined || rate === null) return <Badge variant="outline">No Data</Badge>;
    
    if (rate >= 90) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{rate}%</Badge>;
    } else if (rate >= 80) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{rate}%</Badge>;
    } else if (rate >= 70) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{rate}%</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{rate}%</Badge>;
    }
  };
  
  // Performance Content
  const PerformanceContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Performance Overview</h2>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChartRecharts>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChartRecharts>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Average Grade</p>
                <p className="text-xl font-bold">B</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Top Subject</p>
                <p className="text-xl font-bold">Science</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Progress Over Time</h2>
              <LineChartIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChartRecharts
                  data={progressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="science" stroke="#6d28d9" strokeWidth={2} />
                  <Line type="monotone" dataKey="math" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="english" stroke="#10b981" strokeWidth={2} />
                </LineChartRecharts>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Student Performance Details</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <DownloadCloud className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Science</TableHead>
                  <TableHead>Mathematics</TableHead>
                  <TableHead>English</TableHead>
                  <TableHead>Overall Grade</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Loading student data...
                    </TableCell>
                  </TableRow>
                ) : students?.filter(s => classFilter === 'all' || s.classId === classFilter).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No student data available
                    </TableCell>
                  </TableRow>
                ) : (
                  students?.filter(s => classFilter === 'all' || s.classId === classFilter).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.fullName}</TableCell>
                      <TableCell>Class {student.classId}</TableCell>
                      <TableCell>
                        {/* Mock subject grades */}
                        {student.id % 5 === 0 ? 'C+' : student.id % 3 === 0 ? 'B+' : student.id % 2 === 0 ? 'A-' : 'B'}
                      </TableCell>
                      <TableCell>
                        {student.id % 4 === 0 ? 'B-' : student.id % 3 === 0 ? 'A' : student.id % 2 === 0 ? 'B+' : 'C+'}
                      </TableCell>
                      <TableCell>
                        {student.id % 5 === 0 ? 'B' : student.id % 3 === 0 ? 'B+' : student.id % 2 === 0 ? 'C+' : 'A-'}
                      </TableCell>
                      <TableCell>
                        {getPerformanceBadge(student.performanceGrade)}
                      </TableCell>
                      <TableCell>
                        {student.id % 3 === 0 ? (
                          <div className="flex items-center text-green-600">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+4.2%</span>
                          </div>
                        ) : student.id % 5 === 0 ? (
                          <div className="flex items-center text-red-600">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            <span>-2.8%</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-blue-600">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>+1.5%</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  
  // Attendance Content
  const AttendanceContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Attendance Overview</h2>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChartRecharts>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChartRecharts>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Average Attendance</p>
                <p className="text-xl font-bold">86%</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Absence Rate</p>
                <p className="text-xl font-bold">14%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Monthly Attendance</h2>
              <BarChart4 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: "Jan", present: 92, absent: 8 },
                    { month: "Feb", present: 88, absent: 12 },
                    { month: "Mar", present: 85, absent: 15 },
                    { month: "Apr", present: 90, absent: 10 },
                    { month: "May", present: 83, absent: 17 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#4ade80" name="Present" />
                  <Bar dataKey="absent" stackId="a" fill="#f87171" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Student Attendance Details</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <DownloadCloud className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead>Days Present</TableHead>
                  <TableHead>Days Absent</TableHead>
                  <TableHead>Last Absence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Loading attendance data...
                    </TableCell>
                  </TableRow>
                ) : students?.filter(s => classFilter === 'all' || s.classId === classFilter).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No attendance data available
                    </TableCell>
                  </TableRow>
                ) : (
                  students?.filter(s => classFilter === 'all' || s.classId === classFilter).map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.fullName}</TableCell>
                      <TableCell>Class {student.classId}</TableCell>
                      <TableCell>
                        {getAttendanceBadge(student.attendanceRate)}
                      </TableCell>
                      <TableCell>
                        {/* Mock data - would come from API in real app */}
                        {Math.round((student.attendanceRate || 80) / 100 * 90)}
                      </TableCell>
                      <TableCell>
                        {/* Mock data */}
                        {90 - Math.round((student.attendanceRate || 80) / 100 * 90)}
                      </TableCell>
                      <TableCell>
                        {/* Mock data */}
                        {student.id % 5 === 0 ? 'May 15, 2023' : 
                         student.id % 3 === 0 ? 'May 10, 2023' : 
                         student.id % 2 === 0 ? 'May 3, 2023' : 'Apr 28, 2023'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Assessments Content
  const AssessmentsContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Recent Assessments</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">End-of-Chapter Quiz</TableCell>
                  <TableCell>May 15, 2023</TableCell>
                  <TableCell>8B</TableCell>
                  <TableCell>Science</TableCell>
                  <TableCell>78%</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mid-Term Exam</TableCell>
                  <TableCell>May 10, 2023</TableCell>
                  <TableCell>7A</TableCell>
                  <TableCell>Mathematics</TableCell>
                  <TableCell>72%</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Essay Assignment</TableCell>
                  <TableCell>May 8, 2023</TableCell>
                  <TableCell>8B</TableCell>
                  <TableCell>English</TableCell>
                  <TableCell>81%</TableCell>
                  <TableCell><Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Unit Test</TableCell>
                  <TableCell>May, 2023</TableCell>
                  <TableCell>7A</TableCell>
                  <TableCell>Science</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Final Project</TableCell>
                  <TableCell>Jun 15, 2023</TableCell>
                  <TableCell>8B</TableCell>
                  <TableCell>Mathematics</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell><Badge variant="outline" className="bg-blue-100 text-blue-800">Scheduled</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Assessment Types Distribution</h2>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChartRecharts>
                  <Pie
                    data={[
                      { name: "Quizzes", value: 42, color: "#4ade80" },
                      { name: "Exams", value: 28, color: "#60a5fa" },
                      { name: "Projects", value: 15, color: "#facc15" },
                      { name: "Assignments", value: 15, color: "#f87171" },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: "Quizzes", value: 42, color: "#4ade80" },
                      { name: "Exams", value: 28, color: "#60a5fa" },
                      { name: "Projects", value: 15, color: "#facc15" },
                      { name: "Assignments", value: 15, color: "#f87171" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChartRecharts>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Upcoming Assessments</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Science Final Exam</p>
                  <p className="text-sm text-muted-foreground">Class 8B • May 25, 2023</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Planned</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Math Group Project</p>
                  <p className="text-sm text-muted-foreground">Class 7A • May 28, 2023</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">English Literature Essay</p>
                  <p className="text-sm text-muted-foreground">Class 8B • Jun 1, 2023</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Planned</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">History Quiz</p>
                  <p className="text-sm text-muted-foreground">Class 7A • Jun 5, 2023</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Planned</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">View and analyze student performance and attendance data</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">Current Quarter</SelectItem>
              <SelectItem value="semester">Current Semester</SelectItem>
              <SelectItem value="year">Academic Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="8B">Class 8B</SelectItem>
              <SelectItem value="7A">Class 7A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <PerformanceContent />
        </TabsContent>
        
        <TabsContent value="attendance">
          <AttendanceContent />
        </TabsContent>
        
        <TabsContent value="assessments">
          <AssessmentsContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
