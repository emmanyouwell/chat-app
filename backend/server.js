const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const io = socket;
const dotenv = require("dotenv");
dotenv.config();

let users = [];
let messages = {
  general: [],
  random: [],
  jokes: [],
  coding: [],
};
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("join server", (user) => {
    const newUser = {
      user: user,
      id: socket.id,
    };
    users.push(newUser);
    // console.log(newUser);
    io.emit("new user", users);
  });
  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });
  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    if (isChannel) {
      const payload = {
        content,
        chatName,
        sender,
      };
      socket.to(to).emit("new message", payload);
    } else {
      const payload = {
        content,
        chatName: sender,
        sender,
      };
      socket.to(to).emit("new message", payload);
    }
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content,
      });
    }
  });
  socket.on("disconnect", () => {
    users = users.filter((u) => u.id !== socket.id);
    io.emit("new user", users);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
