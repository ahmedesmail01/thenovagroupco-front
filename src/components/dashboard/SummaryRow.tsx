// import React from "react";
import SummaryCard from "./SummaryCard";
// import { Trophy, Wallet, Zap } from "lucide-react";

const SummaryRow = () => {
  const dollarIcon = "/icons/dollar.png";
  const trophyIcon = "/icons/free-pack.png";
  const zapIcon = "/icons/nova-rise-pack.png";
  const walletIcon = "/icons/bronze-pack.png";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        iconSrc={dollarIcon}
        title="$0.00"
        label="Total Network volume"
        showAll
      />
      <SummaryCard
        iconSrc={trophyIcon}
        title="Free Package"
        label="Current Package"
      />
      <SummaryCard iconSrc={zapIcon} title="Nova Rise" label="Next Package" />
      <SummaryCard iconSrc={walletIcon} title="Bronze" label="Current Rank" />
    </div>
  );
};

export default SummaryRow;
