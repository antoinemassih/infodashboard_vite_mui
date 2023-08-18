import React from 'react';
import './index.css';
import './tailwind.css';
import App from './App';
import { createRoot } from 'react-dom';
import * as SciChart from "scichart";
SciChart.SciChartSurface.configure({
    dataUrl: `https://cdn.jsdelivr.net/npm/scichart@${SciChart.libraryVersion}/_wasm/scichart2d.data`,
    wasmUrl: `https://cdn.jsdelivr.net/npm/scichart@${SciChart.libraryVersion}/_wasm/scichart2d.wasm`
});

createRoot(document.getElementById('root')).render(<App />);