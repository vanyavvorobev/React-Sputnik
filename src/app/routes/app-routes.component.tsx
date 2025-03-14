import React from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { HeaderComponent } from "../../components/header/header.component";
import styled from "styled-components";
import { Spin } from "antd";
import { useAuthorizationStoreService } from "../../domain/authorization/authorization-store.service";

const HomePageComponent = React.lazy(() => import("./../../pages/home/home-page.component"));
const LoginPageComponent = React.lazy(() => import("./../../pages/login/login-page.component"));
const RegisterPageComponent = React.lazy(() => import("../../pages/register/register-page.component"));
const TasksPageComponent = React.lazy(() => import("./../../pages/tasks/tasks-page.component"));
const FavoritesPageComponent = React.lazy(() => import("./../../pages/favorites/favorites-page.component"));

const RoutesWrapper = styled.div`
	margin-top: 64px;
`;

const SpinWrapper = styled.div`
	width: 100%;
	height: calc(100dvh - 64px);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PrivateRoute = () => {
	const { isAuth } = useAuthorizationStoreService();

	if(isAuth === undefined) {
		return (
			<SpinWrapper>
				<Spin/>
			</SpinWrapper>
		)
	}
	else {
		// return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
		return <Outlet/>
	}
}

export const AppRoutesComponent = () => {
	const { isAuth, loadMyProfile } = useAuthorizationStoreService();
	
	React.useEffect(() => {
		if(isAuth === undefined) {
			loadMyProfile();
		}
	}, [loadMyProfile, isAuth]);

	return (
		<BrowserRouter>
			<React.Suspense>
				<HeaderComponent/>
				<RoutesWrapper>
					<Routes>
						<Route path="/" element={<Navigate to="home" replace/>}/>
						<Route path="/home" element={<HomePageComponent/>}/>
						<Route path="/login" element={<LoginPageComponent/>}/>
						<Route path="/register" element={<RegisterPageComponent/>}/>
						<Route element={<PrivateRoute/>}>
							<Route path="/tasks/:selectedTask?" element={<TasksPageComponent/>}/>
							<Route path="/favorites" element={<FavoritesPageComponent/>}/>
						</Route>
					</Routes>
				</RoutesWrapper>
			</React.Suspense>
		</BrowserRouter>
	)
}