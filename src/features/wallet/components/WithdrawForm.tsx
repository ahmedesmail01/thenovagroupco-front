export function WithdrawForm() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-50 p-6 flex flex-col gap-8">
      <div>
        <h3 className="font-semibold text-sm text-slate-800 mb-6">Network</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center group-hover:border-blue-500 transition-colors">
              <div className="w-2.5 h-2.5 rounded-full bg-[#295175]" />
            </div>
            <span className="text-sm text-slate-800 font-medium">Erc20</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center group-hover:border-slate-400 transition-colors"></div>
            <span className="text-sm text-slate-600 font-medium">Trc20</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-slate-800 mb-6">Withdraw</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Address ..."
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
              Amount
            </label>
            <input
              type="text"
              placeholder="Amount ..."
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <button className="w-full bg-[#1e3a5f] hover:bg-[#152e4d] text-white font-medium py-3 rounded-lg transition-colors shadow-sm text-sm mt-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
