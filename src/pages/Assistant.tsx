import { useState } from "react";
import { Send, Sparkles, Calendar, Clock, Scale, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi Miriam! 👋 I'm your AI Academic Assistant. I can help you plan your week, reschedule tasks, balance work and study, or suggest optimal study times. What would you like help with today?",
    timestamp: "10:30 AM",
  },
];

const quickActions = [
  { label: "Plan my week", icon: Calendar },
  { label: "Reschedule tasks", icon: Clock },
  { label: "Balance work & study", icon: Scale },
  { label: "Suggest study times", icon: BookOpen },
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "plan my week":
          "Based on your deadlines and schedule, here's my recommended plan for this week:\n\n📅 **Monday:** Focus on Algorithm Analysis Report (2 hours in the evening)\n📅 **Tuesday:** Database ER Diagram work session (1.5 hours after lectures)\n📅 **Wednesday:** Light study day - review Calculus concepts (1 hour)\n📅 **Thursday:** Continue Algorithm Report + start Research Paper outline\n📅 **Friday:** Wrap up Database project and prepare for next week\n\nWould you like me to add these sessions to your calendar?",
        "reschedule tasks":
          "I noticed you have some overlapping commitments. Here are my suggestions:\n\n🔄 Move your study group from Wednesday 4 PM to Thursday 5 PM (you have a free slot then)\n🔄 Your Algorithm Report deadline is approaching - I recommend prioritizing it over the Calculus Problem Set\n\nShall I make these changes for you?",
        "balance work & study":
          "Looking at your current schedule, you're spending about 35 hours on academics per week. Here's how to better balance:\n\n⚖️ You have 3 back-to-back lecture days - consider adding short breaks\n⚖️ Your weekends are almost empty - great for personal time, but consider 1-2 short study sessions\n⚖️ I recommend the 52-17 rule: 52 minutes of focus, 17 minutes break\n\nWould you like me to optimize your schedule with better work-life balance?",
        "suggest study times":
          "Based on your past patterns and cognitive research, here are your optimal study times:\n\n🧠 **Peak Performance:** 9-11 AM (your focus score is 92% during this time)\n🧠 **Good Focus:** 4-6 PM (after a break from lectures)\n🧠 **Avoid:** Right after lunch (your attention drops significantly)\n\nI've identified 3 open slots this week that match your peak times. Want me to schedule study sessions?",
      };

      const matchedKey = Object.keys(responses).find((key) =>
        content.toLowerCase().includes(key)
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          matchedKey
            ? responses[matchedKey]
            : "I'd be happy to help with that! Could you tell me more about what you need? I can assist with:\n\n• Planning your study schedule\n• Managing deadlines and tasks\n• Optimizing your time\n• Suggesting focus techniques\n• Balancing academics with personal life",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">AI Assistant</h1>
            <p className="text-muted-foreground">Your personal academic companion</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card-elevated flex flex-1 flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex animate-fade-in",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-primary">AI Assistant</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                  <p
                    className={cn(
                      "mt-2 text-right text-xs",
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-border bg-muted/30 px-6 py-3">
          <p className="mb-2 text-xs text-muted-foreground">Quick actions</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(action.label)}
                className="gap-2 bg-background"
              >
                <action.icon className="h-3.5 w-3.5" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your studies..."
              className="flex-1 bg-secondary/50 border-0"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
