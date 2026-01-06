import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

interface Event {
  id: string;
  title: string;
  day: number;
  startHour: number;
  duration: number;
  type: "lecture" | "assignment" | "personal" | "study";
}

const events: Event[] = [
  { id: "1", title: "Data Structures", day: 0, startHour: 9, duration: 2, type: "lecture" },
  { id: "2", title: "Calculus", day: 0, startHour: 14, duration: 1.5, type: "lecture" },
  { id: "3", title: "Algorithm Practice", day: 1, startHour: 10, duration: 2, type: "study" },
  { id: "4", title: "Database Lab", day: 1, startHour: 14, duration: 2, type: "lecture" },
  { id: "5", title: "Study Group", day: 2, startHour: 16, duration: 2, type: "study" },
  { id: "6", title: "CS Project", day: 3, startHour: 11, duration: 2, type: "assignment" },
  { id: "7", title: "Physics Lecture", day: 3, startHour: 15, duration: 1.5, type: "lecture" },
  { id: "8", title: "Gym", day: 4, startHour: 17, duration: 1, type: "personal" },
];

const typeStyles = {
  lecture: "bg-primary text-primary-foreground",
  assignment: "bg-warning text-warning-foreground",
  personal: "bg-muted text-muted-foreground",
  study: "bg-success text-success-foreground",
};

export default function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Schedule</h1>
          <p className="text-muted-foreground">Manage your weekly activities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Optimize
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="ai-suggestion card-soft p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="text-sm text-foreground">
            <span className="font-medium">AI Suggestion:</span> Your Wednesday afternoon is free. 
            Would you like me to schedule a study session for your upcoming Calculus exam?
          </p>
          <Button size="sm" variant="outline" className="ml-auto">
            Accept
          </Button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="card-soft p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentWeek(currentWeek - 1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-medium">January 6 - 12, 2026</h2>
          <Button variant="ghost" size="icon" onClick={() => setCurrentWeek(currentWeek + 1)}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="relative">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-3" />
            {days.map((day, i) => (
              <div key={day} className="border-l border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">{day}</p>
                <p className="text-lg font-semibold">{6 + i}</p>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="grid h-16 grid-cols-8 border-b border-border/50">
                <div className="flex items-start justify-end pr-3 pt-1 text-xs text-muted-foreground">
                  {hour}:00
                </div>
                {days.map((_, i) => (
                  <div key={i} className="border-l border-border/50" />
                ))}
              </div>
            ))}

            {/* Events */}
            {events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "absolute left-0 right-0 mx-1 rounded-md px-2 py-1 text-xs font-medium",
                  typeStyles[event.type]
                )}
                style={{
                  top: `${(event.startHour - 8) * 64 + 4}px`,
                  left: `calc(${(event.day + 1) * 12.5}% + 4px)`,
                  width: "calc(12.5% - 8px)",
                  height: `${event.duration * 64 - 8}px`,
                }}
              >
                <p className="truncate">{event.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Legend:</span>
          {Object.entries(typeStyles).map(([type, style]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={cn("h-3 w-3 rounded", style.split(" ")[0])} />
              <span className="text-xs capitalize text-muted-foreground">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
