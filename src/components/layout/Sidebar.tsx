import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BookOpen,
  MessageCircle,
  FolderOpen,
  Settings,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Schedule", url: "/schedule", icon: Calendar },
  { title: "Tasks & Assignments", url: "/tasks", icon: CheckSquare },
  { title: "Study Planner", url: "/study", icon: BookOpen },
  { title: "AI Assistant", url: "/assistant", icon: MessageCircle },
  { title: "Resources", url: "/resources", icon: FolderOpen },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">StudyMate</h1>
            <p className="text-xs text-muted-foreground">AI Academic Assistant</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="ai-suggestion rounded-lg p-3">
            <p className="text-xs font-medium text-primary">AI Tip 💡</p>
            <p className="mt-1 text-xs text-muted-foreground">
              You have 2 hours free tonight. Perfect for revision!
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
