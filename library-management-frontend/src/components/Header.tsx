import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <AppBar position="static" color="success">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: 'flex !justify-center !items-center', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                    Library Management
                </Typography>
                <Button color="inherit" component={Link} to="/books" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                    Books
                </Button>
                <Button color="inherit" component={Link} to="/create-book" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                    Create Book
                </Button>
                <Button color="inherit" component={Link} to="/users" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                    Users
                </Button>
                <Button color="inherit" component={Link} to="/create-user" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
                    Create User
                </Button>
            </Toolbar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem component={Link} to="/books" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Books" />
                    </ListItem>
                    <ListItem component={Link} to="/create-book" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Create Book" />
                    </ListItem>
                    <ListItem component={Link} to="/users" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Users" />
                    </ListItem>
                    <ListItem component={Link} to="/create-user" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Create User" />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Header;
