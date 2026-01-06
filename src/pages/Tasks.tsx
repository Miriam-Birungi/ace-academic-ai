import { useState } from "react";
import {
  Plus,
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
  progress: number;
}

const tasks: Task[] = [
  { id: "1", title: "Algorithm Analysis Report", course: "CS301", dueDate: "Jan 8", priority: "high", status: "in-progress", progress: 75 },
  { id: "2", title: "Database ER Diagram", course: "CS302", dueDate: "Jan 10", priority: "medium", status: "in-progress", progress: 40 },
  { id: "3", title: "Calculus Problem Set 5", course: "MATH201", dueDate: "Jan 12", priority: "medium", status: "todo", progress: 0 },
  { id: "4", title: "Research Paper Draft", course: "ENG101", dueDate: "Jan 15", priority: "low", status: "todo", progress: 0 },
  { id: "5", title: "Physics Lab Report", course: "PHY101", dueDate: "Jan 5", priority: "high", status: "done", progress: 100 },
  { id: "6", title: "Programming Assignment 3", course: "CS201", dueDate: "Jan 4", priority: "medium", status: "done", progress: 100 },
];

const priorityStyles = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-muted text-muted-foreground border-muted",
};

export default function Tasks() {
  const [filter, setFilter] = useState<"all" | "todo" | "in-progress" | "done">("all");

  const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter);

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in-progress");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  const TaskCard = ({ task }: { task: Task }) => (
    <div className="card-soft animate-fade-in p-4 transition-all hover:shadow-card">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button className="mt-0.5">
            {task.status === "done" ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
            )}
          </button>
          <div>
            <p className={cn("font-medium", task.status === "done" && "line-through text-muted-foreground")}>
              {task.title}
            </p>
            <p className="text-sm text-muted-foreground">{task.course}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("rounded-full border px-2 py-0.5 text-xs font-medium", priorityStyles[task.priority])}>
            {task.priority}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {task.dueDate}
          </div>
        </div>
        {task.status !== "done" && (
          <div className="text-xs font-medium text-foreground">{task.progress}%</div>
        )}
      </div>

      {task.status !== "done" && (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              task.progress >= 70 ? "bg-success" : task.progress >= 40 ? "bg-primary" : "bg-warning"
            )}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks & Assignments</h1>
          <p className="text-muted-foreground">Manage your academic tasks</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Help
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="ai-suggestion card-soft p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="text-sm text-foreground">
            <span className="font-medium">AI Recommendation:</span> Your Algorithm Analysis Report is 75% complete. 
            Finish 2 more sections today to stay on track!
          </p>
          <Button size="sm" variant="outline" className="ml-auto">
            Plan it
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {["all", "todo", "in-progress", "done"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status as typeof filter)}
            className="capitalize"
          >
            {status.replace("-", " ")}
          </Button>
        ))}
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-3 gap-6">
        {/* To Do */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">To Do</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{todoTasks.length}</span>
          </div>
          <div className="space-y-3">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">In Progress</h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {inProgressTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Done */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <h2 className="font-semibold">Done</h2>
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
              {doneTasks.length}
            </span>
          </div>
          <div className="space-y-3">
            {doneTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
