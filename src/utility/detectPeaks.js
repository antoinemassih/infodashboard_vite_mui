// peakDetection.js

export const detectLocalPeaks = (historicalData) => {
    const localPeaks = [];
    const N = 20; // Define your window size
    historicalData.forEach((priceBar, i) => {

        // If you have a similar logic for detecting peaks or other patterns, you can add it here
        if (i >= N/2 && i < historicalData.length - N/2) {
            const windowCandles = historicalData.slice(i - N/2, i + N/2 + 1);
            const isMajorPeak = windowCandles.every(candle => candle === priceBar || candle.h <= priceBar.h);

            if (isMajorPeak) {
                // Store the index and high value of the local peak
                localPeaks.push({ time: i, high: priceBar.h });
                console.log("Local Peak at index:", i, "with high value:", priceBar.h);
            }
        }
    });

    return localPeaks;
};



