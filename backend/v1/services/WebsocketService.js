const WebSocket = require("ws").WebSocket;
const User = require("../../v1/classes/User");

const wss = new WebSocket.Server({
  noServer: true,
  path: "/websockets",
});

const clients = {};

wss.on("connection", function connection(socket, userid) {
  console.log("WebSocket connected!");

  if (!clients[userid]) {
    clients[userid] = {};
  }
  if (clients[userid].sockets) {
    clients[userid].sockets.push(socket);
  } else {
    clients[userid].sockets = [socket];
  }

  socket.on("message", function message(message) {});

  socket.on("close", function close() {
    console.log("WebSocket connection closed!");
    const socketIndex = clients[userid].sockets.findIndex((s) => s === socket);
    clients[userid].sockets.splice(socketIndex, 1);
  });
});

const websocketService = {};

websocketService.addConnectionListener = (expressServer) => {
  expressServer.on("upgrade", (request, socket, head) => {
    websocketService.checkAuth(request, (userid) => {
      if (!userid) {
        console.log("Unauthorized WebSocket connection. Destroying socket...");
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
      } else {
        wss.handleUpgrade(request, socket, head, (websocket) => {
          wss.emit("connection", websocket, userid);
        });
      }
    });
  });
};

websocketService.checkAuth = async (req, callback) => {
  const userId = req.url.split("?userid=")[1];

  if (userId && userId !== 0) {
    try {
      const user = await new User().read(userId);
      callback(user.id);
      return;
    } catch (error) {
      console.log({ error }, "Failed to check socket authentication.");
    }
  }
  callback();
};

websocketService.send = (recipientId, messageType, messageContent) => {
  recipientId.forEach((id) => {
    const client = clients[id];

    if (client?.sockets) {
      const data = { type: messageType, content: messageContent };
      client.sockets.forEach((socket) => {
        socket.send(JSON.stringify(data));
      });
    }
  });
};

module.exports = websocketService;
