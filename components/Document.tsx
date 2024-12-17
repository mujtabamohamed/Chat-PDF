"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import byteSize from "byte-size";
import { formatDistanceToNow } from "date-fns";

import useSubscription from "@/hooks/useSubscription";
import { deleteDocument } from "@/actions/deleteDocument";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { TableCell } from "@/components/ui/table";

import { Download, Trash2Icon } from "lucide-react";
import { IconDots } from "@tabler/icons-react";
import { FaFilePdf } from "react-icons/fa";

function Document({
  id,
  name,
  size,
  downloadUrl,
  createdAt,
}: {
  id: string;
  name: string;
  size: number;
  downloadUrl: string;
  createdAt: string;
}) {
  const router = useRouter();
  const [isDeleting, startTransaction] = useTransition();
  const { hasActiveMembership } = useSubscription();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formattedDate = formatDateTime(createdAt);

  return (
    <>
      <TableCell
        className="flex gap-3 items-center"
        onClick={() => {
          router.push(
            `/dashboard/files/${id}?name=${encodeURIComponent(name)}`
          );
        }}
      >
        <iframe
          src={downloadUrl}
          width="33"
          height="45"
          style={{ border: "none" }}
          title={name}
        />

        <div>
          <p className="font-semibold text-[16px] text-[#353535]">{name}</p>
        </div>
      </TableCell>

      <TableCell className="text-[#505050] text-sm">
        {byteSize(size).value} KB
      </TableCell>

      <TableCell>
        <div>
          <div className="text-[#505050] text-sm">{formattedDate}</div>
        </div>
      </TableCell>

      <TableCell className="text-[#505050] text-right">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconDots
              size={28}
              color="#959595"
              className="hover:bg-[#eee] rounded-full p-1"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="hover:bg-[#f5f5f5]">
              <Button className="bg-transparent" variant="secondary" asChild>
                <a href={downloadUrl} download target="_blank">
                  <Download className="h-6 w-6" />
                  Download
                </a>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Button
                className="bg-transparent"
                variant="secondary"
                disabled={isDeleting || !hasActiveMembership}
                onClick={() => {
                  const prompt = window.confirm(
                    "Are you sure you want to delete this document?"
                  );

                  if (prompt) {
                    // delete document
                    startTransaction(async () => {
                      await deleteDocument(id);
                    });
                  }
                }}
              >
                <Trash2Icon className="h-4 w-4 text-red-500" />
                <span className="text-red-500 ml-2">Delete</span>
                {!hasActiveMembership && (
                  <span className="text-red-500 ml-2">PRO Feature</span>
                )}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </>
  );
}
export default Document;
