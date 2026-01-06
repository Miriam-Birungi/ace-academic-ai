import { CheckCircle2, Clock, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Tasks Completed", value: "12/15", icon: CheckCircle2, color: "text-success" },
  { label: "Study Hours", value: "18h", icon: Clock, color: "text-primary" },
  { label: "Focus Score", value: "85%", icon: Target, color: "text-info" },
  { label: "Productivity", value: "+12%", icon: TrendingUp, color: "text-success" },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="card-soft animate-fade-in p-4"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center justify-between">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <span className="text-2xl font-semibold text-foreground">{stat.value}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
