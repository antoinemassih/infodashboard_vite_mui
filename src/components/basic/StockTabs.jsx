import React from 'react';
import MyButton from './MyButton';

function StockTabs({ stocks }) {
    return (
        <div className={"p-2 pl-4 flex gap-2"}>

            {stocks.map((stock, index) => (
                <MyButton key={index} label={stock.label} gain={stock.gain} />
            ))}
        </div>
    );
}

export default StockTabs;
