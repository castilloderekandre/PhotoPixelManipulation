// [TODO] Use IDs instead of named paths for scalability

import type { ReactElement } from "react";
import type { ProjectCardMeta } from "../../api/types";
const path = '../images/';
const images: Record<string, { default: string}> = import.meta.glob('../images/*', { eager: true, query: '?url' });
import ASCIIPage from "../../pages/Projects/ASCIIPage";
import MotionControllerPage from "../../pages/Projects/MotionControllerPage";

interface ProjectData {
	imageKey: string; // for import.meta.glob
	title: string
	description: string;
	technologies: string[]; // tag component
	path: string; // page route where it will be
	element: ReactElement,
}

const projectData: ProjectData[] = [
	{
		imageKey: `${path}ASCII.png`,
		title: 'ASCII Art Generator',
		description: "Image to ASCII",
		technologies: [ 'TypeScript', 'Image Processing' ],
		path: '/ascii',
		element: <ASCIIPage />,
	},
	{
		imageKey: `${path}MotionController.jpg`,
		title: 'Motion Controller',
		description: 'Motion controller utilitzing PIC18F4550 & MPU-6050',
		technologies: [ 'Electronics', 'PIC18F4550', 'MPU-6050' ],
		path: '/motioncontroller' ,
		element: <MotionControllerPage />
	},
	// {
	// 	imageKey: `${path}test1.png`,
	// 	title: 'Arch Linux (Hyprland) & Windows Hybrid Laptop Setup (NVIDIA)',
	// 	description: '',
	// 	technologies: [ 'Linux', 'Windows', 'PRIME NVIDIA', 'Hyprland' ],
	// 	path: 'archlinux'
	// },
	// {
	// 	imageKey: `${path}test2.jpg`,
	// 	title: 'Ubuntu Server',
	// 	description: '',
	// 	technologies: [ 'Home Lab', 'Ubuntu Server', 'SSH', 'Docker' ],
	// 	path: 'ubuntuserver'
	// },
	// {
	// 	imageKey: `${path}test1.png`,
	// 	title: 'Spotify Clone',
	// 	description: '',
	// 	technologies: [ '.NET Core', 'C#', 'MySQL', 'XAMPP' ],
	// 	path: 'spotifyclone'
	// },
	// {
	// 	imageKey: `${path}test1.png`,
	// 	title: 'Egg Incubator',
	// 	description: '',
	// 	technologies: [ 'Electronics', 'Arduino', 'Optocoupler' ],
	// 	path: 'eggincubator'
	// },
	// {
	// 	imageKey: `${path}test1.png`,
	// 	title: 'Simple Power Supply',
	// 	description: '',
	// 	technologies: [ 'Electronics' ],
	// 	path: 'powersupplysimple'
	// },
	// {
	// 	imageKey: `${path}test1.png`,
	// 	title: 'Fan Control on Linux',
	// 	description: '',
	// 	technologies: [ 'Linux', 'Windows', 'ACPI', 'Embedded Controller' ],
	// 	path: 'fancontrollinux'
	// },
	// {
	// 	imageKey: `${path}test1.png`,
	// 	title: 'School Environment Lab (Packet Tracer)',
	// 	description: '',
	// 	technologies: [ 'Networking', 'VLAN', 'Switch', 'Routing', 'Cisco Packet Tracer' ],
	// 	path: 'schoolpackettracerlab'
	// },
]

export const projectMetaObjects: ProjectCardMeta[] = projectData.map((projectMetaObject) => 
	{
		return {
			coverimage: images[projectMetaObject.imageKey].default,
			title: projectMetaObject.title,
			description: projectMetaObject.description,
			technologies: projectMetaObject.technologies,
			path: '/projects' + projectMetaObject.path,
			element: projectMetaObject.element,
		}
	});
