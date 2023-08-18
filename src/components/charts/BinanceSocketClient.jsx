import { w3cwebsocket as WebSocket } from 'websocket';
import { Observable } from 'rxjs';
import axios from "axios";

export class BinanceSocketClient {
    getHistoricalCandleData(symbol, interval) {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`)
                .then(response => {
                    const data = response.data;
                    const formattedData = data.map(datum => ({
                        openTime: datum[0],
                        open: parseFloat(datum[1]),
                        high: parseFloat(datum[2]),
                        low: parseFloat(datum[3]),
                        close: parseFloat(datum[4]),
                        volume: parseFloat(datum[5]),
                        closeTime: datum[6],
                        quoteAssetVolume: parseFloat(datum[7]),
                        numberOfTrades: datum[8],
                        takerBuyBaseAssetVolume: parseFloat(datum[9]),
                        takerBuyQuoteAssetVolume: parseFloat(datum[10]),
                        isFinal: datum[11]
                    }));
                    resolve(formattedData);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    getRealtimeCandleStream(symbol, interval) {
        return new Observable((subscriber) => {
            const client = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);

            client.onerror = function() {
                console.log('Connection Error');
            };

            client.onopen = function() {
                console.log('WebSocket Client Connected');
            };

            client.onclose = function() {
                console.log('WebSocket Client Closed');
            };

            client.onmessage = function(e) {
                if (typeof e.data === 'string') {
                    const data = JSON.parse(e.data);
                    const candlestickData = data.k;
                    const formattedData = {
                        openTime: candlestickData.t,
                        open: parseFloat(candlestickData.o),
                        high: parseFloat(candlestickData.h),
                        low: parseFloat(candlestickData.l),
                        close: parseFloat(candlestickData.c),
                        volume: parseFloat(candlestickData.v),
                        closeTime: candlestickData.T,
                        quoteAssetVolume: parseFloat(candlestickData.q),
                        numberOfTrades: candlestickData.n,
                        takerBuyBaseAssetVolume: parseFloat(candlestickData.V),
                        takerBuyQuoteAssetVolume: parseFloat(candlestickData.Q),
                        isFinal: candlestickData.x
                    };
                    subscriber.next(formattedData);
                }
            };

            return () => {
                client.close();
            };
        });
    }
}
