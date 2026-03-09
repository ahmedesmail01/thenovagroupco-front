export function TransactionsForm() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-50 p-6">
      <h3 className="font-semibold text-sm text-slate-800 mb-6">
        Transactions
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
            Receiver Member ID
          </label>
          <input
            type="text"
            placeholder="Receiver Member ID"
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
  );
}
