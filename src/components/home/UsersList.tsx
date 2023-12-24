import { useState, useEffect } from "react";
import dummyuser from "./../../assets/dummyuser.svg";
import axios from "axios";
import { User } from "../../interfaces/home/User";
const UsersList = ({
  setShowUsers,
}: {
  setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const api = "http://localhost:3000/api/users/getAll";
    axios
      .get(api)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = (userId: string) => {
    const api = "http://localhost:3000/api/chats/create";
    const userToken = localStorage.getItem("token");
    axios
      .post(
        api,
        { participants: [userId] },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setShowUsers(false);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className=" bg-[rgba(217,217,217,.30)] flex flex-col gap-4 w-full max-h-[50vh] overflow-auto hidden-scrollbar rounded ">
      {users?.length > 0 &&
        users.map((user: User, index) => (
          <div
            key={index}
            onClick={() => handleClick(user._id)}
            className={`flex items-center gap-4 px-12 py-4 `}
          >
            <div className=" rounded-full border border-white">
              <img src={dummyuser} alt="" />
            </div>

            <div className="flex flex-col w-full cursor-pointer">
              <div className="text-white text-[24px] font-semibold">
                {user?.name?.firstName + " " + user?.name?.lastName}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
