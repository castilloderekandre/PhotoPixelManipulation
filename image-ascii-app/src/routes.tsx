import type { ReactElement } from "react";
import HomePage from "./pages/Home/HomePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ContactPage from "./pages/Contact/ContactPage";
import NotFoundPage from "./pages/Not Found/NotFoundPage";
import RootLayout from "./components/RootLayout/RootLayout";
import type { AppRoute, IndexRoute, PathRoute, NavRoute } from "./api/types";

export const appRoutes: AppRoute[] = [
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
				label: 'Home',
				showInNav: true,
			},
			{
				path: '/projects',
				label: 'Projects',
				element: <ProjectsPage />,
				showInNav: true,
			},
			{
				path: '/contact',
				label: 'Contact',
				element: <ContactPage />,
				showInNav: true,
			},
			{
				path: '/notfound',
				element: <NotFoundPage />,
			},

		]
	}
]

export const navLinks = appRoutes[0].children!.filter((route: (IndexRoute | PathRoute | NavRoute)) => route.hasOwnProperty("showInNav"))
