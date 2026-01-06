import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deadline {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  daysLeft: number;
  progress: number;
}

const deadlines: Deadline[] = [
  { id: "1", title: "Algorithm Analysis Report", course: "CS301", dueDate: "Jan 8", daysLeft: 2, progress: 75 },
  { id: "2", title: "Database ER Diagram", course: "CS302", dueDate: "Jan 10", daysLeft: 4, progress: 40 },
  { id: "3", title: "Calculus Problem Set 5", course: "MATH201", dueDate: "Jan 12", daysLeft: 6, progress: 10 },
  { id: "4", title: "Research Paper Draft", course: "ENG101", dueDate: "Jan 15", daysLeft: 9, progress: 0 },
];

export function UpcomingDeadlines() {
  return (
    <div className="card-soft p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      
      <div className="space-y-3">
        {deadlines.map((deadline, index) => (
          <div
            key={deadline.id}
            className="animate-fade-in rounded-lg border border-border/50 p-3 transition-all hover:border-border hover:shadow-soft"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-foreground">{deadline.title}</p>
                <p className="text-xs text-muted-foreground">{deadline.course}</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  deadline.daysLeft <= 2
                    ? "bg-destructive/10 text-destructive"
                    : deadline.daysLeft <= 5
                    ? "bg-warning/10 text-warning"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {deadline.daysLeft <= 2 ? (
                  <AlertCircle className="h-3 w-3" />
                ) : null}
                {deadline.daysLeft}d left
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{deadline.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    deadline.progress >= 70 ? "bg-success" : deadline.progress >= 40 ? "bg-primary" : "bg-warning"
                  )}
                  style={{ width: `${deadline.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
