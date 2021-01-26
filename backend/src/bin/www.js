#!/usr/bin/env node
/**
 * Module dependencies.
 */
// const debug = require('debug')('quick-credit:server');
import debug from 'debug';
import http from 'http';
import app from '../app';
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3003');
app.set('port', port);
const server = http.createServer(app);

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    alert(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case 'EADDRINUSE':
    alert(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);