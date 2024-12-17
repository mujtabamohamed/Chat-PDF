"use client";

import useSubscription from "@/hooks/useSubscription";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2Icon, StarIcon } from "lucide-react";
import { createStripePortal } from "@/actions/createStripePortal";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

function UpgradeButton() {
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAccount = () => {
    startTransition(async () => {
      const stripePortalUrl = await createStripePortal();
      router.push(stripePortalUrl);
    });
  };

  if (!hasActiveMembership && !loading)
    return (
      <Button asChild variant="default" className="bg-[#0062cc] hover:bg-[#0063cd]">
        <Link href="/dashboard/upgrade">
          Upgrade <StarIcon className="fill-[#0062cc] text-white" />
        </Link>
      </Button>
    );

  if (loading)
    return (
      <Button variant="default" className="bg-[#0062cc] hover:bg-[#0063cd]">
        <Loader2Icon className="animate-spin" />
      </Button>
    );

  return (
    <Button
      onClick={handleAccount}
      disabled={isPending}
      variant="default"
      className="border-indigo-600 bg-[#0062cc] hover:bg-[#0063cd] text-sm mr-10"
    >
      {isPending ? (
        <Loader2Icon className="animate-spin h-4 w-4" />
      ) : (
        <p className="flex items-center">
          <span className="font-extrabold text-md">PRO </span> 
          <span className="ml-1 text-md">Account</span>
        </p>
      )}
    </Button>

  );
}
export default UpgradeButton;