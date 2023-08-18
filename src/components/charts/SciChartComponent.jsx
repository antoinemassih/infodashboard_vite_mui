import React, { useState, useEffect, useRef } from 'react';
import {
    NumericAxis,
    SciChartSurface,
    OhlcDataSeries,
    SciChartJsNavyTheme,
    FastCandlestickRenderableSeries,
    ZoomExtentsModifier,
    ZoomPanModifier,
    MouseWheelZoomModifier,
    CursorModifier,
    NumberRange,
    EDragMode,
    YAxisDragModifier,
    XAxisDragModifier,
    ECoordinateMode,
    TextAnnotation,
    DateTimeNumericAxis,
    EAutoRange, EAxisAlignment, ENumericFormat, CategoryAxis
} from "scichart";
import {LineAnnotation} from "scichart/Charting/Visuals/Annotations/LineAnnotation";
import {PolygonSocketClient} from "./PolygonSocketClient.jsx";
import {SimpleChartModifierJs} from "./chartModifier/SimpleChartModifierJs.jsx";

const apiKey = "SAvNmReF9zNjQkjGtuX6Hg8cEzcP2UsC";
const contractSymbols = "O:SPY230815P00450000"; // You can adjust this to other contracts if needed
new PolygonSocketClient(apiKey);
export default function SciChartComponent({id,size,contractSymbols}) {
    const [seriesType, setSeriesType] = useState('Candlestick');
    const chartRef = useRef(null);


    let chartwidth = 1200;
    let chartheight = 500;

if (size == 'large') {
    chartwidth = 2400;
    chartheight = 600;
}


    useEffect(() => {
        const unix5min = 300000;
        const unix1min = 60000;
        const startDate = new Date("2023-08-09").getTime() / 1000;

        (async () => {
            const { wasmContext, sciChartSurface } = await SciChartSurface.create(id, {theme: new SciChartJsNavyTheme()} );
            sciChartSurface.xAxes.add(new CategoryAxis(wasmContext, {
                // set Defaults so that category axis can draw. Once you add series and data these will be overridden
                // All Linux Timestamp properties in scichart.js must be divided by 1,000 to go from milliseconds to seconds
                defaultXStart: new Date("2023-08-09").getTime() / 1000,
                defaultXStep: unix5min / 1000,
                // set other properties
                drawMajorGridLines: true,
                drawMinorGridLines: true,
                axisAlignment: EAxisAlignment.Bottom,
                // set a date format for labels
                labelFormat: ENumericFormat.Date_DDMMYY
            }));


            const yAxis = new NumericAxis(wasmContext);
            sciChartSurface.yAxes.add(yAxis);

            const dataSeries = new OhlcDataSeries(wasmContext, { isSorted: true });
            const renderableSeries = new FastCandlestickRenderableSeries(wasmContext, { dataSeries,strokeThickness: 0,
                dataPointWidth: .7,
                opacity: 0.75 });
            sciChartSurface.renderableSeries.add(renderableSeries);

            const cursorModifier = new CursorModifier({
                crosshairStroke: "#ff6600",
                crosshairStrokeThickness: .6,
                tooltipContainerBackground: "blue",
                tooltipTextStroke: "white",
                showTooltip: true,
                axisLabelFill: "#b36200",
                axisLabelStroke: "#fff",
                crosshairStrokeDashArray: [5, 5]
            });
            sciChartSurface.chartModifiers.add(new SimpleChartModifierJs(),new ZoomExtentsModifier(), new ZoomPanModifier(), new MouseWheelZoomModifier(), new YAxisDragModifier({
                dragMode: EDragMode.Scaling,
            }),new XAxisDragModifier({
                dragMode: EDragMode.Scaling,
            }),cursorModifier);

            const localPeaks = [];
            const N = 20; // Define your window size


            // Fetch historical data and add it to the chart
            
                const polygonClient = new PolygonSocketClient("SAvNmReF9zNjQkjGtuX6Hg8cEzcP2UsC");
          


            const tickerSymbol = contractSymbols;
            const multiplier = 1;
            const timespan = "minute";
            const fromDate = "2023-08-09";
            const toDate = "2023-08-14";

            async function fetchAndProcessData() {
                try {
                    
                    const historicalData = await polygonClient.getHistoricalData(tickerSymbol, multiplier, timespan, fromDate, toDate);

                    // Check if the response contains the expected data format
                    if (!historicalData || !Array.isArray(historicalData)) {
                        console.warn("Unexpected response format or no historical data returned.");
                        return;
                    }

                    console.log("Returned Historical Data:", historicalData);

                    historicalData.forEach((priceBar, i) => {
                        dataSeries.append(priceBar.t, priceBar.o, priceBar.h, priceBar.l, priceBar.c);

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

                    console.log("Appended Data Count:", dataSeries.count());

                } catch (error) {
                    console.error('Error processing historical data:', error);
                }
            }

             await fetchAndProcessData();


            for (let i = 0; i < localPeaks.length - 1; i++) {
                const currentPeak = localPeaks[i];
                const nextPeak = localPeaks[i + 1];

                sciChartSurface.annotations.add(
                    new LineAnnotation({
                        stroke: "#555555",
                        strokeThickness: 2,
                        xCoordinateMode: ECoordinateMode.DataValue,
                        x1: currentPeak.time,
                        x2: nextPeak.time,
                        yCoordinateMode: ECoordinateMode.DataValue,
                        y1: currentPeak.high,
                        y2: nextPeak.high,
                        isEditable: true,
                        isSelected: false,
                    })
                );
            }

            const subscription = polygonClient.getRealtimeOptionsStream(contractSymbols).subscribe(data => {
                if (!data || data.s === undefined || data.o === undefined || data.h === undefined || data.l === undefined || data.c === undefined || data.av === undefined) {
                    console.warn('Incomplete or unexpected data received:', data);
                    return;
                }
                try {
                    const priceBar = {
                        date: new Date(data.s),  // Convert Unix Milliseconds to a JavaScript Date object
                        open: data.o,
                        high: data.h,
                        low: data.l,
                        close: data.c,
                        volume: data.av
                    };
                    onNewTrade(priceBar);
                } catch (error) {
                    console.error('Error processing new trade data:', error);
                }
            });



            const onNewTrade = (priceBar) => {
                const currentIndex = dataSeries.count() - 1;
                if (currentIndex >= 0) {
                    const latestCandleDate = dataSeries.getNativeXValues().get(currentIndex);
                    if (priceBar.date.getTime() === latestCandleDate) {  // Convert to timestamp here
                        dataSeries.update(currentIndex, priceBar.open, priceBar.high, priceBar.low, priceBar.close);
                    } else {
                        dataSeries.append(priceBar.date.getTime(), priceBar.open, priceBar.high, priceBar.low, priceBar.close);  // Convert to timestamp here
                        if (xAxis.visibleRange.max > latestCandleDate) {
                            const dateDifference = priceBar.date.getTime() - latestCandleDate;  // Convert to timestamp here
                            const shiftedRange = new NumberRange(xAxis.visibleRange.min + dateDifference, xAxis.visibleRange.max + dateDifference);
                            xAxis.animateVisibleRange(shiftedRange, 250);
                        }
                    }
                } else {
                    dataSeries.append(priceBar.date.getTime(), priceBar.open, priceBar.high, priceBar.low, priceBar.close);  // Convert to timestamp here
                }
            };


            return () => {
                subscription.unsubscribe();
                sciChartSurface.chartModifiers.remove(annotationCreationModifier);
                sciChartSurface.delete();

            }
        })();

    }, []);


    const handleToggleButtonChanged = (event) => {
        const newSeriesType = event.target.value;
        setSeriesType(newSeriesType);
    };

    return (
        <div ref={chartRef} id={id} style={{ height: chartheight, width: chartwidth }}>
            <button value="Candlestick" onClick={handleToggleButtonChanged}>Candlestick Series</button>
            <button value="OHLC" onClick={handleToggleButtonChanged}>OHLC Series</button>
        </div>
    );
};
