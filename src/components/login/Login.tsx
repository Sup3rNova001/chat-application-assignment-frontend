import iemail from "./../../assets/login/email.svg";
import ilock from "./../../assets/login/lock.svg";
import { Nav } from "./nav";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      navigate("/");
    }
  }, [authenticated, navigate]);
  const handleSubmit = () => {
    // console.log({ email, password });

    const api = "http://localhost:3000/api/login";
    axios
      .post(api, { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        setAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full bg-gradient-to-b from-primary to-secondary p-4 min-h-screen">
      <div className="flex flex-col items-center gap-12 w-full ">
        <Nav />

        <div className="flex flex-col  gap-4">
          <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg w-[700px] ">
            <img src={iemail} alt="email" />

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
              className="bg-transparent placeholder-white  text-white outline-none w-full text-[36px] "
            />
          </div>
          <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg w-[700px] ">
            <img src={ilock} alt="lock" />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent placeholder-white  text-white outline-none w-full text-[36px] "
            />
          </div>
        </div>
        <button
          className="bg-white p-2 rounded-lg w-[200px] text-[32px] font-bold "
          onClick={handleSubmit}
        >
          <span className="bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text">
            LOGIN
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
