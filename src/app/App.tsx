import React, { FC } from 'react';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import './App.css';
import { TodolistsList } from "../features/TodolistsList";


const App: FC = () => {
	return (
		<div className="App">
			<Box sx={ { flexGrow: 1 } }>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={ { mr: 2 } }
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
							News
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
			</Box>

			<Container sx={ { mt: 3, mb: 3 } }>
				<TodolistsList />
			</Container>
		</div>
	);
}

export default App;
