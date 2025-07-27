import type { ReactElement } from "react";

export interface ApiTestResponse {
	msg: string;
}

export type IndexRoute = {
	index: true;
	element: ReactElement;
}

export type PathRoute = {
	path: string;
	element: ReactElement;
}

export type NavRoute = (IndexRoute | PathRoute) & {
	label: string;
	showInNav: boolean;
}

export type AppRoute = {
	path: string;
	element: ReactElement;
	children?: (IndexRoute | PathRoute | NavRoute)[];
}
