import { useNavigate } from "react-router-dom";
import user from "./../../assets/login/user.svg";
export const Nav = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <div className="flex flex-col items-center gap-4 ">
      <span className="flex items-center justify-center gap-2 font-bold text-[48px]">
        <button
          className={path == "/register" ? "text-white" : "text-black"}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
        <div> / </div>
        <button
          className={path == "/login" ? "text-white" : "text-black"}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </span>
      <div>
        <img src={user} alt="user" className="w-[200px] h-[200px]" />
      </div>
    </div>
  );
};
