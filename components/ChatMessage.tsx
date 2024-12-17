"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { BotIcon, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown";
import { Message } from "./Chat";

function ChatMessage({ message }: { message: Message }) {
  const isHuman = message.role === "human";
  const { user } = useUser();

  return (
    <div className={`chat ${isHuman ? "chat-end pl-10" : "chat-start"} mb-4`}>
      <div className="chat-image avatar mr-2">
        <div className="w-10 rounded-full">
          {isHuman ? (
            null
            // user?.imageUrl && (
            //   <Image
            //     src={user?.imageUrl}
            //     alt="Profile Picture"
            //     width={40}
            //     height={40}
            //     className="rounded-full"
            //   />
            // )
          ) : (
            <div className="h-10 w-10 bg-[#0062cc] flex items-center justify-center">
              <BotIcon className="text-white h-7 w-7" />
            </div>
          )}
        </div>
      </div>

      <div
        className={`${isHuman ? "chat-bubble prose bg-[#0062cc] text-white" : "text-[#252525] pr-20"}`}>
        {message.message === "Thinking..." ? (
          <div className="flex items-center justify-center">
            <Loader2Icon className="animate-spin h-5 w-5 text-white" />
          </div>
        ) : (
          <Markdown>{message.message}</Markdown>
        )}
      </div>
    </div>
  );
}
export default ChatMessage;