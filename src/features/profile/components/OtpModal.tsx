import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import api from "../../../lib/api";

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  operation_id: string;
}

export function OtpModal({ open, onClose, operation_id }: OtpModalProps) {
  const [otp, setOtp] = useState("");
  const queryClient = useQueryClient();

  const { mutate: verifyOtp, isPending } = useMutation({
    mutationFn: async (data: { otp: string; operation_id: string }) => {
      return api.post("user/verify-otp-and-update", data);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      onClose();
    },
    onError: (error: unknown) => {
      let message = "Failed to verify OTP";
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response: { data?: { message?: string } };
        };
        message = axiosError.response.data?.message || message;
      }
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    verifyOtp({ otp, operation_id });
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-md">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Verify Update</h2>
        <p className="text-slate-400 text-sm mb-6">
          A 6-digit verification code has been sent to your email. Please enter
          it below to confirm your changes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full max-w-[200px] text-center text-2xl tracking-[0.5em] font-bold bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
              placeholder="000000"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isPending || otp.length !== 6}
            className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Confirm Changes"
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
}
