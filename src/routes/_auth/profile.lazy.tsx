import { createLazyFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";

export const Route = createLazyFileRoute("/_auth/profile")({
  component: ProfileRouteComponent,
});

function ProfileImageUpload() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#f8f9fa] rounded-lg p-6 mb-4 mt-2 w-full max-w-[280px] flex flex-col items-center justify-center relative overflow-hidden h-[300px]">
        {/* Placeholder for the image itself - using a colored div for now */}
        <div className="absolute inset-0 bg-[#e0bba8] flex items-center justify-center">
          {/* Simple stylized outline representation of the person from the mockup */}
          <div className="relative w-full h-full">
            {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#3a1d2e] rounded-t-[40%]" />
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-16 h-20 bg-[#e3ae97] rounded-full" />
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-16 h-10 bg-[#2a2a2a] rounded-t-full" /> */}
          </div>
        </div>

        {/* Upload Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-black/80 transition-colors z-10">
          <Upload className="w-4 h-4 text-white" />
          <span className="text-white text-[13px] font-medium">
            Upload Photo
          </span>
        </div>
      </div>
      <p className="text-slate-400 text-[11px] leading-relaxed max-w-[220px] text-center">
        Image size should be under 1MB and image ration needs to be 1:1
      </p>
    </div>
  );
}

function EditableProfileForm() {
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
            defaultValue="Mohammed"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] focus:ring-1 focus:ring-[#295175]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            Last Name
          </label>
          <input
            type="text"
            defaultValue="Hamed"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-[#295175] focus:ring-1 focus:ring-[#295175]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            User Name
          </label>
          <input
            type="text"
            placeholder="Sponsor Name"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-[14px] text-slate-400 placeholder:text-slate-300 focus:outline-none focus:border-[#295175] focus:ring-1 focus:ring-[#295175]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            Email
          </label>
          <input
            type="text"
            defaultValue="Ultimate"
            className="w-full border border-slate-200 rounded-md px-4 py-2.5 text-[14px] text-slate-400 placeholder:text-slate-300 focus:outline-none focus:border-[#295175] focus:ring-1 focus:ring-[#295175]"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
            Phone Number
          </label>
          <div className="flex border border-slate-200 rounded-md overflow-hidden focus-within:border-[#295175] focus-within:ring-1 focus-within:ring-[#295175]">
            <div className="bg-white border-r border-slate-200 px-4 py-2.5 flex items-center justify-center cursor-pointer hover:bg-slate-50 text-[14px] font-medium text-[#295175]">
              +20
              <svg
                className="w-4 h-4 ml-1 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <input
              type="text"
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

function ReadonlyNetworkInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-[1000px] mt-8">
      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          Sponsor Name
        </label>
        <input
          type="text"
          readOnly
          defaultValue="Ultimate"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          Sponsor ID
        </label>
        <input
          type="text"
          readOnly
          defaultValue="400000"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          Subscription
        </label>
        <input
          type="text"
          readOnly
          defaultValue="0"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          ID Code
        </label>
        <input
          type="text"
          readOnly
          defaultValue="0"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          CV
        </label>
        <input
          type="text"
          readOnly
          defaultValue="0"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          Status
        </label>
        <input
          type="text"
          readOnly
          defaultValue="0"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          Left Leg CV
        </label>
        <input
          type="text"
          readOnly
          defaultValue="0"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-slate-500 text-[11px] font-semibold tracking-wide">
          Right Leg CV
        </label>
        <input
          type="text"
          readOnly
          defaultValue="400000"
          className="w-full border border-slate-100 bg-[#fefefe]/50 rounded-md px-4 py-2.5 text-[14px] text-slate-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

function ProfileRouteComponent() {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#f8fafc] w-full max-w-[1500px] mx-auto ">
      <div className="bg-white rounded-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-10 min-h-[85vh] flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-12 pb-12 w-full">
          <ProfileImageUpload />
          <EditableProfileForm />
        </div>

        {/* Separator */}
        <hr className="border-t border-slate-100 -mx-10 w-[calc(100%+80px)]" />

        {/* Bottom Section */}
        <div className="pt-8">
          <ReadonlyNetworkInfo />
        </div>
      </div>
    </div>
  );
}
