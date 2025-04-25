import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Download, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Student } from "@shared/schema";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;
  
  const { data: students, isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"]
  });
  
  // Filter students based on search
  const filteredStudents = students?.filter(student => 
    student.fullName.toLowerCase().includes(search.toLowerCase()) ||
    student.email?.toLowerCase().includes(search.toLowerCase()) ||
    student.guardianName?.toLowerCase().includes(search.toLowerCase())
  ) || [];
  
  // Paginate students
  const totalPages = Math.ceil((filteredStudents?.length || 0) / PAGE_SIZE);
  const paginatedStudents = filteredStudents?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  
  const getPerformanceBadge = (grade: string | undefined) => {
    if (!grade) return null;
    
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
  
  const getAttendanceBadge = (rate: number | undefined) => {
    if (rate === undefined) return null;
    
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
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500">Manage your class students and their information</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      
      <Card className="border-gray-200">
        <CardHeader className="pb-2 pt-4 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search students..."
                className="pl-8 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade/Class</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Loading students...
                    </TableCell>
                  </TableRow>
                ) : paginatedStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div>{student.fullName}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </TableCell>
                      <TableCell>
                        Grade {student.grade}, Class {student.classId}
                      </TableCell>
                      <TableCell>
                        <div>{student.guardianName}</div>
                        <div className="text-sm text-gray-500">{student.guardianContact}</div>
                      </TableCell>
                      <TableCell>
                        {getAttendanceBadge(student.attendanceRate)}
                      </TableCell>
                      <TableCell>
                        {getPerformanceBadge(student.performanceGrade)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * PAGE_SIZE) + 1} to {Math.min(currentPage * PAGE_SIZE, filteredStudents.length)} of {filteredStudents.length} students
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
