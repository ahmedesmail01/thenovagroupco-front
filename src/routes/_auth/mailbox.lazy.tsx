import { createLazyFileRoute } from "@tanstack/react-router";
import { useMailboxStore } from "../../features/mailbox/useMailboxStore";
import { MailboxSidebar } from "../../components/mailbox/MailboxSidebar";
import { MessageList } from "../../components/mailbox/MessageList";
import { MessageDetail } from "../../components/mailbox/MessageDetail";
import { ComposeMessage } from "../../components/mailbox/ComposeMessage";

export const Route = createLazyFileRoute("/_auth/mailbox")({
  component: MailboxPage,
});

function MailboxPage() {
  const { activeFolder, activeMessageId } = useMailboxStore();

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-120px)] overflow-hidden bg-dash-bg md:p-0">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden md:rounded-3xl md:border border-dash-border  bg-dash-bg md:bg-dash-sidebar/50">
        {/* Sidebar */}
        <MailboxSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-dash-bg md:rounded-r-3xl border-t md:border-t-0 md:border-l border-dash-border">
          {activeFolder === "compose" ? (
            <ComposeMessage />
          ) : activeMessageId ? (
            <MessageDetail />
          ) : (
            <MessageList />
          )}
        </div>
      </div>
    </div>
  );
}
