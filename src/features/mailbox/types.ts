export interface MailboxUser {
  id: number;
  name: string;
  email: string;
}

export interface MailboxRecipient {
  id: number;
  recipient_id: number;
  recipient: MailboxUser;
}

export interface MailboxMessageData {
  id: number;
  sender_id: number;
  subject: string;
  body: string;
  delivery_type: string;
  tree_side: string;
  created_at: string;
  updated_at: string;
  sender?: MailboxUser;
  attachments?: any[];
}

export interface InboxMessage {
  id: number;
  message_id: number;
  recipient_id: number;
  is_read: boolean;
  read_at: string | null;
  deleted_by_recipient: boolean;
  created_at: string;
  updated_at: string;
  message: MailboxMessageData;
}

export interface SentMessage {
  id: number;
  sender_id: number;
  subject: string;
  body: string;
  delivery_type: string;
  tree_side: string;
  created_at: string;
  updated_at: string;
  recipients_count: number;
  recipients: MailboxRecipient[];
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ComposeMessageDto {
  subject?: string;
  body: string;
  delivery_type: "direct" | "upline" | "downline";
  tree_side?: "left" | "right" | "both";
  recipient_ids?: number[];
}
