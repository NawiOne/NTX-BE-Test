const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fetch = require('node-fetch');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Function to fetch data from the API
const fetchAttackData = async () => {
  try {
    const response = await fetch('https://livethreatmap.radware.com/api/map/attacks?limit=10');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching attack data:', error);
    return null;
  }
};

// Function to handle WebSocket connections and periodically fetch data
function callmeWebSocket() {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Function to fetch data and send it to the client
    const sendDataToClient = async () => {
      const data = await fetchAttackData();
      if (data) {
        ws.send(JSON.stringify(data));
      } else {
        ws.send(JSON.stringify({ error: 'Failed to fetch data' }));
      }
    };

    // Fetch data immediately on connection
    sendDataToClient();

    // Set interval to fetch data every 3 minutes (180000 ms)
    const intervalId = setInterval(() => {
      sendDataToClient();
    }, 180000); // 3 minutes

    // Clear the interval when the client disconnects
    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(intervalId);
    });
  });
}

callmeWebSocket();

// Start the Express server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
