import type { ReactElement } from "react";
import HomePage from "./pages/Home/HomePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ContactPage from "./pages/Contact/ContactPage";
import NotFoundPage from "./pages/Not Found/NotFoundPage";

interface AppRoute {
	path: string;
	label?: string;
	element: ReactElement;
	showInNav?: boolean;
}

export const appRoutes: AppRoute[] = [
	{
		path: '/home',
		label: 'Home',
		element: <HomePage />,
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

export const navLinks = appRoutes.filter(route => route.label && route.showInNav).map(route => ({ path: route.path, label: route.label! }));
