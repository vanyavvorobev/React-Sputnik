import React from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"

const PrivateRoute = () => {
	const isAuth = true;
	if(isAuth === undefined) {
		return <></> 
	}
	else {
		return isAuth ? <Outlet/> : <Navigate to="/login" replace/>
	}
}

export const AppRoutesComponent = () => {

	return (
		<BrowserRouter>
			<React.Suspense>
				<Routes>
					<Route path="/" element={<Navigate to="home" replace/>}/>
					<Route path="/home" element={<>home page</>}/>
					<Route path="/login" element={<>login page</>}/>
					<Route element={<PrivateRoute/>}>
						<Route path="/tasks" element={<>tasks page</>}/>
						<Route path="/favorites" element={<>favorites page</>}/>
					</Route>
				</Routes>
			</React.Suspense>
		</BrowserRouter>
	)
}