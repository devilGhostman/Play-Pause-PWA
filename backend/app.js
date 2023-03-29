const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const movieRoutes = require("./routes/movie-routes");
const userRoutes = require("./routes/user-routes");
const musicRoutes = require("./routes/music-routes");
const memeRoutes = require("./routes/meme-route");

const app = express();
const server = http.createServer(app);
dotenv.config();

app.use("/songs", express.static("songs"));
app.use("/movies", express.static("movies"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  },
});

app.use("/api/watch", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/meme", memeRoutes);

const users = [{}];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined `);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]} `,
    });
  });

  socket.on("message", ({ message, id, room }) => {
    if (room !== "") {
      io.to(room).emit("sendMessage", { user: users[id], message, id, room });
    } else {
      io.emit("sendMessage", { user: users[id], message, id, room });
    }
    // io.emit('sendMessage',{user:users[id],message,id,room});
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("left", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
    console.log(`user left`);
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    server.listen(process.env.PORT_NO || 5000, () => {
      console.log("SERVER IS RUNNING");
    });
  })
  .catch((err) => {
    console.log(err);
  });
