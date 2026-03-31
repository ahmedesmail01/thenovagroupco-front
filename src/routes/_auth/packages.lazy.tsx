import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePackages, type Package } from "../../features/wallet/usePackages";
import api from "../../lib/api";
import { toast } from "react-hot-toast";

// Extracted Components
import { MembershipDetailedCard } from "../../features/membership/components/MembershipDetailedCard";
import { PaymentChoiceModal } from "../../features/membership/components/PaymentChoiceModal";

export const Route = createLazyFileRoute("/_auth/packages")({
  component: PackagesRouteComponent,
});

function PackagesRouteComponent() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { data: packages, isLoading } = usePackages();

  const handleSubscribe = async (payBy: "token" | "stripe") => {
    if (!selectedPackage) return;

    setIsSubscribing(true);
    const loadingToast = toast.loading("Processing subscription...");

    try {
      await api.post("/subscribe", {
        package_id: selectedPackage.id,
        pay_by: payBy,
      });
      toast.success("Subscribed successfully!", { id: loadingToast });
      setShowPaymentModal(false);
      setSelectedPackage(null);
    } catch (error: unknown) {
      let errorMessage = "Failed to subscribe. Please try again.";
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response: { data?: { message?: string } } };
        errorMessage = err.response.data?.message || errorMessage;
      }
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSubscribeClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowPaymentModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="text-slate-400 font-medium animate-pulse">
          Loading packages...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#f8fafc] w-full max-w-[1700px] mx-auto flex flex-col pt-12">
      {/* <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 capitalize">
          Available Memberships
        </h1>
        <p className="text-slate-500 font-medium">
          Choose the package that fits your goals.
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-4 mb-20">
        {packages?.map((pkg) => (
          <MembershipDetailedCard
            key={pkg.id}
            pkg={pkg}
            onSubscribe={() => handleSubscribeClick(pkg)}
          />
        ))}

        {(!packages || packages.length === 0) && (
          <div className="col-span-full py-20 text-center text-slate-400 font-medium">
            No packages found.
          </div>
        )}
      </div>

      <PaymentChoiceModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentChoice={handleSubscribe}
        isSubscribing={isSubscribing}
      />
    </div>
  );
}
