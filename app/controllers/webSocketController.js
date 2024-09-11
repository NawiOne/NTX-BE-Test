const { WebSocket } = require('ws');
const path = require('node:path');
const axios = require('axios');


exports.callmeWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {

        const sendDataToClient = async () => {
            const data = await getDataAttackLogs();

            if (data) ws.send(JSON.stringify(data));

        };

        sendDataToClient();

        const intervalId = setInterval(() => {
            sendDataToClient();
        }, 180000);

        ws.on('close', () => {
            console.log('Client Disconnected');
            clearInterval(intervalId)
        })
    })
};


exports.viewDataFromWebSocket = (req, res) => {
    const htmlView = path.join(__dirname, '../../view/index.html');

    return res.sendFile(htmlView)
}


const getDataAttackLogs = async () => {
    const logs = await axios.get('https://livethreatmap.radware.com/api/map/attacks?limit=10');
    const data = [];

    for (const log of logs.data) {
        for (const element of log) {
            const object = {
                sourceCountry: element.sourceCountry,
                destinationCountry: element.destinationCountry,
                millisecond: element.millisecond,
                type: element.type,
                weight: element.weight,
                attackTime: element.attackTime,
            }

            data.push(object)
        }
    }

    return data;
}