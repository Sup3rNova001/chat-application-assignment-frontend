import iusers from "./../../assets/home/users.svg";
import isearch from "./../../assets/home/search.svg";
import dummyuser from "./../../assets/dummyuser.svg";
import { ChatInterface } from "../../interfaces/home/chat";
import UsersList from "./UsersList";

import { useState } from "react";

interface SideBarProps {
  chats: ChatInterface[];
  activeChat: number;
  setActiveChat: React.Dispatch<React.SetStateAction<number>>;
}
const SideBar = ({ chats, activeChat, setActiveChat }: SideBarProps) => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="bg-gradient-to-b from-primary to-secondary w-full h-full">
      <div className="w-full h-full  py-6 flex flex-col gap-4">
        <div className="flex items-center justify-between mx-12">
          <h1 className="text-[42px] text-white font-semibold">Chat</h1>
          <div
            className="cursor-pointer"
            onClick={() => setShowUsers(!showUsers)}
          >
            <img src={iusers} alt="" />
          </div>
        </div>

        {showUsers && (
          <div className=" px-12">
            <UsersList setShowUsers={setShowUsers} />
          </div>
        )}

        {!showUsers && (
          <div className="flex items-center gap-4 p-4 rounded-lg bg-[rgba(217,217,217,0.30)] mx-12">
            <div>
              <img src={isearch} alt="" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search Here"
              className="bg-transparent placeholder-white  text-white outline-none w-full text-[28px] "
            />
          </div>
        )}

        {!showUsers && (
          <div className="flex flex-col ">
            {chats?.length > 0 &&
              chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 px-12 py-4 ${
                    index == activeChat ? " bg-[rgba(217,217,217,0.30)]" : ""
                  }`}
                  onClick={() => setActiveChat(index)}
                >
                  <div className=" rounded-full border border-white">
                    <img src={dummyuser} alt="" />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="text-white text-[24px] font-semibold">
                      {chat?.participants[0]?._id ==
                      localStorage.getItem("userId")
                        ? chat?.participants[1]?.name?.firstName +
                          " " +
                          chat?.participants[1]?.name?.lastName
                        : chat?.participants[0]?.name?.firstName +
                          " " +
                          chat?.participants[0]?.name?.lastName}
                    </div>
                    <div className="text-white text-[16px] ">
                      {chat?.latestMessage?.content}
                    </div>
                  </div>
                  <div className=" border rounded-full w-[25px] h-[25px] flex items-center justify-center shrink-0">
                    <span className="text-white text-center text-[16px]">
                      1
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
