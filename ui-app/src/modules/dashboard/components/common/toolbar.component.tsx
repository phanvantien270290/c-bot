import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import OutputIcon from '@mui/icons-material/Output';
import Box from '@mui/material/Box/Box';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
//FilterList



export default function ToolbarComponent() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }} >
            <Stack direction="row" >
                <Button
                    startIcon={<RefreshIcon />}
                    id="basic-button"
                    aria-haspopup="true"
                    aria-controls={open ? 'basic-menu' : undefined}
                    onClick={handleClick}
                    aria-expanded={open ? 'true' : undefined}>
                    Filter
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem >Profile</MenuItem>
                    <MenuItem >My account</MenuItem>
                    <MenuItem onClick={handleClose}><Button>App</Button></MenuItem>
                </Menu>
                <Button startIcon={<OutputIcon />}>
                    Export
                </Button>
            </Stack>
            <Stack direction="row" >
                <IconButton
                    id="basic-button"
                    aria-haspopup="true"
                    aria-controls={open ? 'basic-menu' : undefined}
                    onClick={handleClick}
                    aria-expanded={open ? 'true' : undefined}>
                    <RefreshIcon />
                </IconButton>
                {/* <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu> */}
            </Stack>

        </Box >
    )
}