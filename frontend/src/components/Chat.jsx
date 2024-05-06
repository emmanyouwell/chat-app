import React, { useState, useEffect, useRef } from "react";
import socket from "../socket";
const Chat = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("new user", (users) => {
      setUsers(users);
    });
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Users</h1>
        <ul>
          {users &&
            users.map((user, i) => (
              <li key={i} className="list-disc">
                {user.user}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Chat;
