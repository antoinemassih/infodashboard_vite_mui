import React,{useState} from 'react';
import {CardContent, Card} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function StockCard({ stock }) {
    const [selected, setSelected] = useState(false);  // State to track selection

    const toggleSelection = () => {
        setSelected(!selected);
    }

    return (
        <Card
            onClick={toggleSelection}
            className={`
                relative mb-4 rounded-lg shadow-md transition-colors duration-1000 cursor-pointer 
                ${selected ? 'border-Deepwater-300 border-2' : ''} 
                hover:bg-Deepwater-400
            `}
        >
            <div className="absolute top-2 right-2">
                {selected && <CheckCircleOutlineIcon />}
            </div>
            <CardContent>
                <div color="textSecondary" className="text-xl">
                    {stock.ticker}
                </div>
                <div color="textSecondary" className="text-2xl">
                    <strong>127.22 </strong>( +1.2% )
                </div>
                <div className="text-sm">
                    <strong>O: </strong> {stock.open}    <strong>H: </strong> {stock.high}
                </div>

                <div className="text-sm">
                    <strong>L: </strong> {stock.low}  <strong>C: </strong> {stock.close}
                </div>

            </CardContent>
        </Card>
    );
}

export default StockCard;