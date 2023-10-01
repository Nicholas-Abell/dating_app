"use client";
import { createConversation } from "@/libs/actions/message.actions";
import React from "react";

type MessageProps = {
  userId: string;
  recieverId: string;
};

const Message: React.FC<MessageProps> = ({ userId, recieverId }) => {
  const onSubmit = async () => {
    await createConversation(userId, recieverId);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[380px]">
      <input
        name="message"
        type="text"
        className="text-black p-4 placeholder:text-black w-full rounded-full"
        placeholder="...say something"
      />
    </form>
  );
};
export default Message;
