#!/usr/bin/env node

const chalk = require('chalk');
const moment = require('moment');
const WebSocket = require('ws');
const yargs = require('yargs');

const { body, icon, link, timeout, title, url } = yargs
	.option('b', {
		alias: 'body',
		describe: 'Notification body text',
		type: 'string'
	})
	.option('d', {
		alias: 'timeout',
		default: 400,
		describe: 'Timeout in ms until notification automatically closes',
		type: 'number'
	})
	.option('i', {
		alias: 'icon',
		describe: 'Notification icon image src',
		type: 'string'
	})
	.option('l', {
		alias: 'link',
		describe: 'Relative URL path to navigate to on mobile click',
		type: 'string'
	})
	.option('t', {
		alias: 'title',
		default: 'Notification',
		describe: 'Notification title',
		type: 'string'
	})
	.option('u', {
		alias: 'url',
		describe: 'Root URL of express server to connect to',
		demand: true,
		type: 'string'
	}).argv;

const socket = new WebSocket(url);
const date = `\n\n${chalk.gray(moment().format('L hh:mmA'))}`;

try {
	socket.on('open', () => {
		socket.send(
			JSON.stringify({
				title,
				config: {
					body,
					icon,
					link,
					timeout
				}
			})
		);
		socket.close();
		console.log(`${date} ${chalk.green('[SUCCESS]')} Notification delivered to ${url}.\n\n`);
	});
} catch (error) {
	console.log(`${date} ${chalk.red('[FAILURE]')} Notification not delivered to ${url}.\n\n`);
}
