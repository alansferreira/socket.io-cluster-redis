const {port} = require('minimist')(process.argv.slice(2));


const io = require('socket.io-client');

const socket = io(`http://localhost:${port}`);

socket.on('connect', () => {
  console.log(`client-${port}: connected on server;`);
  socket.emit('authenticate', port);
});

socket.on('new-user-online', (message) => {
  console.log(`client-${port}: ${message};`);
});
