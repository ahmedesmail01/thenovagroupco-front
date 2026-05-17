import { create } from "zustand";

export type MailboxFolder = "inbox" | "sent" | "trash" | "compose";

import type { InboxMessage, SentMessage } from "./types";

interface MailboxState {
  isOpen: boolean;
  activeFolder: MailboxFolder;
  activeMessageId: number | null;
  activeMessageData?: InboxMessage | SentMessage | null;
  activeMessageType: "inbox" | "sent" | "trash" | null;

  openMailbox: (folder?: MailboxFolder) => void;
  closeMailbox: () => void;
  setActiveFolder: (folder: MailboxFolder) => void;
  openMessage: (id: number, type: "inbox" | "sent" | "trash", data?: InboxMessage | SentMessage) => void;
  closeMessage: () => void;
}

export const useMailboxStore = create<MailboxState>((set) => ({
  isOpen: false,
  activeFolder: "inbox",
  activeMessageId: null,
  activeMessageData: null,
  activeMessageType: null,

  openMailbox: (folder = "inbox") =>
    set({ isOpen: true, activeFolder: folder }),
  closeMailbox: () =>
    set({
      isOpen: false,
      activeMessageId: null,
      activeMessageData: null,
      activeMessageType: null,
    }),
  setActiveFolder: (folder) =>
    set({ activeFolder: folder, activeMessageId: null, activeMessageData: null, activeMessageType: null }),
  openMessage: (id, type, data) =>
    set({ activeMessageId: id, activeMessageType: type, activeMessageData: data }),
  closeMessage: () => set({ activeMessageId: null, activeMessageData: null, activeMessageType: null }),
}));
