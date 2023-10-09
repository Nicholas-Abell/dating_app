"use client";
import {
  createConversation,
  sendMessage,
} from "@/libs/actions/message.actions";
import React, { useState } from "react";

type MessageProps = {
  userId: string;
  username: string;
  recieverId: string;
  recieverName: string;
};

const Message: React.FC<MessageProps> = ({
  userId,
  recieverId,
  username,
  recieverName,
}) => {
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(true);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await sendMessage({
      recieverId,
      userId,
      username,
      recieverName,
      messageText,
    });
    setMessageSent(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[380px] opacity-40 hover:opacity-100 ease-in-out duration-200"
    >
      {messageSent ? (
        <input
          onChange={(e) => {
            setMessageText(e.target.value);
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
