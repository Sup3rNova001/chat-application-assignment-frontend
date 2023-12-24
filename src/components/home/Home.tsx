import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Chat from "./Chat";
import isend from "./../../assets/home/send.svg";
import { io, Socket } from "socket.io-client";
import { ChatInterface } from "../../interfaces/home/chat";
import { MessageInterface } from "../../interfaces/home/Message";
import axios from "axios";

const Home = () => {
  
  const [chats, setChats] = useState<ChatInterface[]>([]);
  const [activeChat, setActiveChat] = useState(0);
  const [content, setContent] = useState("");
  const [messagesData, setMessagesData] = useState<MessageInterface[]>([]);
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io("https://chat-app-assignment-backend.onrender.com");
    setSocket(newSocket);

    return () => {
      // Disconnect Socket.IO when component unmounts
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const chatId = chats[activeChat]?._id;
    const api = `https://chat-app-assignment-backend.onrender.com/api/messages/get/${chatId}`;
    const userToken = localStorage.getItem("token");

    if (chatId && socket) {

      socket.on("message", (newMessage: MessageInterface) => {
        setMessagesData((prevMessages) => [...prevMessages, newMessage]);
      });

      axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMessagesData(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [activeChat, chats, socket]);

  useEffect(() => {
    const api = "https://chat-app-assignment-backend.onrender.com/api/chats";
    const userToken = localStorage.getItem("token");

    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setChats(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSend = () => {
    // console.log(content);
    const chatId = chats[activeChat]?._id;
    const userToken = localStorage.getItem("token");
    const api = "https://chat-app-assignment-backend.onrender.com/api/messages/send";

    if (chatId && socket) {
      // Emit a message event to the server
      socket.emit("sendMessage", {
        roomId: chatId,
        content: content,
      });

      
      setContent("");
    }
    axios
      .post(
        api,
        {
          roomId: chatId,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setContent("");
        setMessagesData([...messagesData, res.data]);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 ">
        <SideBar
          chats={chats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      </div>
      <div className="w-2/3 flex flex-col">
        <div className="h-[10%]">
          <Header users={chats[activeChat]?.participants || []} />
        </div>
        <div className="w-full h-[80%]">
          <Chat messagesData={messagesData} />
        </div>

        <div className="h-[10%]">
          <div
            className="flex items-center justify-between px-12 py-6  h-full w-full "
            style={{ boxShadow: "0px -10px 15px -3px rgba(0, 0, 0, 0.1)" }}
          >
            <input
              type="text"
              name="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message here"
              className="bg-transparent placeholder-[#A0A0A0]  text-[black] outline-none w-full text-[24px]"
            />

            <div
              className="cursor-pointer w-[50px] h-[50px] bg-gradient-to-b from-primary to-secondary flex items-center justify-center rounded-full "
              onClick={handleSend}
            >
              <img src={isend} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
