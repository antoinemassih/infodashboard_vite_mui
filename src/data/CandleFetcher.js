import axios from 'axios';

export default async function getCandles(symbol, interval, limit) {
    try {
        const response = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);

        // Binance's OHLC data format is [Open time, Open, High, Low, Close, Volume, Close time, ..., ...]
        const data = response.data;

        const dateValues = data.map(d => d[0]); // Open time
        const openValues = data.map(d => +d[1]); // Open price
        const highValues = data.map(d => +d[2]); // High price
        const lowValues = data.map(d => +d[3]); // Low price
        const closeValues = data.map(d => +d[4]); // Close price
        const volumeValues = data.map(d => +d[5]); // Volume

        return { dateValues, openValues, highValues, lowValues, closeValues, volumeValues };
    } catch (err) {
        console.error(err);
    }
}
