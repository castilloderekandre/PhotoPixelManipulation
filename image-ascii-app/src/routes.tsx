import HomePage from "./pages/Home/HomePage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ContactPage from "./pages/Contact/ContactPage";
import NotFoundPage from "./pages/Not Found/NotFoundPage";
import RootLayout from "./components/RootLayout/RootLayout";
import TestPage from "./pages/Test/TestPage";
// import type { AppRoute, IndexRoute, PathRoute, NavRoute } from "./api/types";
import AboutMePage from "./pages/About/AboutMePage";
import { projectMetaObjects } from "./assets/projects/projectMetadataObjects";


export const appRoutes = [
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
				path: '/about',
				label: 'About Me',
				element: <AboutMePage />,
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
			{
				path: '/test',
				element: <TestPage />,
			},
		]
	}
]


projectMetaObjects.map(
	(projectMetaObject) => { 
		appRoutes[0].children.push({
			path: projectMetaObject.path,
			element: projectMetaObject.element,
		});
	}
)

console.log(appRoutes);

export const navLinks = appRoutes[0 /*0 is always RootLayout*/ ].children!.filter((route) => route.hasOwnProperty("showInNav"))
