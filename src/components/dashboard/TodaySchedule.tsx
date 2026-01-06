import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: "lecture" | "assignment" | "personal" | "study";
  duration: string;
}

const scheduleItems: ScheduleItem[] = [
  { id: "1", title: "Data Structures Lecture", time: "09:00", type: "lecture", duration: "1h 30m" },
  { id: "2", title: "Complete Algorithm Assignment", time: "11:00", type: "assignment", duration: "2h" },
  { id: "3", title: "Lunch Break", time: "13:00", type: "personal", duration: "1h" },
  { id: "4", title: "Database Systems Lecture", time: "14:00", type: "lecture", duration: "1h 30m" },
  { id: "5", title: "Study Session - Calculus", time: "16:00", type: "study", duration: "1h 30m" },
];

const typeStyles = {
  lecture: "bg-primary/10 border-l-primary text-primary",
  assignment: "bg-warning/10 border-l-warning text-warning",
  personal: "bg-muted border-l-muted-foreground text-muted-foreground",
  study: "bg-success/10 border-l-success text-success",
};

export function TodaySchedule() {
  return (
    <div className="card-soft p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Today's Schedule</h2>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      
      <div className="space-y-3">
        {scheduleItems.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "animate-fade-in flex items-center gap-4 rounded-lg border-l-4 p-3",
              typeStyles[item.type]
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex h-10 w-14 flex-col items-center justify-center rounded-md bg-background">
              <span className="text-sm font-semibold text-foreground">{item.time}</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.title}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{item.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
