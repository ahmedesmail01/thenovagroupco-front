import { createLazyFileRoute } from "@tanstack/react-router";
import { TopStatCard } from "../../features/wallet/components/TopStatCard";
import { EarningsHero } from "../../features/wallet/components/EarningsHero";
import { WeeklyEarningsChart } from "../../features/wallet/components/WeeklyEarningsChart";
import { MonthlyBounceChart } from "../../features/wallet/components/MonthlyBounceChart";
import { WalletBalances } from "../../features/wallet/components/WalletBalances";
import { TransferForm } from "../../features/wallet/components/TransferForm";
import { WithdrawForm } from "../../features/wallet/components/WithdrawForm";
import { TransactionsForm } from "../../features/wallet/components/TransactionsForm";

export const Route = createLazyFileRoute("/_auth/wallet")({
  component: WalletRouteComponent,
});

function WalletRouteComponent() {
  return (
    <div className="min-h-[calc(100vh-100px)]  bg-[#f8fafc] flex flex-col gap-6 w-full max-w-[1500px] mx-auto">
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
