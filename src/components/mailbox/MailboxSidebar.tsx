import { Inbox, Send, Trash2, PenSquare } from "lucide-react";
import { useMailboxStore } from "../../features/mailbox/useMailboxStore";
import { cn } from "../../lib/utils";

export function MailboxSidebar() {
  const { activeFolder, setActiveFolder } = useMailboxStore();

  const folders = [
    { id: "inbox", label: "Inbox", icon: Inbox },
    { id: "sent", label: "Sent", icon: Send },
    { id: "trash", label: "Trash", icon: Trash2 },
  ];

  return (
    <div className="w-full md:w-64 bg-dash-sidebar p-3 md:p-6 flex flex-row md:flex-col gap-2 md:gap-4 h-auto md:h-full shrink-0 overflow-x-auto md:overflow-y-auto no-scrollbar">
      <button
        onClick={() => setActiveFolder("compose")}
        className="flex items-center justify-center gap-2 w-auto md:w-full shrink-0 bg-dash-accent text-white py-2.5 px-6 md:py-3 md:px-4 rounded-xl hover:opacity-90 transition-all font-semibold md:mb-4 shadow-sm shadow-dash-accent/20"
      >
        <PenSquare size={18} />
        <span className="hidden md:block whitespace-nowrap">Compose</span>
      </button>

      <nav className="flex flex-row md:flex-col gap-1.5 md:gap-2 flex-1 md:flex-none shrink-0 min-w-max md:min-w-0">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const isActive = activeFolder === folder.id;
          return (
            <button
              key={folder.id}
              onClick={() => setActiveFolder(folder.id as any)}
              className={cn(
                "flex items-center gap-3 w-auto md:w-full p-2.5 md:p-3 rounded-xl transition-all font-medium text-sm ",
                isActive
                  ? "bg-dash-accent/10 text-dash-accent   font-semibold"
                  : "text-dash-muted border-transparent hover:bg-dash-bg hover:text-dash-text hover:border-dash-border/30"
              )}
            >
              <Icon size={18} />
              <span className="whitespace-nowrap">{folder.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
