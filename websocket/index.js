const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const PORT = 3010;
const app = express();
const server = createServer(app);
// The Server class extends the functionality of the provided HTTP server to handle WebSocket connections alongside regular HTTP requests.
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// This line listens for the 'connection' event emitted by clients when they establish a WebSocket connection to the server. When a client connects to the server, this event is triggered.
io.on("connection", (socket) => {
  console.log("Connection established");
  //  This line sets up an event listener on the socket object for the 'chat message' event. When the client sends a 'chat message' event to the server, this listener is triggered.
  socket.on("chat message", (msg) => {
    console.log("received message", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

server.listen(PORT, () => {
  console.log("server running at http://localhost:3010");
}); 
