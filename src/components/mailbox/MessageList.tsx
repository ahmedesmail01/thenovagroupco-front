import { useMailboxStore } from "../../features/mailbox/useMailboxStore";
import { useInbox, useSentMessages, useTrashMessages } from "../../features/mailbox/useMailbox";
import { Loader2, Mail, MailOpen, Trash2, Reply, Check, CheckCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import type { InboxMessage, SentMessage } from "../../features/mailbox/types";

export function MessageList() {
  const { activeFolder, openMessage } = useMailboxStore();

  const isInbox = activeFolder === "inbox";
  const isSent = activeFolder === "sent";
  const isTrash = activeFolder === "trash";

  const inboxQuery = useInbox(1, 50);
  const sentQuery = useSentMessages(1, 50);
  const trashQuery = useTrashMessages(1, 50);

  const query = isInbox ? inboxQuery : isSent ? sentQuery : trashQuery;

  if (query.isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dash-bg">
        <Loader2 className="animate-spin text-dash-accent" size={32} />
      </div>
    );
  }

  const messages = query.data?.data?.data || [];

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-dash-bg text-dash-muted">
        {isTrash ? <Trash2 size={48} className="mb-4 opacity-50" /> : <MailOpen size={48} className="mb-4 opacity-50" />}
        <p className="text-lg font-medium">No messages found in {activeFolder}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-dash-bg flex flex-col overflow-hidden">
      <div className="p-4 md:p-6 border-b border-dash-border bg-dash-sidebar flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold text-dash-text capitalize tracking-tight">{activeFolder}</h2>
        <span className="text-xs font-semibold bg-dash-accent/10 text-dash-accent px-3 py-1.5 rounded-full">
          {query.data?.data?.total || 0} messages
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-6 flex flex-col gap-3">
        {messages.map((msg: InboxMessage | SentMessage) => {
          // Determine the display properties based on message type
          const isUnread = isInbox && !("recipients_count" in msg) && !msg.is_read;
          const displaySender = isSent
            ? `To: ${(msg as SentMessage).recipients_count} recipient(s)`
            : (msg as InboxMessage).message?.sender?.username || (msg as InboxMessage).message?.sender?.name || "Unknown Sender";
          const displaySubject = isSent ? (msg as SentMessage).subject : (msg as InboxMessage).message?.subject;
          const displayBodyPreview = isSent ? (msg as SentMessage).body : (msg as InboxMessage).message?.body;

          const isSentReadByAll = isSent && (msg as SentMessage).recipients?.length > 0 && (msg as SentMessage).recipients?.every((r) => r.is_read);
          const isSentReadBySome = isSent && !isSentReadByAll && (msg as SentMessage).recipients?.some((r) => r.is_read);

          return (
            <div
              key={msg.id}
              onClick={() => openMessage(isSent ? (msg as SentMessage).id : (msg as InboxMessage).message_id, activeFolder as "inbox" | "sent" | "trash", msg)}
              className={cn(
                "group flex flex-col sm:flex-row sm:items-center gap-3 p-4 md:p-5 rounded-2xl cursor-pointer transition-all border",
                isUnread
                  ? "bg-dash-sidebar border-dash-accent/30 shadow-sm shadow-dash-accent/5"
                  : "bg-dash-sidebar/40 border-transparent hover:bg-dash-sidebar hover:border-dash-border hover:shadow-sm"
              )}
            >
              <div className="flex items-center gap-4 shrink-0 sm:w-56">
                {isUnread ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-dash-accent shrink-0 shadow-sm shadow-dash-accent/50" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-transparent shrink-0" />
                )}
                <div className={cn("w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isUnread ? "bg-dash-accent/10 text-dash-accent" : "bg-dash-bg text-dash-muted group-hover:bg-dash-accent/10 group-hover:text-dash-accent")}>
                  <Mail size={20} />
                </div>
                <span className={cn("text-sm truncate", isUnread ? "font-bold text-dash-text" : "font-medium text-dash-muted group-hover:text-dash-text transition-colors")}>
                  {displaySender}
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-3">
                  <span className={cn("text-base truncate", isUnread ? "font-bold text-dash-text" : "font-semibold text-dash-text/80")}>
                    {displaySubject || "No Subject"}
                  </span>
                  <span className="text-xs font-medium text-dash-muted whitespace-nowrap shrink-0 flex items-center gap-1">
                    {isSent && (
                      isSentReadByAll ? (
                        <CheckCheck size={14} className="text-blue-500" />
                      ) : isSentReadBySome ? (
                        <CheckCheck size={14} className="text-dash-muted" />
                      ) : (
                        <Check size={14} className="text-dash-muted" />
                      )
                    )}
                    {format(new Date(msg.created_at), "MMM d, h:mm a")}
                  </span>
                </div>
                <p className="text-sm text-dash-muted line-clamp-1">
                  {displayBodyPreview || "No content"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
