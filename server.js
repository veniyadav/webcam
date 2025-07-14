const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve public directory
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('📡 Client connected');

  socket.on('video', (data) => {
    socket.broadcast.emit('video', data);
  });

  socket.on('audio', (data) => {
    socket.broadcast.emit('audio', data);
  });
});

http.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
