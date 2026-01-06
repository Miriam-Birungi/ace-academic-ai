import { Bell, User, Palette, Clock, Shield, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const settingSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your personal information",
    settings: [
      { label: "Name", value: "Miriam Johnson" },
      { label: "Email", value: "miriam.j@university.edu" },
      { label: "University", value: "State University" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure how you receive alerts",
    toggles: [
      { label: "Deadline reminders", enabled: true },
      { label: "AI suggestions", enabled: true },
      { label: "Schedule changes", enabled: true },
      { label: "Weekly summary", enabled: false },
    ],
  },
  {
    icon: Clock,
    title: "Study Preferences",
    description: "Customize your focus sessions",
    toggles: [
      { label: "Pomodoro sounds", enabled: true },
      { label: "Auto-start breaks", enabled: false },
      { label: "Show focus statistics", enabled: true },
    ],
  },
  {
    icon: Shield,
    title: "Privacy",
    description: "Control your data and AI learning",
    toggles: [
      { label: "Allow AI to learn from my patterns", enabled: true },
      { label: "Share anonymous usage data", enabled: false },
      { label: "Enable smart suggestions", enabled: true },
    ],
  },
];

export default function Settings() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.title} className="card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            <Separator className="my-4" />

            {section.settings && (
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{setting.label}</span>
                    <span className="text-sm font-medium">{setting.value}</span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="mt-2">
                  Edit Profile
                </Button>
              </div>
            )}

            {section.toggles && (
              <div className="space-y-4">
                {section.toggles.map((toggle) => (
                  <div key={toggle.label} className="flex items-center justify-between">
                    <span className="text-sm">{toggle.label}</span>
                    <Switch defaultChecked={toggle.enabled} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Help Section */}
        <div className="card-soft p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
              <HelpCircle className="h-5 w-5 text-info" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">Need Help?</h2>
              <p className="text-sm text-muted-foreground">
                Get support or learn more about StudyMate
              </p>
            </div>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
