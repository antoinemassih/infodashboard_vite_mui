import { w3cwebsocket as WebSocket } from 'websocket';
import { Observable } from 'rxjs';

export class PolygonSocketClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }


    async getHistoricalData(optionsTicker, multiplier, timespan, from, to, adjusted = true, sort = 'asc', limit = 500) {
        const endpoint = `https://api.polygon.io/v2/aggs/ticker/${optionsTicker}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=${adjusted}&sort=${sort}&limit=${limit}&apiKey=${this.apiKey}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error('Failed to fetch historical data.');
        }

        return data.results;
    }



    getRealtimeOptionsStream(contractSymbols) {
        return new Observable((subscriber) => {
            const client = new WebSocket('wss://delayed.polygon.io/options');

            client.onerror = function() {
                console.log('Connection Error');
            };

            client.onopen = () => {
                console.log('WebSocket Client Connected');

                // Authenticate using the apiKey provided during class instantiation
                client.send(JSON.stringify({
                    "action": "auth",
                    "params": this.apiKey
                }));
            };

            client.onclose = function() {
                console.log('WebSocket Client Closed');
            };

            client.onmessage = function(e) {
                if (typeof e.data === 'string') {
                    const data = JSON.parse(e.data);
                    if (data.ev && data.ev === "status" && data.status === "auth_success") {
                        // Authentication successful, subscribe to the desired contract(s)
                        client.send(JSON.stringify({
                            "action": "subscribe",
                            "params": contractSymbols
                        }));
                    } else {
                        // Forward received data to subscribers
                        subscriber.next(data);
                    }
                }
            };

            return () => {
                client.close();
            };
        });
    }
}


