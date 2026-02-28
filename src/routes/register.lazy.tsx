import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Stepper } from "../components/ui/Stepper";
import { useAuthStore, type User } from "../features/auth/useAuthStore";
import { COUNTRY_CODES } from "../lib/countryCodes";
import api from "../lib/api";
import type {
  SponsorIdSchema,
  AccountDetailsSchema,
  SignUpData,
} from "../features/auth/schemas";
import {
  sponsorIdSchema,
  accountDetailsSchema,
} from "../features/auth/schemas";
import logo from "../../public/images/nova-logo.png";

export const Route = createLazyFileRoute("/register")({
  component: RegisterPage,
});

const STEPS = [
  "Sponsor ID",
  "Confirm Sponsor",
  "Account Details",
  "Create PIN",
  "Review",
];

function RegisterPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SignUpData>({});

  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  const next = (data: Partial<SignUpData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  return (
    <div
      className="fixed inset-0 flex  justify-center px-6  items-center  overflow-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/register-bg.png")' }}
    >
      <div className="relative z-10 max-[1229px]">
        {/* Card */}
        <div className="rounded-[12px] bg-gradient-to-b  from-brand-terquaz to-brand-navy p-10 shadow-[0_32px_80px_rgba(0,0,0,0.65)]">
          <div className="flex items-start justify-between mb-4">
            <button
              type="button"
              className="text-white text-2xl leading-none px-1"
              onClick={() => navigate({ to: "/" })}
            >
              ×
            </button>
            <img src={logo} alt="Nova Group" className="h-16" />
          </div>

          <div className="text-center mb-[66px]">
            <h1 className="text-[28px] font-semibold text-white">
              {step === 0 && "Sign Up"}
              {step === 1 && "Confirm Sponsor ID"}
              {step === 2 && "Account Details"}
              {step === 3 && "Create PIN"}
              {step === 4 && "Review"}
            </h1>
            <p className="text-sm text-white ">
              {step === 0 && "Enter your details to create your member account"}
              {step === 1 &&
                "Confirm your Sponsor ID" + " " + formData.sponsorId}
              {step === 2 && "Enter your account details"}
              {step === 3 && "Create your PIN"}
              {step === 4 && "Review your details"}
            </p>
          </div>

          <Stepper steps={STEPS} current={step} />

          <div className="mt-[66px]">
            {step === 0 && <StepSponsorId onNext={next} />}
            {step === 1 && (
              <StepConfirmSponsorId
                data={formData}
                onNext={next}
                onBack={back}
              />
            )}
            {step === 2 && (
              <StepAccountDetails data={formData} onNext={next} onBack={back} />
            )}
            {step === 3 && <StepCreatePin onNext={next} onBack={back} />}
            {step === 4 && (
              <StepReview
                data={formData}
                onBack={back}
                onSuccess={(user, token) => {
                  login(user, token);
                  navigate({ to: "/dashboard" });
                }}
              />
            )}
          </div>
          <p className="text-center mt-6 text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-semibold hover:text-brand-blue-light underline underline-offset-2 transition-colors"
            >
              Login →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step Components ────────────────────────────────

function StepSponsorId({ onNext }: { onNext: (d: SponsorIdSchema) => void }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SponsorIdSchema>({
    resolver: zodResolver(sponsorIdSchema),
  });

  const { mutate: validateSponsor, isPending } = useMutation({
    mutationFn: (sponsorId: string) => api.get(`/sponsor-data/${sponsorId}`),
    onSuccess: (response, sponsorId) => {
      const data = response.data;
      if (data?.status) {
        setServerError(null);
        onNext({ sponsorId });
      } else if (data?.message) {
        const msgField = data.message as
          | string
          | {
              sponsor_id?: string[];
            };
        const msg =
          typeof msgField === "string" ? msgField : msgField.sponsor_id?.[0];
        setServerError(msg || "Registration failed , incorrect sponsor id");
      } else {
        setServerError("Registration failed , incorrect sponsor id");
      }
    },
    onError: (error: unknown) => {
      const maybeAxiosError = error as {
        response?: { data?: { message?: string | { sponsor_id?: string[] } } };
      };
      const message = maybeAxiosError.response?.data?.message;
      const msg =
        typeof message === "string" ? message : message?.sponsor_id?.[0];
      setServerError(msg || "Registration failed , incorrect sponsor id");
    },
  });

  const onSubmit = (values: SponsorIdSchema) => {
    setServerError(null);
    validateSponsor(values.sponsorId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Sponsor ID *"
        placeholder="Enter your Sponsor ID"
        error={errors.sponsorId?.message}
        {...register("sponsorId")}
      />
      {serverError && <p className="text-xs text-red-400">{serverError}</p>}
      <p className="text-text-muted text-xs">
        Enter the Sponsor ID of the person who referred you.
      </p>
      <div className="flex gap-3 pt-2 mx-auto w-[80%]">
        <Button type="button" variant="outline" className="flex-1" disabled>
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isPending}>
          {isPending ? "Checking..." : "Next →"}
        </Button>
      </div>
    </form>
  );
}

function StepConfirmSponsorId({
  data,
  onNext,
  onBack,
}: {
  data: SignUpData;
  onNext: (d: Record<string, never>) => void;
  onBack: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="space-y-5">
      <label className="flex items-center gap-4 p-4 bg-white  rounded-xl cursor-pointer transition-colors border border-white/5">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="w-5 h-5 accent-brand-blue rounded"
        />
        <span className="text-black text-sm font-medium">
          Yes, I confirm this Sponsor ID
        </span>
      </label>
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          ← Back
        </Button>
        <Button
          type="button"
          className="flex-1"
          disabled={!confirmed}
          onClick={() => onNext({})}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

function StepAccountDetails({
  data,
  onNext,
  onBack,
}: {
  data: SignUpData;
  onNext: (d: AccountDetailsSchema) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountDetailsSchema>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: { sponsorId: data.sponsorId, countryCode: "+20" },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-4 max-h-[55vh] overflow-y-auto pr-1"
    >
      <Input
        label="Sponsor ID *"
        error={errors.sponsorId?.message}
        {...register("sponsorId")}
        readOnly
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name *"
          placeholder="First name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name *"
          placeholder="Last name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Username *"
        placeholder="e.g. johndoe_23"
        error={errors.username?.message}
        {...register("username")}
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Phone Number *
        </label>
        <div className="flex gap-2">
          <select
            className="w-28 rounded-lg bg-white px-2 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            {...register("countryCode")}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
          <input
            className="flex-1 rounded-lg bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-brand-blue"
            placeholder="Phone number"
            {...register("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <Input
        label="Email *"
        type="email"
        placeholder="your@email.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password *"
        type="password"
        placeholder="Min 8 chars, 1 uppercase, 1 number"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Confirm Password *"
        type="password"
        placeholder="Repeat password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-text-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-blue file:text-white hover:file:bg-brand-blue-light"
          {...register("avatar")}
        />
      </div>

      <div className="flex gap-3 pt-2 sticky bottom-0 bg-brand-surface pb-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          ← Back
        </Button>
        <Button type="submit" className="flex-1">
          Next →
        </Button>
      </div>
    </form>
  );
}

function StepCreatePin({
  onNext,
  onBack,
}: {
  onNext: (d: { pin: string }) => void;
  onBack: () => void;
}) {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handlePinChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...pin];
    next[i] = val;
    setPin(next);
    if (val && i < 3) document.getElementById(`reg-pin-${i + 1}`)?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[i] && i > 0) {
      document.getElementById(`reg-pin-${i - 1}`)?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-text-secondary text-sm text-center">
        Create a 4-digit PIN to secure your account
      </p>
      <div className="flex gap-4">
        {pin.map((v, i) => (
          <input
            key={i}
            id={`reg-pin-${i}`}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={v}
            onChange={(e) => handlePinChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-16 h-16 text-center text-3xl font-black rounded-xl bg-white text-gray-900 border-2 border-transparent focus:border-brand-blue outline-none transition-colors shadow-sm"
          />
        ))}
      </div>
      {pin.every(Boolean) && (
        <p className="text-green-400 text-xs font-bold flex items-center gap-1">
          ✓ PIN set successfully
        </p>
      )}
      <div className="flex gap-3 w-[80%] mx-auto">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          ← Back
        </Button>
        <Button
          type="button"
          className="flex-1"
          disabled={pin.some((p) => !p)}
          onClick={() => onNext({ pin: pin.join("") })}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}

function StepReview({
  data,
  onBack,
  onSuccess,
}: {
  data: SignUpData;
  onBack: () => void;
  onSuccess: (user: User, token: string) => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const {
    mutate: registerMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => {
      const formData = new FormData();

      formData.append("first_name", data.firstName ?? "");
      formData.append("last_name", data.lastName ?? "");
      formData.append("email", data.email ?? "");
      formData.append("mobile", data.phone ?? "");
      formData.append("password", data.password ?? "");
      formData.append("password_confirmation", data.confirmPassword ?? "");
      formData.append("sponsor_id", data.sponsorId ?? "");
      formData.append("username", data.username ?? "");
      formData.append("pin_code", data.pin ?? "");

      const avatar = data.avatar as File | FileList | undefined;
      const file =
        avatar instanceof FileList
          ? avatar.item(0)
          : avatar instanceof File
            ? avatar
            : null;
      if (file) {
        formData.append("image", file);
      }

      return api.post("/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (response) => {
      // Mapping the response to ensure it matches the User interface
      const { user, token } = response.data;
      const completeUser: User = {
        id: user.id || Math.random().toString(36).substr(2, 9),
        firstName: user.firstName || data.firstName || "",
        lastName: user.lastName || data.lastName || "",
        username: user.username || data.username || "",
        email: user.email || data.email || "",
        phone: user.phone || data.phone || "",
        avatarUrl: user.avatarUrl,
        sponsorId: user.sponsorId || data.sponsorId || "",
      };
      onSuccess(completeUser, token);
    },
    onError: (error: unknown) => {
      const maybeAxiosError = error as {
        response?: { data?: { message?: string | { image?: string[] } } };
      };
      const message = maybeAxiosError.response?.data?.message;
      const msg = typeof message === "string" ? message : message?.image?.[0];
      console.error(msg || "Registration failed.");
    },
  });

  const fields = [
    { label: "Sponsor ID", value: data.sponsorId },
    { label: "First Name", value: data.firstName },
    { label: "Last Name", value: data.lastName },
    { label: "Username", value: data.username },
    {
      label: "Phone",
      value: `${data.countryCode ?? ""} ${data.phone ?? ""}`.trim(),
    },
    { label: "Email", value: data.email },
  ];

  return (
    <div className="space-y-5">
      {isError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          Registration failed. Please check your image and other fields.
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-5 bg-brand-navy/40 rounded-xl border border-brand-border">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-text-muted text-[10px] uppercase font-bold tracking-wider mb-0.5">
              {f.label}
            </p>
            <p className="text-white text-sm font-semibold">{f.value || "—"}</p>
          </div>
        ))}
      </div>
      <hr className="border-brand-border" />
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-5 h-5 accent-brand-blue rounded mt-0.5"
        />
        <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
          I agree to the{" "}
          <span className="text-brand-blue-light underline">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-brand-blue-light underline">
            Privacy Policy
          </span>
        </span>
      </label>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          ← Back
        </Button>
        <Button
          type="button"
          className="flex-1 h-12"
          disabled={!agreed || isPending}
          onClick={() => registerMutation()}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account ✓"
          )}
        </Button>
      </div>
    </div>
  );
}
