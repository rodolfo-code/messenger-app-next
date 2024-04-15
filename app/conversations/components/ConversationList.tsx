import { FullConversationType } from "@/app/types";
import { Conversation } from "@prisma/client";
import React from "react";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

export default function ConversationList({ initialItems }: ConversationListProps) {
  return (
    <div>
      <div>ConversationList</div>
    </div>
  );
}
