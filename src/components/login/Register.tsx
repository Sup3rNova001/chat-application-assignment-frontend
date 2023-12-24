import iemail from "./../../assets/login/email.svg";
import ilock from "./../../assets/login/lock.svg";
import { Nav } from "./nav";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const checkPasswordMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ firstName, lastName, email, password, confirmPassword });

    if (checkPasswordMatch(password, confirmPassword)) {
      console.log("Password match");
      const api = "https://chat-app-assignment-backend.onrender.com/api/register";
      axios
        .post(api, {
          name: {
            firstName,
            lastName,
          },
          email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/confirmation");
        })
        .catch((err) => {
          alert("User with this email already exists");
          console.error(err);
        });
    } else {
      console.log("Password does not match");
      alert("Password and confirm password does not match");
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-primary to-secondary p-4 min-h-screen">
      <div className="flex flex-col items-center gap-12 w-full ">
        <Nav />

        <div className="flex flex-col  gap-4 w-[700px]">
          <div className="flex w-full gap-2 ">
            <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg ">
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="bg-transparent placeholder-white  text-white outline-none w-full text-[36px] "
              />
            </div>
            <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg ">
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="bg-transparent placeholder-white  text-white outline-none w-full text-[36px] "
              />
            </div>
          </div>

          <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg w-full ">
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
          <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg w-full ">
            <img src={ilock} alt="lock" />

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="bg-transparent placeholder-white  text-white outline-none w-full text-[36px] "
            />
          </div>
          <div className="flex gap-8 border-[4px] border-white p-4 rounded-lg w-full ">
            <img src={ilock} alt="lock" />

            <input
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="bg-transparent placeholder-white  text-white outline-none w-full text-[36px] "
            />
          </div>
        </div>
        <button
          className="bg-white p-2 rounded-lg w-[200px] text-[32px] font-bold "
          onClick={handleSubmit}
        >
          <span className="bg-gradient-to-b from-primary to-secondary text-transparent bg-clip-text">
            SIGN UP
          </span>
        </button>
      </div>
    </div>
  );
};

export default Register;
