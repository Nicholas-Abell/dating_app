"use client";
import { sendMessage } from "@/libs/actions/message.actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type MessageProps = {
  userId: string;
  recieverId: string;
};

const Message: React.FC<MessageProps> = ({ userId, recieverId }) => {
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(true);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await sendMessage(userId, recieverId, message);
    setMessageSent(false);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[380px]">
      {messageSent ? (
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          name="message"
          type="text"
          className="text-black p-4 placeholder:text-black w-full rounded-full"
          placeholder="...say something"
        />
      ) : (
        <div className="text-black p-4 w-full rounded-full bg-green-500 text-center">
          Message Sent
        </div>
      )}
    </form>
  );
};
export default Message;
