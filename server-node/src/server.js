const {port} = require('minimist')(process.argv.slice(2));
const inversePort = (port===3001?3002:3001);

var io = require('socket.io')(port);
var redis = require('socket.io-redis');

io.adapter(redis({ host: 'localhost', port: 6379 }));

function handleAuthenticate(accountId) {

  io.emit('new-user-online', `${port}: user ${accountId} connected!`);

  console.log(`${port}: authenticated with ${accountId}`);

}

io.on('connection', (socket) => {
  console.log(`server event connect on port: ${port}`);

  socket.on('authenticate', handleAuthenticate);
});


io.on('disconnect', () => {
  console.log(`server event disconnect on port: ${port}`);
});
