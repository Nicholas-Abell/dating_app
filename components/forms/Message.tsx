"use client";
import { sendMessage } from "@/libs/actions/message.actions";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageValidation } from "@/libs/validations/Message";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";

type MessageProps = {
  userId: string;
  username: string;
  image: string;
  recieverId: string;
  recieverName: string;
  recieverImage: string;
  conversationId?: string;
};

const Message: React.FC<MessageProps> = ({
  userId,
  recieverId,
  image,
  username,
  recieverName,
  recieverImage,
  conversationId,
}) => {
  const router = useRouter();
  const [messageSent, setMessageSent] = useState(true);

  const form = useForm({
    resolver: zodResolver(MessageValidation),
    defaultValues: { content: "" },
  });

  const onSubmit = async (values: z.infer<typeof MessageValidation>) => {
    await sendMessage({
      recieverId,
      userId,
      username,
      image,
      recieverName,
      recieverImage,
      content: values.content,
      conversationId,
    });
    if (!conversationId) {
      setMessageSent(false);
    } else {
      form.reset();
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="fixed bottom-10 w-full max-w-[380px] opacity-40 hover:opacity-100 ease-in-out duration-200"
    >
      {messageSent ? (
        <input
          {...form.register("content")}
          name="content"
          type="text"
          className="text-black bg-teal-400 p-4 placeholder:text-black w-full rounded-full"
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
