import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import iconfirmation from "./../../assets/login/confirmation.svg";
const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  });
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-b from-primary to-secondary">
      <div className="flex flex-col items-center justify-center bg-white py-8 rounded-xl w-1/2">
        <img src={iconfirmation} alt="" />

        <p className="font-medium text-[32px]">
          Your Registration has been Successful
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
