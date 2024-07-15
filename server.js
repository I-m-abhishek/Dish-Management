const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, customServer: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer);

  // Middleware to attach Socket.IO to req
  server.use((req, res, next) => {
    req.io = io;
    next();
  });

  io.on('connection', (socket) => {
    socket.on('updateDish', (updatedDish) => {
      io.emit('dishUpdated', updatedDish);
    });

    socket.on('addDish', (addedDish) => {
      io.emit('dishAdded', addedDish);
    });
  });

  server.all('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
