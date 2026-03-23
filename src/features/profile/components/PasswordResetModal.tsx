import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";
import api from "../../../lib/api";

const passwordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordResetModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (operationId: string) => void;
}

export function PasswordResetModal({
  open,
  onClose,
  onSuccess,
}: PasswordResetModalProps) {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const { mutate: requestChange, isPending } = useMutation({
    mutationFn: async (data: PasswordFormValues) => {
      const response = await api.post("user/password/request-change", {
        old_password: data.old_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.operation_id) {
        onSuccess(data.operation_id);
        reset();
        onClose();
      } else {
        toast.error("Failed to get operation ID from server");
      }
    },
    onError: (error: unknown) => {
      let message = "Failed to request password change";
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response: { data?: { message?: string } };
        };
        message = axiosError.response.data?.message || message;
      }
      toast.error(message);
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    requestChange(data);
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-md">
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Reset Password
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Enter your current password and your new password below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPass ? "text" : "password"}
                {...register("old_password")}
                placeholder="Enter old password"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowOldPass(!showOldPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.old_password && (
              <span className="text-red-500 text-[10px]">
                {errors.old_password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPass ? "text" : "password"}
                {...register("password")}
                placeholder="Enter new password"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-[10px]">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                {...register("password_confirmation")}
                placeholder="Confirm new password"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password_confirmation && (
              <span className="text-red-500 text-[10px]">
                {errors.password_confirmation.message}
              </span>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-[#295175] hover:bg-[#1f3d58] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Request Reset
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
