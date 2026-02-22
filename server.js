const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  globalThis.io = io;

  io.on("connection", (socket) => {
    socket.emit("connected", { status: "ok" });
  });

  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen(port, () => {
    console.log(`> FOODO ready on http://localhost:${port}`);
  });
});
