import React, { FC, useCallback, useEffect } from 'react';
import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	LinearProgress,
	Toolbar,
	Typography
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import './App.css';
import { TodolistsList } from "../features/TodolistsList/TodolistsList";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./store";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Route, Routes } from 'react-router-dom';
import { Login } from "../features/Login/Login";
import { logoutTC } from "../features/Login/auth-reducer";

const App: FC = () => {
	const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
	const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	const logoutHandler = useCallback(() => {
		dispatch(logoutTC())
	}, [])

	if (!isInitialized) {
		return <div
			style={ { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } }
		>
			<CircularProgress />
		</div>
	}

	return (
		<div className="App">
			<Box sx={ { flexGrow: 1 } }>
				<AppBar position="static">
					<ErrorSnackbar />

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
						{ isLoggedIn && <Button color="inherit" onClick={ logoutHandler }>Log out</Button> }
					</Toolbar>

					{ status === 'loading' && <LinearProgress /> }
				</AppBar>
			</Box>

			<Container sx={ { mt: 3, mb: 3 } }>
				<Routes>
					<Route path="/" element={ <TodolistsList /> } />
					<Route path="login" element={ <Login /> } />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
