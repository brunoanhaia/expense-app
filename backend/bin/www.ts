#!/usr/bin/env node

/**
 * Module dependencies.
 */
import ApiRouter from "../app/routes/ApiRouter";

import { App } from '../app/app';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as express from "express";
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const debug = require('debug')('expense-app:server');
const http = require('http');
const middleWares = [
	bodyParser.json(),
	bodyParser.urlencoded({ extended: false }),
	cors(),
	logger('dev'),
	express.json(),
	express.urlencoded({ extended: false }),
	cookieParser(),
];

const controllers = [
	new ApiRouter()
];

const settings = [
	{"json spaces": "4"}
];

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '5000');
// app.set('port', port);

const myApp = new App({
	port: port,
	middleWares: middleWares,
	controllers: controllers,
	settings: settings
});
myApp.port = port;

/**
 * Create HTTP server.
 */

let server = http.createServer(myApp.app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`Server running on port ${port}`));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	let port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSEEADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
