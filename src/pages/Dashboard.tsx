import { GreetingCard } from "@/components/dashboard/GreetingCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { AISuggestionCard } from "@/components/dashboard/AISuggestionCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <GreetingCard />
      <QuickStats />
      <AISuggestionCard />
      
      <div className="grid grid-cols-2 gap-6">
        <TodaySchedule />
        <UpcomingDeadlines />
      </div>
    </div>
  );
}
