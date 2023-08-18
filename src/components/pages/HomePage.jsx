import React from 'react';
import SciChartComponent from "../charts/SciChartComponent.jsx";
import StockCard from "../cards/StockCard.jsx";
import CardContainer from "../cards/CardContainer.jsx";
import StickyNav from "../basic/StickyNav.jsx";

const sampleStock = {
    ticker: "AAPL",
    open: "150.00",
    high: "155.00",
    low: "148.00",
    close: "154.00"
};
const HomePage = () => {
    return (
        <div>

            <div className={'m-2 border-Deepwater-500 border-2'}><SciChartComponent id="chart1" size="large" contractSymbols={'SPY'}/></div>
            <StickyNav>
            <CardContainer>
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />
                <StockCard stock={sampleStock} />

            </CardContainer>
            </StickyNav>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0px' }}>

                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart2" contractSymbols={'O:SPY230815P00450000'} /></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart3" contractSymbols={'O:SPY230815P00450000'}/></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart4" contractSymbols={'O:SPY230815P00450000'}/></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart5" contractSymbols={'O:SPY230815P00450000'}/></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart6" contractSymbols={'O:SPY230815P00450000'}/></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart7" contractSymbols={'O:SPY230815P00450000'}/></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart8" contractSymbols={'O:SPY230815P00450000'}/></div>
                <div className={'m-1 border-Deepwater-500 border-2'}><SciChartComponent id="chart9" contractSymbols={'O:SPY230815P00450000'}/></div>

            </div>

        </div>

    );
};

export default HomePage;
