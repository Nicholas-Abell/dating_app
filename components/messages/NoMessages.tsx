import React from "react";

type NoMessagesProps = {};

const NoMessages: React.FC<NoMessagesProps> = () => {
  return (
    <div className="text-center p-4 text-gray-200 h-full w-full flex justify-center items-center overflow-hidden">
      No messages
    </div>
  );
};
export default NoMessages;
