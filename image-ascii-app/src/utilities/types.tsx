import type { ReactElement } from "react";

export interface ApiTestResponse {
	msg: string;
}

export interface IndexRoute {
	index: true;
	element: ReactElement;
}

export interface PathRoute {
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

export interface ProjectData {
	coverimage: string; // for import.meta.glob
	title: string
	description: string;
	technologies: string[]; // tag component
	path: string; // page route where it will be
	element: ReactElement,
}

export interface Technology {
	name: string;
	icon: SVGElement;
}
