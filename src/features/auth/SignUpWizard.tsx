import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "../../components/ui/Modal";
import { Stepper } from "../../components/ui/Stepper";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useAuthStore } from "./useAuthStore";
import api from "../../lib/api";
import { COUNTRY_CODES } from "../../lib/countryCodes";
import type {
  SponsorIdSchema,
  AccountDetailsSchema,
  SignUpData,
} from "./schemas";
import { sponsorIdSchema, accountDetailsSchema } from "./schemas";

const STEPS = [
  "Sponsor ID",
  "Confirm Sponsor ID",
  "Account Details",
  "Create Pin Code",
  "Review",
];

export function SignUpWizard() {
  const { signupModalOpen, setSignupModalOpen, setLoginModalOpen, login } =
    useAuthStore();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SignUpData>({});

  const next = (data: Partial<SignUpData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const handleFinish = (data: SignUpData) => {
    // In Review step, the data is already merged
    setFormData(data);
  };

  const closeAndReset = () => {
    setSignupModalOpen(false);
    setTimeout(() => {
      setStep(0);
      setFormData({});
    }, 300);
  };

  return (
    <Modal open={signupModalOpen} onClose={closeAndReset} className="max-w-2xl">
      <button
        className="absolute top-4 left-4 text-text-secondary hover:text-white transition-colors"
        onClick={closeAndReset}
      >
        ✕
      </button>

      <div className="absolute top-4 right-6">
        <div className="text-xl font-bold text-white tracking-widest">NOVA</div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold text-white text-center">Sign Up</h2>
        <p className="text-text-secondary text-sm text-center mt-1 mb-6">
          Enter your details to create your member account
        </p>

        <Stepper steps={STEPS} current={step} />

        <div className="mt-8">
          {step === 0 && <StepSponsorId onNext={next} />}
          {step === 1 && (
            <StepConfirmSponsorId data={formData} onNext={next} onBack={back} />
          )}
          {step === 2 && (
            <StepAccountDetails data={formData} onNext={next} onBack={back} />
          )}
          {step === 3 && <StepCreatePin onNext={next} onBack={back} />}
          {step === 4 && (
            <StepReview
              data={formData}
              onBack={back}
              onSuccess={closeAndReset}
            />
          )}
        </div>

        <p className="text-center text-sm text-text-secondary mt-8">
          Already have an account?{" "}
          <button
            className="text-white underline font-semibold hover:text-brand-blue transition-colors"
            onClick={() => {
              setSignupModalOpen(false);
              setLoginModalOpen(true);
            }}
          >
            Login ↗
          </button>
        </p>
      </div>
    </Modal>
  );
}

function StepSponsorId({ onNext }: { onNext: (d: SponsorIdSchema) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SponsorIdSchema>({
    resolver: zodResolver(sponsorIdSchema),
  });
  return (
    <form onSubmit={handleSubmit(onNext)} className="flex flex-col gap-4">
      <Input
        label="Sponsor ID *"
        placeholder="Enter your Sponsor ID"
        error={errors.sponsorId?.message}
        {...register("sponsorId")}
      />
      <div className="flex gap-3 mt-4">
        <Button type="button" variant="outline" className="flex-1" disabled>
          Back
        </Button>
        <Button type="submit" className="flex-1 shadow-md shadow-brand-blue/20">
          Next
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
  onNext: (d: any) => void;
  onBack: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="p-6 bg-brand-navy/50 rounded-xl border border-brand-border text-center space-y-3">
        <p className="text-text-secondary text-sm">
          Are you sure you want to join under the Sponsor ID:
        </p>
        <p className="text-white font-bold text-2xl tracking-tight">
          {data.sponsorId}
        </p>
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-blue/10 text-brand-blue-light rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-blue-light animate-pulse" />
            Verified Sponsor
          </span>
        </div>
      </div>
      <label className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors border border-white/5">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="w-5 h-5 accent-brand-blue rounded border-white/20"
        />
        <span className="text-white text-sm font-medium">
          Yes, I confirm this sponsor ID
        </span>
      </label>
      <div className="flex gap-3 mt-4">
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
          className="flex-1 shadow-md shadow-brand-blue/20"
          disabled={!confirmed}
          onClick={() => onNext({})}
        >
          Next
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
    control,
    formState: { errors },
  } = useForm<AccountDetailsSchema>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: {
      sponsorId: data.sponsorId,
      ...(data as any),
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto px-1"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          placeholder="Enter your First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name *"
          placeholder="Enter your Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
      <Input
        label="User Name *"
        placeholder="Enter your User Name"
        error={errors.username?.message}
        {...register("username")}
      />

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5 ml-1">
          Phone Number *
        </label>
        <div className="flex gap-2">
          <select
            className="w-28 rounded-lg bg-white px-2 py-3 text-gray-900 border-none outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            {...register("countryCode")}
            defaultValue="+20"
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
        placeholder="Enter your Email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Password *"
        type="password"
        placeholder="Enter your Password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Confirm Password *"
        type="password"
        placeholder="Confirm your Password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className="flex gap-3 mt-4 sticky bottom-0 bg-brand-surface pt-4 pb-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1">
          Next
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
    if (val && i < 3) document.getElementById(`pin-${i + 1}`)?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-6 px-1">
      <p className="text-text-secondary text-sm text-center">
        Create a 4-digit PIN to secure your account
      </p>
      <div className="flex gap-4">
        {pin.map((v, i) => (
          <input
            key={i}
            id={`pin-${i}`}
            type="password"
            inputMode="numeric"
            maxLength={1}
            value={v}
            onChange={(e) => handlePinChange(i, e.target.value)}
            className="w-14 h-14 text-center text-2xl font-bold rounded-xl bg-white text-gray-900 border-2 border-transparent focus:border-brand-blue outline-none"
          />
        ))}
      </div>
      <div className="flex gap-3 w-full mt-2">
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
          Next
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
  onSuccess: () => void;
}) {
  const [agreed, setAgreed] = useState(false);
  const login = useAuthStore((s) => s.login);
  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: (payload: any) => api.post("/auth/register", payload),
    onSuccess: (response: any) => {
      const { user, token } = response.data;
      login(user, token);
      onSuccess();
    },
    onError: (err) => {
      console.error("Registration failed", err);
      // Simulate success for demo
      // login({ id: '1', firstName: data.firstName, lastName: data.lastName, username: data.username, email: data.email } as any, 'fake-token');
      // onSuccess();
    },
  });

  const fields = [
    { label: "First Name", value: data.firstName },
    { label: "Last Name", value: data.lastName },
    { label: "User Name", value: data.username },
    { label: "Phone Number", value: `${data.countryCode} ${data.phone}` },
    { label: "Email", value: data.email },
    { label: "Sponsor ID", value: data.sponsorId },
  ];

  return (
    <div className="flex flex-col gap-4 mt-4 px-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 bg-brand-navy/30 p-4 rounded-xl border border-brand-border">
        {fields.map((f) => (
          <div key={f.label} className="text-sm">
            <span className="text-text-muted block text-xs uppercase font-bold tracking-wider mb-0.5">
              {f.label}
            </span>
            <span className="text-white font-medium">{f.value || "N/A"}</span>
          </div>
        ))}
      </div>
      <hr className="border-brand-border my-2" />
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-5 h-5 accent-brand-blue rounded border-white/20"
        />
        <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
          I agree to the terms and conditions
        </span>
      </label>
      <div className="flex gap-3 mt-4">
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
          className="flex-1 h-12"
          disabled={!agreed || isPending}
          onClick={() => registerMutation(data)}
        >
          {isPending ? "Submitting..." : "Submit & Register"}
        </Button>
      </div>
    </div>
  );
}
