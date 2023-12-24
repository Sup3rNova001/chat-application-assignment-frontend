import { useEffect, useRef } from "react";
import Message from "./Message";
import { MessageInterface } from "../../interfaces/home/Message";

const Chat = ({ messagesData }: { messagesData: MessageInterface[] }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messagesData]);
  return (
    <div
      className="px-8 flex flex-col gap-8 max-h-[77vh]  overflow-auto hidden-scrollbar"
      ref={chatContainerRef}
    >
      {messagesData?.length > 0 &&
        messagesData.map((message, index) => (
          <Message
            key={index}
            message={message?.content}
            time={message?.timestamp.toString().split("T")[1].split(".")[0]}
            self={message?.sender === localStorage.getItem("userId")}
          />
        ))}
    </div>
  );
};

export default Chat;
