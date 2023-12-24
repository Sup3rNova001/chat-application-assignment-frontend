import dummyuser from "../../assets/dummyuser.svg";
interface MessageProps {
  message: string;
  time: string;
  self?: boolean;
}
const Message = ({ message, time, self }: MessageProps) => {
  return (
    <div className={`flex h-[90px] ${self ? "flex-row-reverse" : "flex-row"}`}>
      <div className="flex flex-col items-center justify-end ">
        <div className="h-[40px] w-[40px] rounded-full object-cover">
          <img src={dummyuser} alt="" />
        </div>
      </div>

      <div className="">
        <div
          className={`${
            self
              ? "bg-gradient-to-b from-primary to-secondary text-white rounded-bl-[5px] "
              : "bg-[#E0E0E0] rounded-br-[5px]"
          } rounded-t-[5px]  px-4 py-2 text-[24px] `}
        >
          {message}
        </div>
        <div
          className={`text-[10px] text-[#808080]  ${
            self ? "float-left " : "float-right"
          }`}
        >
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
