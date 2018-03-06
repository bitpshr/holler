![Holler logo](logo.png?raw=true)


Holler sends [desktop push notifications](https://developer.mozilla.org/en-US/docs/Web/API/notification) from the command line using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

[![npm version](https://badge.fury.io/js/%40bitpshr.net%2Fholler.svg)](https://badge.fury.io/js/%40bitpshr.net%2Fholler)

## Usage

1. Install the package.
	```sh
	$ npm i @bitpshr.net/holler -D
	```
2. Create a `HollerServer` using an existing [Node HTTP server](https://nodejs.org/api/http.html).
	```js
	const http = require('http');
	const HollerServer = require('@bitpshr.net/holler/server');
	const server = http.createServer().listen(1337);
	new HollerServer(server);
	```
3. Include the client script as an ES6 module or as a script tag and create a new Holler Client.
	```js
	import HollerClient from '@bitpshr.net/holler/client';
	new HollerClient('ws://localhost:1337');
	```

	```html
	<script src="node_modules/@bitpshr.net/holler/client.js"></script>
	<script>new HollerClient('ws://localhost:1337');</script>
	```
4. Send [JavaScript push notifications](https://developer.mozilla.org/en-US/docs/Web/API/notification) using the `holler` CLI.
	```sh
	$ holler --url="ws://localhost:1337" --title="Hello" --body="Hello, world"
	```
	See all available CLI commands via `holler --help`.

## Demo

![Holler demo](https://i.gyazo.com/c971f0ebd6190c6b32bb23800cb894be.gif)

## License

[WTFPL](http://www.wtfpl.net/)
