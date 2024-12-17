import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

function Header() {
  return (
    <div className="flex justify-between bg-[#fcfcfc] p-2 border-b border-[#ddd]">
      <Link href="/dashboard" className="text-2xl text-black ml-10">
        Chat <span className="text-[#0062cc] font-medium">PDF</span>
      </Link>

      <SignedIn>
        <div className="flex items-center space-x-2 mr-4">

          <Button asChild variant="link" className="py-0 px-2 text-[#2a2a2a]">
            <Link href="/dashboard">My Documents</Link>
          </Button>

          <Button asChild variant="link" className="hidden md:flex text-[#2a2a2a]">
            <Link href="/dashboard/upgrade">Pricing</Link>
          </Button>

          {/* <Button asChild variant="outline" className="border-indigo-600">
            <Link href="/dashboard/upload">
              <FilePlus2 className="text-indigo-600" />
            </Link>
          </Button> */}

          <UpgradeButton />
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
export default Header;