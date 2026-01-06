import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AISuggestionCard() {
  return (
    <div className="ai-suggestion card-elevated overflow-hidden p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">AI Study Suggestion</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            You have a free 2-hour slot this evening from 7-9 PM. Based on your upcoming deadlines, 
            I recommend focusing on your Algorithm Analysis Report to meet the deadline comfortably.
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Schedule study session
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              See alternatives
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
