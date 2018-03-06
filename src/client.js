import Push from 'push.js';

export class HollerClient {
	/**
	 * Creates a new Holler client
	 *
	 * @param {string} address - URL of a WebSocket server
	 */
	constructor(address) {
		this.socket = new WebSocket(address);
		this.socket.addEventListener('message', this.onMessage.bind(this));
	}

	/**
	 * Extension point called when a new notification is received
	 *
	 * @param {MessageEvent} message - Notification message event
	 */
	onMessage({ data }) {
		const { title, config } = JSON.parse(data);
		Push.create(title, config);
	}
}

window.HollerClient = HollerClient;

export default HollerClient;
