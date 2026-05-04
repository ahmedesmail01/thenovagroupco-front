import { type Transaction } from "../useWalletTransactions";
import { formatPrice } from "../../../lib/utils";
import { CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface TransactionsHistoryTableProps {
  data: Transaction[];
  isLoading: boolean;
}

const getStatusStyles = (status: string) => {
  const s = status?.toLowerCase();
  if (s === "accepted" || s === "success" || s === "sent" || s === "completed" || s === "received") {
    return {
      container: "bg-emerald-50 text-emerald-600 border-emerald-100",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    };
  }
  if (s === "pending") {
    return {
      container: "bg-amber-50 text-amber-600 border-amber-100",
      icon: <Clock className="w-3.5 h-3.5" />,
    };
  }
  if (s === "rejected" || s === "failed" || s === "cancelled") {
    return {
      container: "bg-rose-50 text-rose-600 border-rose-100",
      icon: <XCircle className="w-3.5 h-3.5" />,
    };
  }
  return {
    container: "bg-slate-50 text-slate-600 border-slate-100",
    icon: <Clock className="w-3.5 h-3.5" />,
  };
};

const getTypeStyles = (type: string) => {
  const t = type?.toLowerCase();
  if (t === "withdrawal") {
    return {
      container: "bg-rose-50 text-rose-600 border-rose-100",
      icon: <ArrowUpRight className="w-3.5 h-3.5" />,
    };
  }
  if (t === "receive" || t === "deposit" || t === "sent") {
    return {
      container: "bg-emerald-50 text-emerald-600 border-emerald-100",
      icon: <ArrowDownLeft className="w-3.5 h-3.5" />,
    };
  }
  return {
    container: "bg-slate-50 text-slate-600 border-slate-100",
    icon: <ArrowUpRight className="w-3.5 h-3.5" />,
  };
};

export function TransactionsHistoryTable({
  data,
  isLoading,
}: TransactionsHistoryTableProps) {
  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="text-slate-400 font-medium animate-pulse">
          Loading transactions...
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="text-slate-400 font-medium">No transactions found.</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[14%]">
              From User
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[10%]">
              From ID
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[14%]">
              To User
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[10%]">
              To ID
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[12%]">
              Type
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[12%]">
              Amount
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[12%]">
              Status
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[16%]">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((tx) => (
            <tr
              key={tx.id}
              className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-6 px-4 text-slate-800 font-medium text-[15px]">
                {tx.sender?.username || "N/A"}
              </td>
              <td className="py-6 px-4 text-slate-700 font-medium text-[15px]">
                {tx.sender?.id_code || "N/A"}
              </td>
              <td className="py-6 px-4 text-slate-800 font-medium text-[15px]">
                {tx.receiver?.username || "N/A"}
              </td>
              <td className="py-6 px-4 text-slate-700 font-medium text-[15px]">
                {tx.receiver?.id_code || "N/A"}
              </td>
              <td className="py-6 px-4">
                {(() => {
                  const styles = getTypeStyles(tx.transaction_type);
                  return (
                    <span
                      className={`px-3 py-1 text-nowrap rounded-full text-xs font-semibold capitalize border flex items-center gap-1.5 w-fit ${styles.container}`}
                    >
                      {styles.icon}
                      {tx.transaction_type?.replace("_", " ")}
                    </span>
                  );
                })()}
              </td>
              <td className="py-6 px-4 text-[#10b981] font-medium text-[15px]">
                {formatPrice(Number(tx.amount))}
              </td>
              <td className="py-6 px-4">
                {(() => {
                  const styles = getStatusStyles(tx.status);
                  return (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border flex items-center gap-1.5 w-fit ${styles.container}`}
                    >
                      {styles.icon}
                      {tx.status}
                    </span>
                  );
                })()}
              </td>
              <td className="py-6 px-4 text-slate-700 font-medium text-sm">
                {new Date(tx.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
