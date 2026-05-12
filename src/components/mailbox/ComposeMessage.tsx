import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendMessage } from "../../features/mailbox/useMailbox";
import { useMailboxStore } from "../../features/mailbox/useMailboxStore";
import { Send, Loader2, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const composeSchema = z.object({
  delivery_type: z.enum(["direct", "upline", "downline"]),
  tree_side: z.enum(["left", "right", "both"]).optional(),
  recipient_ids: z.string().optional(),
  subject: z.string().max(255).optional(),
  body: z.string().min(1, "Message content is required"),
});

type ComposeFormData = z.infer<typeof composeSchema>;

export function ComposeMessage() {
  const { setActiveFolder } = useMailboxStore();
  const sendMessage = useSendMessage();

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
        recipient_ids:
          data.delivery_type === "direct" && data.recipient_ids
            ? data.recipient_ids.split(",").map((id) => parseInt(id.trim(), 10))
            : undefined,
      };

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
            <div className="flex flex-col gap-1.5 animate-in fade-in zoom-in duration-200">
              <label className="text-sm font-semibold text-dash-text ml-1">Recipient IDs</label>
              <input
                type="text"
                {...register("recipient_ids")}
                placeholder="e.g. 123, 456"
                className="bg-dash-sidebar border border-dash-border text-dash-text text-sm rounded-xl p-3.5 focus:border-dash-accent focus:ring-2 focus:ring-dash-accent/20 outline-none transition-all shadow-sm"
              />
              <p className="text-xs text-dash-muted ml-1">Enter comma-separated user IDs.</p>
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
