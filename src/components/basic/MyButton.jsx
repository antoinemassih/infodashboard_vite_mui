import { Button } from '@mui/material';

function MyButton({ label, gain=" " }) {
    return (
        <Button variant="contained" className="bg-blue-500">
            {label} {gain}
        </Button>
    );
}

export default MyButton;