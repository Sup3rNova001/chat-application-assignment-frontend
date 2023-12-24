
import iphone from "./../../assets/home/phone.svg";
import ivideo from "./../../assets/home/video.svg";
import { User } from "../../interfaces/home/User";
const Header = ({ users }: { users: User[] }) => {
  return (
    <div className="flex  w-full items-center justify-between h-full px-12 shadow-lg">
      <div className="flex items-center gap-4">
        <h1 className="text-[40px] font-semibold">
          { users[0]?._id == localStorage.getItem("userId") ? users[1]?.name?.firstName + " " + users[1]?.name?.lastName : users[0]?.name?.firstName + " " + users[0]?.name?.lastName }
        </h1>

        <span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="7.5" r="7.5" fill="#1ED300" />
          </svg>
        </span>
      </div>
      <div className="flex items-center gap-[42px]">
        <div className="w-[42px] h-[42px] bg-gradient-to-b from-primary to-secondary flex items-center justify-center rounded-full ">
          <img src={iphone} alt="" />
        </div>
        <div className="w-[42px] h-[42px] bg-gradient-to-b from-primary to-secondary flex items-center justify-center rounded-full ">
          <img src={ivideo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
