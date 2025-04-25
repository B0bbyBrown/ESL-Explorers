import * as React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Task } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { format, isSameDay, addDays, isAfter } from "date-fns";
import type { CheckedState } from "@radix-ui/react-checkbox";

export const TasksCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Card>
>((props, ref) => {
  const [userId] = useState(1); // In a real app, this would come from auth context

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: async (): Promise<Task[]> => {
      const response = await apiRequest("GET", `/api/tasks/${userId}`);
      // Ensure we always return an array of tasks
      const tasksData = response as unknown as Task | Task[];
      return Array.isArray(tasksData) ? tasksData : [tasksData];
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Task> }) => {
      await apiRequest("PATCH", `/api/tasks/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] });
    },
  });

  const handleTaskToggle = (id: number, completed: boolean) => {
    updateTaskMutation.mutate({ id, data: { completed } });
  };

  const getTaskDueLabel = (dueDate: string | null) => {
    if (!dueDate) return "";

    const dueDateObj = new Date(dueDate);

    if (isSameDay(dueDateObj, new Date())) {
      return "Due today";
    } else if (isSameDay(dueDateObj, addDays(new Date(), 1))) {
      return "Due tomorrow";
    } else {
      const daysUntilDue = Math.ceil(
        (dueDateObj.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return `Due in ${daysUntilDue} days`;
    }
  };

  const getTaskDueClass = (dueDate: string | null) => {
    if (!dueDate) return "text-gray-500";

    const dueDateObj = new Date(dueDate);

    if (isAfter(new Date(), dueDateObj)) {
      return "text-red-600";
    } else if (isSameDay(dueDateObj, new Date())) {
      return "text-red-600";
    } else if (isSameDay(dueDateObj, addDays(new Date(), 1))) {
      return "text-orange-600";
    } else {
      return "text-gray-500";
    }
  };

  const remainingTasks = tasks.filter((t: Task) => !t.completed).length;

  return (
    <Card className="border border-gray-200" ref={ref} {...props}>
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
        <span className="text-gray-500 text-sm">
          {remainingTasks} remaining
        </span>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {isLoading ? (
          <div className="text-center text-gray-500 py-2">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-2">No pending tasks</div>
        ) : (
          tasks.map((task: Task) => (
            <div key={task.id} className="flex items-center">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed || false}
                onCheckedChange={(checked: CheckedState) =>
                  handleTaskToggle(task.id, checked === true)
                }
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor={`task-${task.id}`}
                className="ml-2 text-gray-700 flex-1 cursor-pointer"
              >
                {task.title}
              </label>
              <span
                className={`ml-auto text-xs font-medium ${getTaskDueClass(
                  task.dueDate
                )}`}
              >
                {task.dueDate && getTaskDueLabel(task.dueDate)}
              </span>
            </div>
          ))
        )}
      </CardContent>

      <CardFooter className="border-t border-gray-100 p-4">
        <Button
          variant="ghost"
          className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add new task
        </Button>
      </CardFooter>
    </Card>
  );
});

TasksCard.displayName = "TasksCard";
