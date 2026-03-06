import { createLazyFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Week 1", value: 65 },
  { name: "Week 3", value: 38 },
  { name: "Week 5", value: 18 },
  { name: "Week 7", value: 25 },
  { name: "Week 9", value: 32 },
  { name: "Week 11", value: 25 },
  { name: "Week 13", value: 20 },
  { name: "Week 15", value: 30 },
  { name: "Week 17", value: 42 },
  { name: "Week 19", value: 28 },
  { name: "Week 21", value: 12 },
  { name: "Week 23", value: 28 },
  { name: "Week 25", value: 58 },
  { name: "Week 27", value: 38 },
  { name: "Week 29", value: 15 },
  { name: "Week 31", value: 35 },
  { name: "Week 33", value: 58 },
  { name: "Week 35", value: 55 },
  { name: "Week 37", value: 52 },
  { name: "Week 39", value: 65 },
  { name: "Week 41", value: 92 },
  { name: "Week 43", value: 72 },
  { name: "Week 45", value: 42 },
  { name: "Week 47", value: 55 },
];

const monthlyData = [
  { name: "January", value: 65 },
  { name: "February", value: 12 },
  { name: "March", value: 26 },
  { name: "April", value: 15 },
  { name: "May", value: 35 },
  { name: "June", value: 5 },
  { name: "July", value: 52 },
  { name: "August", value: 10 },
  { name: "September", value: 52 },
  { name: "October", value: 46 },
  { name: "November", value: 88 },
  { name: "December", value: 36 },
];

export const Route = createLazyFileRoute("/_auth/wallet")({
  component: WalletRouteComponent,
});

function TopStatCard({
  title,
  value,
  accentClass,
}: {
  title: string;
  value: string;
  accentClass: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 py-8 shadow-sm border border-slate-50 flex flex-col justify-center relative overflow-hidden h-32">
      {/* Accent Line */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1 rounded-r-md ${accentClass}`}
      />
      <div className="pl-3 space-y-1.5">
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-slate-800 text-[26px] font-semibold tracking-wide">
          {value}
        </p>
      </div>
    </div>
  );
}

function EarningsHero() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-50 flex flex-col md:flex-row overflow-hidden">
      {/* Left Dark Card */}
      <div className="md:w-[40%] bg-linear-to-br from-[#1b193f] to-[#0f0e24] p-8 flex flex-col relative overflow-hidden min-h-[300px]">
        {/* Background Network Pattern Placeholder */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-600/20 blur-3xl rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-indigo-600/30 blur-2xl rounded-full" />
          {/* Abstract lines to represent network */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="80%"
              y1="100%"
              x2="50%"
              y2="50%"
              stroke="rgba(236, 72, 153, 0.3)"
              strokeWidth="1"
            />
            <line
              x1="50%"
              y1="50%"
              x2="100%"
              y2="40%"
              stroke="rgba(236, 72, 153, 0.3)"
              strokeWidth="1"
            />
            <line
              x1="50%"
              y1="50%"
              x2="40%"
              y2="100%"
              stroke="rgba(236, 72, 153, 0.3)"
              strokeWidth="1"
            />
            <circle cx="50%" cy="50%" r="3" fill="#ec4899" />
            <circle cx="80%" cy="100%" r="2" fill="#ec4899" />
          </svg>
        </div>

        <div className="flex justify-between items-start relative z-10 w-full text-white">
          <h3 className="font-semibold text-base">Total Earnings</h3>
          <button className="flex items-center gap-1 text-xs border border-white/20 rounded-md px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors">
            Overall <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center relative z-10">
          <p className="text-white text-5xl font-semibold tracking-wider">
            $0.00
          </p>
        </div>
      </div>

      {/* Right List Items */}
      <div className="md:w-[60%] p-8 flex flex-col justify-center gap-6">
        {/* Item 1 */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-blue-500 rounded-full" />
            </div>
            <div>
              <p className="text-slate-800 font-semibold text-sm">
                Personal Purchases
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                Purchases and Upgrades.
              </p>
            </div>
          </div>
          <p className="text-blue-500 font-semibold text-sm">$0.00</p>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-slate-800 font-semibold text-sm">
                Total Payout
              </p>
              <p className="text-slate-400 text-xs mt-0.5">Payout Processed</p>
            </div>
          </div>
          <p className="text-red-500 font-semibold text-sm">$0.00</p>
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <p className="text-slate-800 font-semibold text-sm">
                Profit Gained
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                Amount earned vs Amount spent
              </p>
            </div>
          </div>
          <p className="text-emerald-500 font-semibold text-sm">0%</p>
        </div>
      </div>
    </div>
  );
}

function WeeklyEarningsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-50 p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-sm text-slate-800 border-b-2 border-slate-800 pb-1 inline-block">
          Earning Per Week for the Year
        </h3>
      </div>
      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weeklyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#81a1c1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#81a1c1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              angle={-60}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 20, 40, 60, 80, 100]}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="#6b8fae"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: "#6b8fae",
                strokeWidth: 2,
              }}
              dot={{ r: 3, fill: "#fff", stroke: "#6b8fae", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MonthlyBounceChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-50 p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-sm text-slate-800 border-b-2 border-slate-800 pb-1 inline-block">
          Total Bounce Earning
        </h3>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-800">2024</span>
            <div className="w-3 h-3 rounded-full border border-red-200 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-800">2025</span>
            <div className="w-3 h-3 rounded-full border border-blue-200 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[250px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBounce" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#81a1c1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#81a1c1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
              angle={-60}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              ticks={[0, 20, 40, 60, 80, 100]}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6b8fae"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBounce)"
              activeDot={{
                r: 6,
                fill: "#fff",
                stroke: "#6b8fae",
                strokeWidth: 2,
              }}
              dot={{ r: 4, fill: "#fff", stroke: "#6b8fae", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function WalletBalances() {
  return (
    <div className="flex flex-col gap-4">
      {/* Commission Wallet */}
      <div className="bg-[#10b981] rounded-xl p-6 text-white flex justify-between items-center shadow-sm">
        <div className="space-y-2">
          <p className="font-semibold text-sm">Commission Wallet Balance</p>
          <p className="font-bold text-2xl tracking-widest">********</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          </svg>
        </div>
      </div>

      {/* Token Wallet */}
      <div className="bg-[#295175] rounded-xl p-6 text-white flex justify-between items-center shadow-sm">
        <div className="space-y-2">
          <p className="font-semibold text-sm">Token Wallet Balance</p>
          <p className="font-bold text-2xl tracking-wide">$21,.500.00</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TransferForm() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-50 p-6">
      <h3 className="font-semibold text-sm text-slate-800 mb-6">
        Transfer to Token Wallet
      </h3>
      <div className="space-y-4">
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
        <button className="w-full bg-[#1e3a5f] hover:bg-[#152e4d] text-white font-medium py-3 rounded-lg transition-colors shadow-sm text-sm">
          Send
        </button>
      </div>
    </div>
  );
}

function WithdrawForm() {
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

function TransactionsForm() {
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

function WalletRouteComponent() {
  return (
    <div className="min-h-[calc(100vh-100px)] p-6 bg-[#f8fafc] flex flex-col gap-6 w-full max-w-[1500px] mx-auto">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TopStatCard
          title="Total Earnings"
          value="$21,.500.00"
          accentClass="bg-[#8b5cf6]"
        />
        <TopStatCard
          title="Total Bounce"
          value="$21,.500.00"
          accentClass="bg-[#f43f5e]"
        />
        <TopStatCard
          title="Total Receive"
          value="$21,.500.00"
          accentClass="bg-[#10b981]"
        />
        <TopStatCard
          title="Total Transfer"
          value="$21,.500.00"
          accentClass="bg-[#3b82f6]"
        />
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Left Column (Earnings & Charts) */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-full min-w-0">
          <EarningsHero />
          <WeeklyEarningsChart />
          <MonthlyBounceChart />
        </div>

        {/* Right Column (Balances & Forms) */}
        <div className="w-full xl:w-[450px] shrink-0 flex flex-col gap-6">
          <WalletBalances />
          <TransferForm />
          <WithdrawForm />
          <TransactionsForm />
        </div>
      </div>
    </div>
  );
}
