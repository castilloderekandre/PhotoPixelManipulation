import type { ProjectCardMeta } from "../../api/types";
const path = '../images/';
const images: Record<string, { default: string}> = import.meta.glob('../images/*', { eager: true, query: '?url' });

const projectMetadata = [
	{
		imageKey: `${path}ASCII.png`,
		projectTitle: 'ASCII Art Generator',
		description: "Image to ASCII",
		technologies: [ 'TypeScript', 'Image Processing' ],
	},
	{
		imageKey: `${path}MotionController.jpg`,
		projectTitle: 'Motion Controller',
		description: 'Motion controller utilitzing PIC18F4550 & MPU-6050',
		technologies: [ 'Electronics', 'PIC18F4550', 'MPU-6050' ],
	},
	{
		imageKey: `${path}test1.png`,
		projectTitle: 'Arch Linux (Hyprland) & Windows Hybrid Laptop Setup (NVIDIA)',
		description: '',
		technologies: [ 'Linux', 'Windows', 'PRIME NVIDIA', 'Hyprland' ]
	},
	{
		imageKey: `${path}test2.jpg`,
		projectTitle: 'Ubuntu Server',
		description: '',
		technologies: [ 'Home Lab', 'Ubuntu Server', 'SSH', 'Docker' ],
	},
	{
		imageKey: `${path}test1.png`,
		projectTitle: 'Spotify Clone',
		description: '',
		technologies: [ '.NET Core', 'C#', 'MySQL', 'XAMPP' ],
	},
	{
		imageKey: `${path}test1.png`,
		projectTitle: 'Egg Incubator',
		description: '',
		technologies: [ 'Electronics', 'Arduino', 'Optocoupler' ],
	},
	{
		imageKey: `${path}test1.png`,
		projectTitle: 'Power Supply',
		description: '',
		technologies: [ 'Electronics' ],
	},
	{
		imageKey: `${path}test1.png`,
		projectTitle: 'Fan Control on Linux',
		description: '',
		technologies: [ 'Linux', 'Windows', 'ACPI', 'Embedded Controller' ],
	},
	{
		imageKey: `${path}test1.png`,
		projectTitle: 'School Environment Lab (Packet Tracer)',
		description: '',
		technologies: [ 'Networking', 'VLAN', 'Switch', 'Routing', 'Cisco Packet Tracer' ],
	},
]

export const projectMetaObjects: ProjectCardMeta[] = projectMetadata.map((projectMetaObject) => 
	{
		return {
			coverimage: images[projectMetaObject.imageKey].default,
			projectTitle: projectMetaObject.projectTitle,
			description: projectMetaObject.description,
			technologies: projectMetaObject.technologies,
		}
	});
