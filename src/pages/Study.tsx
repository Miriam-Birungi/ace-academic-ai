import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Plus, Sparkles, Brain, Coffee, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StudySession {
  id: string;
  subject: string;
  duration: string;
  status: "recommended" | "scheduled" | "completed";
  time?: string;
}

const sessions: StudySession[] = [
  { id: "1", subject: "Algorithm Analysis", duration: "1h 30m", status: "recommended", time: "7:00 PM - 8:30 PM" },
  { id: "2", subject: "Database Systems", duration: "1h", status: "recommended", time: "Tomorrow 10:00 AM" },
  { id: "3", subject: "Calculus Review", duration: "45m", status: "scheduled", time: "Today 4:00 PM" },
  { id: "4", subject: "Data Structures Practice", duration: "1h 15m", status: "completed" },
];

export default function Study() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === "focus" ? 25 * 60 : 5 * 60);
  };

  const progress = sessionType === "focus" ? ((25 * 60 - timeLeft) / (25 * 60)) * 100 : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Study Planner</h1>
          <p className="text-muted-foreground">Focus timer and study sessions</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Focus Timer */}
        <div className="col-span-2">
          <div className="card-elevated p-8">
            <div className="mb-6 flex items-center justify-center gap-4">
              <Button
                variant={sessionType === "focus" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSessionType("focus");
                  setTimeLeft(25 * 60);
                  setIsRunning(false);
                }}
                className="gap-2"
              >
                <Brain className="h-4 w-4" />
                Focus (25m)
              </Button>
              <Button
                variant={sessionType === "break" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSessionType("break");
                  setTimeLeft(5 * 60);
                  setIsRunning(false);
                }}
                className="gap-2"
              >
                <Coffee className="h-4 w-4" />
                Break (5m)
              </Button>
            </div>

            {/* Timer Display */}
            <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
              <svg className="absolute h-full w-full -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="8"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  fill="none"
                  stroke={sessionType === "focus" ? "hsl(var(--primary))" : "hsl(var(--success))"}
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="text-center">
                <p className="text-5xl font-bold tracking-tight text-foreground">
                  {formatTime(timeLeft)}
                </p>
                <p className="mt-2 text-sm capitalize text-muted-foreground">
                  {sessionType} session
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsRunning(!isRunning)}
                className={cn("gap-2 px-8", isRunning && "bg-warning hover:bg-warning/90")}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Start
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon" onClick={resetTimer}>
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 flex items-center justify-center gap-8 border-t border-border pt-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">4</p>
                <p className="text-sm text-muted-foreground">Sessions today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-foreground">2h 15m</p>
                <p className="text-sm text-muted-foreground">Total focus time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-success">85%</p>
                <p className="text-sm text-muted-foreground">Focus score</p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Sessions */}
        <div className="space-y-4">
          {/* AI Recommendations */}
          <div className="card-soft p-4">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">AI Recommended</h3>
            </div>
            <div className="space-y-3">
              {sessions
                .filter((s) => s.status === "recommended")
                .map((session) => (
                  <div
                    key={session.id}
                    className="ai-suggestion rounded-lg border border-primary/20 p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{session.subject}</p>
                        <p className="text-xs text-muted-foreground">{session.time}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {session.duration}
                      </span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 w-full">
                      Schedule
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          {/* Scheduled */}
          <div className="card-soft p-4">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-warning" />
              <h3 className="font-semibold">Scheduled</h3>
            </div>
            <div className="space-y-3">
              {sessions
                .filter((s) => s.status === "scheduled")
                .map((session) => (
                  <div key={session.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{session.subject}</p>
                        <p className="text-xs text-muted-foreground">{session.time}</p>
                      </div>
                      <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs text-warning">
                        {session.duration}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
