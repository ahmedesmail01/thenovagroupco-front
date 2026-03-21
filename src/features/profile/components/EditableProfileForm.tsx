import { type UserData } from "../../auth/useUserData";

interface EditableProfileFormProps {
  userData: UserData;
}

export function EditableProfileForm({ userData }: EditableProfileFormProps) {
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
