import { useState } from "react";
import {
  FileText,
  Video,
  Link2,
  FolderOpen,
  Search,
  Plus,
  Download,
  ExternalLink,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Resource {
  id: string;
  title: string;
  type: "document" | "video" | "link" | "folder";
  course: string;
  date: string;
  size?: string;
}

const resources: Resource[] = [
  { id: "1", title: "Data Structures Notes", type: "document", course: "CS301", date: "Jan 5", size: "2.4 MB" },
  { id: "2", title: "Algorithm Lecture Recording", type: "video", course: "CS301", date: "Jan 4", size: "145 MB" },
  { id: "3", title: "Database Design Tutorial", type: "link", course: "CS302", date: "Jan 3" },
  { id: "4", title: "Calculus Practice Problems", type: "document", course: "MATH201", date: "Jan 2", size: "1.1 MB" },
  { id: "5", title: "Physics Lab Materials", type: "folder", course: "PHY101", date: "Jan 1" },
  { id: "6", title: "Research Paper Guidelines", type: "document", course: "ENG101", date: "Dec 28", size: "540 KB" },
  { id: "7", title: "Programming Tutorial Series", type: "video", course: "CS201", date: "Dec 27", size: "320 MB" },
  { id: "8", title: "Study Resources Collection", type: "folder", course: "General", date: "Dec 25" },
];

const typeIcons = {
  document: FileText,
  video: Video,
  link: Link2,
  folder: FolderOpen,
};

const typeColors = {
  document: "text-primary bg-primary/10",
  video: "text-destructive bg-destructive/10",
  link: "text-success bg-success/10",
  folder: "text-warning bg-warning/10",
};

export default function Resources() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Resources</h1>
          <p className="text-muted-foreground">Your academic materials</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border p-1">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="flex gap-4">
        {["All", "Documents", "Videos", "Links", "Folders"].map((filter) => (
          <Button key={filter} variant="outline" size="sm">
            {filter}
          </Button>
        ))}
      </div>

      {/* Resources Grid/List */}
      {view === "grid" ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredResources.map((resource, index) => {
            const Icon = typeIcons[resource.type];
            return (
              <div
                key={resource.id}
                className="card-soft animate-fade-in p-4 transition-all hover:shadow-card cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "mb-3 flex h-12 w-12 items-center justify-center rounded-xl",
                    typeColors[resource.type]
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-foreground line-clamp-2">{resource.title}</h3>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{resource.course}</span>
                  <span>{resource.date}</span>
                </div>
                {resource.size && (
                  <p className="mt-1 text-xs text-muted-foreground">{resource.size}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card-soft divide-y divide-border">
          {filteredResources.map((resource, index) => {
            const Icon = typeIcons[resource.type];
            return (
              <div
                key={resource.id}
                className="animate-fade-in flex items-center gap-4 p-4 transition-all hover:bg-muted/50"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    typeColors[resource.type]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{resource.date}</p>
                  {resource.size && (
                    <p className="text-xs text-muted-foreground">{resource.size}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {resource.type === "link" ? (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  ) : resource.type !== "folder" ? (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
