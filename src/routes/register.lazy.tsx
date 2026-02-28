import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Stepper } from "../components/ui/Stepper";
import { useAuthStore, type User } from "../features/auth/useAuthStore";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Eye, EyeOff, Upload } from "lucide-react";
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
      className="fixed inset-0 flex justify-center px-4 sm:px-6 py-4 sm:py-10 overflow-auto bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/register-bg.png")' }}
    >
      <div className="relative z-10 w-full max-w-[1000px] my-auto">
        {/* Card */}
        <div className="rounded-[12px] bg-[#1a2f3f] p-6 sm:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.65)]">
          <div className="flex items-start justify-between mb-4">
            <button
              type="button"
              className="text-white text-2xl leading-none px-1"
              onClick={() => navigate({ to: "/" })}
            >
              ×
            </button>
            <img src={logo} alt="Nova Group" className="h-12 sm:h-16" />
          </div>

          <div className="text-center mb-[66px]">
            <h1 className="text-2xl sm:text-[28px] font-semibold text-white">
              {step === 0 && "Sign Up"}
              {step === 1 && "Confirm Sponsor ID"}
              {step === 2 && "Account Details"}
              {step === 3 && "Create PIN"}
              {step === 4 && "Review and Confirm"}
            </h1>
            <p className="text-[20px] text-white ">
              {step === 0 && "Enter your details to create your member account"}
              {step === 1 &&
                "Are you sure you want to join under the Sponsor ID:" +
                  " " +
                  formData.sponsorId}
              {step === 2 && "Enter your details to create your member account"}
              {step === 3 && "Create your PIN"}
              {step === 4 &&
                "Please review your information before creating your account."}
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
      <div className="flex gap-4 pt-8 mx-auto w-full max-w-[480px]">
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
      <div className="flex gap-4 pt-8 mx-auto w-full max-w-[480px]">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AccountDetailsSchema>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      sponsorId: data.sponsorId,
      countryCode: "+20",
    },
  });

  const avatarFile = watch("avatar");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("avatar", e.target.files);
    }
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4 pr-2">
      {/* Profile Image */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white">Profile Image</label>
        <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row bg-white rounded-xl p-3 border border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white/20">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-200">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
            <span className="text-gray-500 text-sm">
              {avatarFile?.[0]?.name || "No file chosen"}
            </span>
          </div>
          <label className="cursor-pointer bg-white border border-brand-blue/30 text-brand-blue px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-blue/5 transition-colors">
            Choose File
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      </div>

      <Input
        label="Sponsor ID *"
        error={errors.sponsorId?.message}
        {...register("sponsorId")}
        readOnly
        className="bg-white"
        placeholder="Enter your Name"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          placeholder="Enter your Name"
          error={errors.firstName?.message}
          {...register("firstName")}
          className="bg-white"
        />
        <Input
          label="Last Name *"
          placeholder="Enter your Email"
          error={errors.lastName?.message}
          {...register("lastName")}
          className="bg-white"
        />
      </div>

      <Input
        label="Username *"
        placeholder="Enter Username"
        error={errors.username?.message}
        {...register("username")}
        className="bg-white"
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-white">Phone Number*</label>
        <div className="phone-input-container">
          <PhoneInput
            defaultCountry="eg"
            value={watch("phone")}
            onChange={(phone) => setValue("phone", phone)}
            className="w-full"
            forceDialCode
            inputClassName="!w-full !h-[48px] !rounded-lg !border-0 !bg-white !text-gray-900 !px-4 !py-3 !outline-none !ring-2 !ring-transparent focus:!ring-brand-blue"
            countrySelectorStyleProps={{
              buttonClassName:
                "!h-[48px] !bg-white !border-0 !rounded-lg !px-3 !ml-2",
              dropdownStyleProps: {
                style: {
                  right: 0,
                  left: "auto",
                },
              },
            }}
            style={{
              flexDirection: "row-reverse",
              display: "flex",
              gap: "8px",
            }}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>
        )}
      </div>

      <Input
        label="Email *"
        type="email"
        placeholder="Enter your Email"
        error={errors.email?.message}
        {...register("email")}
        className="bg-white"
      />

      <Input
        label="Password *"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your Password"
        error={errors.password?.message}
        className="bg-white"
        {...register("password")}
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        }
      />

      <Input
        label="Confirm Password *"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Enter your Password"
        error={errors.confirmPassword?.message}
        className="bg-white"
        {...register("confirmPassword")}
        rightElement={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        }
      />

      <div className="flex gap-4 pt-8 mx-auto w-full max-w-[480px]">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
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
      <div className="flex gap-4 pt-8 mx-auto w-full max-w-[480px]">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
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
    { label: "First Name", value: data.firstName },
    { label: "Last Name", value: data.lastName },
    { label: "User Name", value: data.username },
    {
      label: "Phone Number",
      value: `${data.phone ?? ""}`.trim(),
    },
    { label: "Email", value: data.email },
    { label: "Sponsor ID", value: `${data.sponsorId} ()` },
  ];

  return (
    <div className="space-y-8">
      {isError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
          Registration failed. Please check your image and other fields.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
        {fields.map((f) => (
          <div key={f.label} className="flex items-baseline gap-2">
            <span className="text-white text-base font-semibold whitespace-nowrap">
              {f.label}:
            </span>
            <span className="text-white/90 text-base font-medium truncate">
              {f.value || "—"}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-white/10" />

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-6 h-6 rounded bg-white accent-brand-blue"
        />
        <span className="text-base text-white font-medium">
          I agree to the terms and conditions
        </span>
      </label>

      <div className="flex gap-4 pt-8 mx-auto w-full max-w-[480px]">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="button"
          className="flex-1 shadow-lg hover:shadow-brand-blue/20 transition-all font-semibold"
          disabled={!agreed || isPending}
          onClick={() => registerMutation()}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </div>
  );
}
