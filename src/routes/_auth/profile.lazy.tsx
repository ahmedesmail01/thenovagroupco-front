import { createLazyFileRoute } from "@tanstack/react-router";
import { Upload, AlertCircle, Loader2 } from "lucide-react";
import {
  useUserData,
  type UserData,
  type Profile,
} from "../../features/auth/useUserData";

export const Route = createLazyFileRoute("/_auth/profile")({
  component: ProfileRouteComponent,
});

function ProfileImageUpload({ image }: { image?: string }) {
  // Use user image or a default fallback
  const displayImage = image || "/images/user-placeholder.png";

  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#f8f9fa] rounded-lg mb-4 mt-2 w-full max-w-[280px] flex flex-col items-center justify-center relative overflow-hidden h-[300px] border border-slate-100">
        <img
          src={displayImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        {/* Upload Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-black/80 transition-colors z-10">
          <Upload className="w-4 h-4 text-white" />
          <span className="text-white text-[13px] font-medium">
            Upload Photo
          </span>
        </div>
      </div>
      <p className="text-slate-400 text-[11px] leading-relaxed max-w-[220px] text-center">
        Image size should be under 1MB and image ratio needs to be 1:1
      </p>
    </div>
  );
}

function EditableProfileForm({ userData }: { userData: UserData }) {
  return (
    <div className="flex-1 relative">
      <div className="absolute top-0 right-0">
        <button className="bg-[#e4ebf3] hover:bg-[#d5e0ec] text-[#3b6082] text-[13px] font-semibold px-6 py-2.5 rounded-md transition-colors border border-[#c5d6e6]">
          Reset Password
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-16 max-w-3xl">
        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            First Name
          </label>
          <input
            type="text"
            defaultValue={userData.first_name}
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] focus:ring-1 focus:ring-[#295175]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            Last Name
          </label>
          <input
            type="text"
            defaultValue={userData.last_name}
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] focus:ring-1 focus:ring-[#295175]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            User Name
          </label>
          <input
            type="text"
            defaultValue={userData.username}
            readOnly
            className="w-full border border-slate-100 bg-slate-50 rounded-md px-4 py-2.5 text-[14px] text-slate-500 focus:outline-none cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            Email
          </label>
          <input
            type="text"
            defaultValue={userData.email}
            readOnly
            className="w-full border border-slate-100 bg-slate-50 rounded-md px-4 py-2.5 text-[14px] text-slate-500 focus:outline-none cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            Phone Number
          </label>
          <div className="flex border border-slate-200 rounded-md overflow-hidden focus-within:border-[#295175] focus-within:ring-1 focus-within:ring-[#295175]">
            <input
              type="text"
              defaultValue={userData.phone || ""}
              placeholder="Your Phone number..."
              className="flex-1 w-full px-4 py-2.5 text-[14px] text-slate-600 placeholder:text-slate-300 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-[#1f3a53] hover:bg-[#15283b] text-white text-[13px] font-semibold px-6 py-2.5 rounded-md transition-colors shadow-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function ReadonlyNetworkInfo({ profile }: { profile: Profile }) {
  const fields = [
    { label: "Sponsor Name", value: profile.sponsor_name || "N/A" },
    { label: "Sponsor ID", value: String(profile.sponsor_id_code || "N/A") },
    { label: "Subscription", value: profile.subscription || "No Plan" },
    { label: "ID Code", value: String(profile.id_code) },
    { label: "CV", value: String(profile.current_cv) },
    { label: "Status", value: profile.status },
    { label: "Left Leg CV", value: String(profile.total_left_leg_cv) },
    { label: "Right Leg CV", value: String(profile.total_right_leg_cv) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 w-full mt-8">
      {fields.map((field) => (
        <div key={field.label} className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            {field.label}
          </label>
          <input
            type="text"
            readOnly
            defaultValue={field.value}
            className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
}

function ProfileRouteComponent() {
  const { data, isLoading, error } = useUserData();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#295175] animate-spin" />
          <p className="text-slate-500 font-medium">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 flex flex-col items-center gap-4 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-bold text-slate-800">Connection Error</h2>
          <p className="text-slate-500">
            We couldn't load your profile information. Please check your
            connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-50 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userData = data["user data"];
  const profile = data.profile;

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#f8fafc] w-full max-w-[1500px] mx-auto ">
      <div className="bg-white rounded-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-10 min-h-[85vh] flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-12 pb-12 w-full">
          <ProfileImageUpload image={userData.image} />
          <EditableProfileForm userData={userData} />
        </div>

        {/* Separator */}
        <hr className="border-t border-slate-100 -mx-10 w-[calc(100%+80px)]" />

        {/* Bottom Section */}
        <div className="pt-8">
          <h2 className="text-slate-800 font-bold text-lg mb-6">
            Network Information
          </h2>
          <ReadonlyNetworkInfo profile={profile} />
        </div>
      </div>
    </div>
  );
}
