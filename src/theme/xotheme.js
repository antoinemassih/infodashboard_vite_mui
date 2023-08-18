import {createTheme} from "@mui/material";

export const xotheme = createTheme({
    palette: {
        primary: {
            main: '#193B49',
            contrastText: '#a29999',
        },
        secondary: {
            main: '#193B49',
            contrastText: '#a29999',
        },
        background: {
            default: '#102031',
            paper: '#162A41'

        },
        text:{
            primary: '#a29999',
            secondary: 'rgba(255,255,255,0.7)',
        }
    },
    typography: {
        fontFamily: [
            'new-hero',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});