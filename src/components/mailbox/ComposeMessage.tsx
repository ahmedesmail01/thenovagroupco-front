import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendMessage } from "../../features/mailbox/useMailbox";
import { useMailboxStore } from "../../features/mailbox/useMailboxStore";
import { Send, Loader2, ChevronDown, X, Search } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/api";

import type { MailboxUser } from "../../features/mailbox/types";

const composeSchema = z.object({
  delivery_type: z.enum(["direct", "upline", "downline"]),
  tree_side: z.enum(["left", "right", "both"]).optional(),
  recipient_ids: z.any().optional(),
  subject: z.string().max(255).optional(),
  body: z.string().min(1, "Message content is required"),
});

type ComposeFormData = z.infer<typeof composeSchema>;

export function ComposeMessage() {
  const { setActiveFolder } = useMailboxStore();
  const sendMessage = useSendMessage();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MailboxUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<MailboxUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await api.get<{ success: boolean; data: MailboxUser[] }>("/messages/search-members", { params: { search: searchQuery } });
        setSearchResults(response.data.data || []);
        setShowDropdown(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUser = (user: MailboxUser) => {
    if (!selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleRemoveUser = (userId: number) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ComposeFormData>({
    resolver: zodResolver(composeSchema),
    defaultValues: {
      delivery_type: "downline",
      tree_side: "both",
    },
  });

  const deliveryType = watch("delivery_type");

  const onSubmit = async (data: ComposeFormData) => {
    try {
      const payload = {
        ...data,
        recipient_ids: data.delivery_type === "direct" ? selectedUsers.map(u => u.id) : undefined,
      };

      if (data.delivery_type === "direct" && selectedUsers.length === 0) {
        toast.error("Please select at least one recipient");
        return;
      }

      await sendMessage.mutateAsync(payload);
      toast.success("Message sent successfully!");
      setActiveFolder("sent");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-dash-bg overflow-y-auto p-4 ">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-6 pb-6 border-b border-dash-border">
          <h2 className="text-2xl md:text-3xl font-bold text-dash-text tracking-tight">New Message</h2>
          <p className="text-dash-muted mt-1 text-sm">Send a message to your team or upline.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-dash-text ml-1">Delivery Type</label>
              <div className="relative">
                <select
                  {...register("delivery_type")}
                  className="w-full bg-dash-sidebar border border-dash-border text-dash-text text-sm rounded-xl p-3.5 pr-10 focus:border-dash-accent focus:ring-2 focus:ring-dash-accent/20 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option value="direct">Direct Message</option>
                  <option value="upline">Upline Network</option>
                  <option value="downline">Downline Network</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-dash-muted">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {deliveryType !== "direct" && (
              <div className="flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200">
                <label className="text-sm font-semibold text-dash-text ml-1">Tree Side</label>
                <div className="relative">
                  <select
                    {...register("tree_side")}
                    className="w-full bg-dash-sidebar border border-dash-border text-dash-text text-sm rounded-xl p-3.5 pr-10 focus:border-dash-accent focus:ring-2 focus:ring-dash-accent/20 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="both">Both Sides</option>
                    <option value="left">Left Side Only</option>
                    <option value="right">Right Side Only</option>
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-dash-muted">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {deliveryType === "direct" && (
            <div className="flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200" ref={searchRef}>
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <label className="text-sm font-semibold text-dash-text ml-1">Recipient Name(s)</label>
                {selectedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-1.5 bg-dash-accent/10 text-dash-accent text-xs font-semibold pr-2.5 pl-1.5 py-1 rounded-lg border border-dash-accent/20">
                    {user.image ? (
                      <img src={user.image} alt="Avatar" className="w-4 h-4 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-dash-accent text-white flex items-center justify-center shrink-0 uppercase text-[9px]">
                        {user.email ? user.email.charAt(0) : "U"}
                      </div>
                    )}
                    {user.username || user.name || user.email || user.id_code}
                    <button type="button" onClick={() => handleRemoveUser(user.id)} className="hover:text-red-500 transition-colors ml-0.5">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => { if (searchQuery.trim()) setShowDropdown(true); }}
                  placeholder="Search by username, name, or email..."
                  className="w-full bg-dash-sidebar border border-dash-border text-dash-text text-sm rounded-xl p-3.5 pl-10 focus:border-dash-accent focus:ring-2 focus:ring-dash-accent/20 outline-none transition-all shadow-sm"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dash-muted" />
                {isSearching && (
                  <Loader2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dash-muted animate-spin" />
                )}
                
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-dash-sidebar border border-dash-border rounded-xl shadow-lg shadow-black/5 overflow-hidden max-h-60 overflow-y-auto">
                    {searchResults.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="px-4 py-3 hover:bg-dash-bg cursor-pointer transition-colors border-b border-dash-border/50 last:border-0 flex items-center gap-3"
                      >
                        {user.image ? (
                          <img src={user.image} alt="User Avatar" className="w-8 h-8 rounded-full object-cover shrink-0 bg-dash-bg border border-dash-border" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-dash-accent/10 text-dash-accent font-bold flex items-center justify-center shrink-0 border border-dash-accent/20 uppercase">
                            {user.email ? user.email.charAt(0) : "U"}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-dash-text">{user.username || user.name || `User #${user.id_code}`}</span>
                          {user.email && <span className="text-xs text-dash-muted">{user.email}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showDropdown && searchResults.length === 0 && !isSearching && searchQuery.trim() !== "" && (
                  <div className="absolute z-10 w-full mt-2 bg-dash-sidebar border border-dash-border rounded-xl shadow-lg p-4 text-center">
                    <span className="text-sm text-dash-muted">No users found</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-sm font-semibold text-dash-text ml-1">Subject</label>
            <input
              type="text"
              {...register("subject")}
              placeholder="What is this message about?"
              className="bg-dash-sidebar border border-dash-border text-dash-text text-sm rounded-xl p-3.5 focus:border-dash-accent focus:ring-2 focus:ring-dash-accent/20 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5 flex-1 mt-2">
            <label className="text-sm font-semibold text-dash-text ml-1">Message Content</label>
            <textarea
              {...register("body")}
              placeholder="Write your message here..."
              className="flex-1 bg-dash-sidebar border border-dash-border text-dash-text text-base rounded-xl p-4 focus:border-dash-accent focus:ring-2 focus:ring-dash-accent/20 outline-none transition-all resize-none min-h-[250px] shadow-sm leading-relaxed"
            />
            {errors.body && <p className="text-red-500 text-sm font-medium ml-1 animate-pulse">{errors.body.message}</p>}
          </div>

          <div className="flex justify-end pt-6 pb-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-dash-accent text-white py-3.5 px-8 rounded-xl hover:bg-dash-accent/90 transition-all font-semibold disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-dash-accent/20"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
