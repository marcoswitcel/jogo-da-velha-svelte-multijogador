//@ts-check
/**
 * @author João Marcos de Vargas Witcel
 * 
 * João é o autor do código, exceto quando explicitado o contrário
 * 
 * Referências para o uso da biblioteca "ws"
 * @reference https://oieduardorabelo.medium.com/node-js-usando-websockets-5d642456d1f3
 */

/**
 * @typedef {Object} MessageEvent
 * @property {string} type
 * @property {any} data
 */

 const crypto =  require('crypto');
 const WebSocket = require('ws');
 
 /**
  * @author broofa
  * @url https://stackoverflow.com/users/109538/broofa
  * 
  * @reference https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
  * @reference https://gist.github.com/jed/982883
  * 
  * @returns {string}
  */
 function uuidv4() {
     //@ts-expect-error
     return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
         // Pequena troca de 'getRandomValues' para 'randomFillSync',
         // para rodar com a API do node
         (c ^ crypto.randomFillSync(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
     );
 }
 
 /** @type {Map<WebSocket, string>} **/
 const socketsMap = new Map();
 
 const port = 8085;
 const server = new WebSocket.Server({ port });
 
 /**
  * @param {WebSocket} webSocketInstance 
  * @param {string} type 
  * @param {any} data 
  * @returns {Promise<MessageEvent>}
  */
 async function dispatch(webSocketInstance, type, data) {
     switch(type) {
         case 'list-users': return {
             type: 'list-users-update',
             data: [...socketsMap.values()].filter(uuids => socketsMap.get(webSocketInstance) !== uuids)
         }
         default: return {
             type: 'no response',
             data: null
         }
     }
 }
 
 /**
  * @this {WebSocket}
  * @param {string} message
  * @return {Promise<void>}
  */
 async function processMessage(message) {
     try {
         /** @type {MessageEvent} **/
         const { type, data } = JSON.parse(message);
     
         const response = await dispatch(this, type, data);
     
         if (response.type !== 'no response') {
             // Envia a respota
             this.send(JSON.stringify(response))
         }
     } catch(ex) {
         this.send(JSON.stringify({
             type: 'incorrect format',
             data: { example: { type: 'example', data : 'anything'} }
         }))
     }
 }
 
 
 /**
  * Quando uma nova conexão é aberta com o servidor realiza o processo
  * de adicionar os listeners de respota à conexão, também armazena a
  * mesma em um mapa de conexões e UUIDs
  */
 server.on('connection', function connection(webSocketInstance, incomingMessage) {
 
     const uuid = uuidv4();
     console.log(`Conexão estabelecida:\nuuid recebido: ${uuid}\n`);
 
     // Salvando o conexão no mapa de conexões
     socketsMap.set(webSocketInstance, uuid);
 
     // Processa as mensagens recebidas
     webSocketInstance.on('message', processMessage);
     
     webSocketInstance.on('onerror', () => {
         console.log(`Error: uuid ${socketsMap.get(webSocketInstance)}`)
     });
 
     webSocketInstance.on('close', () => {
         console.log(`Conexão terminada:\nuuid: ${uuid}\n`);
         socketsMap.delete(webSocketInstance);
     });
 });
 
 console.log(`Server inicializado:\nEscutando na porta: ${port}\n`)