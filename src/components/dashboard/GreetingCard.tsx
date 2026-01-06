import { Sparkles } from "lucide-react";

export function GreetingCard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {getGreeting()}, Miriam 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            You have 3 tasks due today and a lecture at 2 PM
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5">
          <Sparkles className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-success">On track</span>
        </div>
      </div>
    </div>
  );
}
