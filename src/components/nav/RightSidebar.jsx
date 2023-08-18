import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import ChevronRightIcon from "@mui/icons-material/ChevronRight.js";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox.js";
import MailIcon from "@mui/icons-material/Mail.js";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {styled, useTheme} from "@mui/material/styles";

const rightDrawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));
const RightDrawer = ({ open, handleDrawerClose }) => {
    const theme = useTheme();

    return (
<Drawer
    sx={{
        width: rightDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: rightDrawerWidth,
        },
    }}
    variant="persistent"
    anchor="right"
    open={open}
>
    <DrawerHeader>
        <IconButton onClick={handleDrawerClose} color="inherit">
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
        {['Template 1', 'Template 2', 'Template 3', 'Template 4'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <div><svg height="30" width="30">
                            <circle cx="15" cy="15" r="15" stroke="blue" stroke-width="1" fill="gray" />
                        </svg></div>
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        ))}
    </List>
    <Divider />
    <List>
        {['Market View', 'Stock Heatmap View', 'All Stock Analyzer'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                       <div><svg height="30" width="30">
                           <circle cx="15" cy="15" r="15" stroke="blue" stroke-width="1" fill="gray" />
                       </svg></div>
                    </ListItemIcon >
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        ))}
    </List>
</Drawer>
    );
};

export default RightDrawer;
