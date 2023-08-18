import * as React from 'react';
import {styled, ThemeProvider, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomePage from "./components/pages/HomePage.jsx";

import Channels from "./components/pages/Channels.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LeftDrawer from "./components/nav/LeftDrawer.jsx";
import RightSidebar from "./components/nav/RightSidebar.jsx";
import MyButton from "./components/basic/MyButton.jsx";
import {xotheme} from "./theme/xotheme.js";
import StockTabs from "./components/basic/StockTabs.jsx";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const LeftDrawerWidth = 240;
const RightDrawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'leftOpen' && prop !== 'rightOpen',
})(({ theme, leftOpen, rightOpen }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(leftOpen && !rightOpen && {
        marginLeft: LeftDrawerWidth,
        width: `calc(100% - ${LeftDrawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(rightOpen && !leftOpen && {
        marginRight: RightDrawerWidth,
        width: `calc(100% - ${RightDrawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(leftOpen && rightOpen && {
        marginLeft: LeftDrawerWidth,
        marginRight: RightDrawerWidth,
        width: `calc(100% - ${LeftDrawerWidth + RightDrawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export default function App() {
    const stocks = [
        { label: "AAPL", gain: "+1.2%" },
        { label: "GOOGL", gain: "+0.8%" },
        { label: "AMZN", gain: "-0.5%" },
        { label: "TSLA", gain: "+2.5%" },
        { label: "MSFT", gain: "+0.3%" },
        { label: "NFLX", gain: "-1.0%" },
        { label: "FB", gain: "+0.6%" },
        { label: "NVDA", gain: "+1.5%" },
        { label: "AMD", gain: "-0.2%" },
        { label: "PYPL", gain: "-0.8%" },
        { label: "SQ", gain: "+2.0%" },
        { label: "AMC", gain: "-1.5%" },
        { label: "GME", gain: "+0.4%" },
        { label: "CRM", gain: "-0.3%" },
        { label: "NVAX", gain: "+1.1%" },
        { label: "ZM", gain: "+0.9%" },
        { label: "DOCU", gain: "-0.7%" },
        { label: "ROKU", gain: "+0.3%" },
    ];

    const [LeftOpen, setLeftOpen] = React.useState(false);

    const handleLeftDrawerOpen = () => {
        setLeftOpen(true);
    };

    const handleLeftDrawerClose = () => {
        setLeftOpen(false);
    };

    const [RightOpen, setRightOpen] = React.useState(false);

    const handleRightDrawerOpen = () => {
        setRightOpen(true);
    };

    const handleRightDrawerClose = () => {
        setRightOpen(false);
    };

    return (
<ThemeProvider theme={xotheme}>


        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" leftOpen={LeftOpen} rightOpen={RightOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleLeftDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(LeftOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                       Trader Workstation
                    </Typography>
                    <StockTabs stocks={stocks} />

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleRightDrawerOpen}
                        sx={{
                            marginLeft: 'auto',
                            ...(RightOpen && { display: 'none' }),
                        }}
                    >
                        <AutoAwesomeMosaicIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <LeftDrawer open={LeftOpen} handleDrawerClose={handleLeftDrawerClose} />
            <div sx={{ flexGrow: 1, p: 3 }}>

                <Router>
                    <div className="flex">

                        <div className={`flex-1 ${RightOpen ? 'right-sidebar-open' : ''}`} style={{ marginTop:80,marginLeft:20}}>


                        <div className="content">
                                <Routes>
                                    <Route exact path="/" element={<HomePage />} />
                                    <Route path="/contact" element={<Channels />} />
                                </Routes>
                            </div>
                        </div>

                    </div>
                </Router>
            </div>
       <RightSidebar open={RightOpen} handleDrawerClose={handleRightDrawerClose} />
        </Box>
</ThemeProvider>

    );
}