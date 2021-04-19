/**
 * @typedef {Object} AppMessageEvent
 * @property {string} type
 * @property {any} data
 *
 * @callback messageCallback
 * @param {AppMessageEvent}
 */

let ws = new WebSocket("ws://localhost:8085", "protocolOne");

const listeners = new Map();

ws.onopen = () => console.log("Conexão estabelecida");
ws.onclose = () => console.log("Conexão terminada");

/**
 * @this {WebSocket}
 * @param {MessageEvent} message 
 */
ws.onmessage = function (messageEvent) {
    try {
        /** @type {AppMessageEvent} **/
        const { type, data } = JSON.parse(messageEvent.data);
    
        if (listeners.has(type) ) {
            listeners.get(type)({ type, data })
        }
    } catch(ex) {
        console.log(ex)
    }
};

/**
 * @param {string} type 
 * @param {any} data 
 * @return {Promise<void>}
 */
export async function sendEvent(type, data) {
    const ws = await WebSocketCon();

    ws.send(JSON.stringify({type, data }));
}

/**
 * @param {string} type 
 * @param {messageCallback} callback 
 */
export function listenEvent(type, callback) {
    listeners.set(type, callback)
}

/**
 * @param {string} type 
 */
export function removeListenEvent(type) {
    listeners.delete(type);
}

/**
 * @returns {Promise<WebSocket>}
 */
export default async function WebSocketCon() {
    return await new Promise((resolve, reject) => {
        if (ws.readyState === WebSocket.OPEN) {
            return resolve(ws);
        }

        ws.onopen = () => resolve(ws);
        ws.onerror = reject;
    })
}