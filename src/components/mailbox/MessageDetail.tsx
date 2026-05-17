import { useMailboxStore } from "../../features/mailbox/useMailboxStore";
import { useMessageDetails, useMoveToTrash, useRestoreMessage } from "../../features/mailbox/useMailbox";
import { ArrowLeft, Loader2, Trash2, Reply, RefreshCw, UserCircle2 } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import type { InboxMessage, SentMessage } from "../../features/mailbox/types";

export function MessageDetail() {
  const { activeMessageId, activeMessageType, activeMessageData, closeMessage } = useMailboxStore();
  const isSent = activeMessageType === "sent";
  const { data: response, isLoading } = useMessageDetails(isSent ? null : activeMessageId);
  const moveToTrash = useMoveToTrash();
  const restoreMessage = useRestoreMessage();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-dash-bg">
        <Loader2 className="animate-spin text-dash-accent" size={32} />
      </div>
    );
  }

  const messageWrapper = isSent ? activeMessageData : response?.data;
  if (!messageWrapper) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-dash-bg">
        <p className="text-dash-muted">Message not found</p>
      </div>
    );
  }


  
  // Normalize data between inbox/trash and sent structures
  const messageData = isSent 
    ? (messageWrapper as SentMessage) 
    : (messageWrapper as InboxMessage).message;

  const inboxMessageData = !isSent ? (messageWrapper as InboxMessage).message : null;
  const displaySenderName = isSent ? "You" : inboxMessageData?.sender?.username || inboxMessageData?.sender?.name || "Unknown";
  const displaySenderEmail = isSent ? "" : inboxMessageData?.sender?.email || "";
  const displayDate = messageWrapper.created_at ? format(new Date(messageWrapper.created_at), "PPP 'at' p") : "";

  const handleTrash = async () => {
    try {
      await moveToTrash.mutateAsync(messageWrapper.id);
      toast.success("Message moved to trash");
      closeMessage();
    } catch (error) {
      toast.error("Failed to move message to trash");
    }
  };

  const handleRestore = async () => {
    try {
      await restoreMessage.mutateAsync(messageWrapper.id);
      toast.success("Message restored");
      closeMessage();
    } catch (error) {
      toast.error("Failed to restore message");
    }
  };

  return (
    <div className="flex-1 bg-dash-bg flex flex-col overflow-hidden relative">
      {/* Header Actions */}
      <div className="p-4 md:p-6 border-b border-dash-border bg-dash-sidebar flex items-center justify-between shrink-0 sticky top-0 z-10">
        <button
          onClick={closeMessage}
          className="flex items-center gap-2 text-sm font-semibold text-dash-muted hover:text-dash-text hover:bg-dash-bg px-3 py-2 rounded-xl transition-all"
        >
          <ArrowLeft size={18} />
          Back to list
        </button>

        <div className="flex items-center gap-2">
          {activeMessageType === "trash" ? (
            <button
              onClick={handleRestore}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-dash-muted hover:text-green-600 hover:bg-green-500/10 rounded-xl transition-all"
            >
              <RefreshCw size={18} />
              <span className="hidden sm:inline">Restore</span>
            </button>
          ) : (
            <button
              onClick={handleTrash}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-dash-muted hover:text-red-600 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <Trash2 size={18} />
              <span className="hidden sm:inline">Move to Trash</span>
            </button>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-dash-bg/50">
        <div className="max-w-4xl mx-auto bg-dash-sidebar border border-dash-border rounded-3xl p-6 md:p-10 shadow-sm">
          <h1 className="text-2xl md:text-4xl font-bold text-dash-text mb-8 tracking-tight leading-tight">
            {messageData?.subject || "No Subject"}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-dash-border/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-dash-bg border border-dash-border flex items-center justify-center text-dash-muted shadow-sm">
                <UserCircle2 size={32} className="opacity-80" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold text-dash-text leading-snug">{displaySenderName}</p>
                {displaySenderEmail && (
                  <p className="text-sm font-medium text-dash-muted">{displaySenderEmail}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-1.5 pl-18 sm:pl-0">
              <p className="text-sm font-medium text-dash-muted">{displayDate}</p>
              {isSent && (
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-xs font-bold text-dash-accent bg-dash-accent/10 inline-flex items-center px-2.5 py-1 rounded-lg">
                    To: {(messageWrapper as SentMessage).recipients_count} recipients ({(messageWrapper as SentMessage).delivery_type})
                  </p>
                  <p className="text-xs text-dash-muted">
                    {(messageWrapper as SentMessage).recipients?.map((r) => r.recipient.username || r.recipient.name).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-dash-text/90 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
              {messageData?.body || "No content."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
