import type { ReactElement } from "react";

export interface ApiTestResponse {
	msg: string;
}

export interface ApiAsciiResponse {
	data: {
		asciiText: string
	}
}

export interface ApiAsciiRequest {
	image: string;
}

export interface BaseRoute {
	element: ReactElement;
}

/* Models a route with an Index attribute */
export interface IndexRoute extends BaseRoute {
	index: true;
}

/* Models a route with an explicitly set path */
export interface PathRoute extends BaseRoute {
	path: string;
	element: ReactElement;
}

/* Models a route that will be shown in the Navbar component */
export type NavRoute = (IndexRoute | PathRoute) & {
	label: string;
	showInNav: boolean;
}

/* Models a generic route */
export interface AppRoute extends BaseRoute {
	path: string;
	children?: (IndexRoute | PathRoute | NavRoute)[];
}

/* Project metadata necessary to be displayed on a Card component */
export interface ProjectData {
	coverimage: string; // for import.meta.glob
	title: string
	description: string;
	technologies: string[]; // tag component
	path: string; // page route where it will be
	element: ReactElement,
}

/* Metadata for a Technology Tag */
export interface Technology {
	name: string;
	icon: SVGElement;
}

/* File uploader properties for handling various events and attributes */
export interface FileUploaderProps {
	onSingleFileSelect: (file: File) => void;
	accept: string;
	multiple?: boolean;
}
