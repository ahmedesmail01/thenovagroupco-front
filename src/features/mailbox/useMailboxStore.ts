import { create } from "zustand";

export type MailboxFolder = "inbox" | "sent" | "trash" | "compose";

interface MailboxState {
  isOpen: boolean;
  activeFolder: MailboxFolder;
  activeMessageId: number | null;
  activeMessageType: "inbox" | "sent" | "trash" | null;

  openMailbox: (folder?: MailboxFolder) => void;
  closeMailbox: () => void;
  setActiveFolder: (folder: MailboxFolder) => void;
  openMessage: (id: number, type: "inbox" | "sent" | "trash") => void;
  closeMessage: () => void;
}

export const useMailboxStore = create<MailboxState>((set) => ({
  isOpen: false,
  activeFolder: "inbox",
  activeMessageId: null,
  activeMessageType: null,

  openMailbox: (folder = "inbox") =>
    set({ isOpen: true, activeFolder: folder }),
  closeMailbox: () =>
    set({
      isOpen: false,
      activeMessageId: null,
      activeMessageType: null,
    }),
  setActiveFolder: (folder) =>
    set({ activeFolder: folder, activeMessageId: null, activeMessageType: null }),
  openMessage: (id, type) =>
    set({ activeMessageId: id, activeMessageType: type }),
  closeMessage: () => set({ activeMessageId: null, activeMessageType: null }),
}));
