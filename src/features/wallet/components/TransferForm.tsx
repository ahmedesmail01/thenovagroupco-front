export function TransferForm() {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-slate-100/60">
        <h3 className="font-bold text-[22px] text-[#4a5568] tracking-tight">
          Transfer to Token Wallet
        </h3>
      </div>

      {/* Form Body */}
      <div className="p-8 space-y-8">
        <div className="relative">
          {/* Floating Label Style */}
          <label className="absolute -top-2.5 left-4 px-2 bg-white text-[13px] font-semibold text-[#718096] z-10">
            Amount
          </label>
          <input
            type="text"
            placeholder="amount..."
            className="w-full border border-gray-700 rounded-[12px] text-black px-5 py-4 text-base placeholder:text-[#a0aec0] focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <button className="w-full bg-linear-to-r from-brand-navy via-brand-terquaz to-brand-navy  text-white font-semibold py-4 rounded-[12px] transition-all shadow-lg shadow-slate-900/10 text-lg">
          Send
        </button>
      </div>
    </div>
  );
}
