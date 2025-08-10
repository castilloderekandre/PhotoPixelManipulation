import type { ProjectCardMeta } from "../../api/types";
const path = '../images/';
const images: Record<string, { default: string}> = import.meta.glob('../images/*', { eager: true, query: '?url' });

const projectMetadata = [
	{
		imageKey: `${path}ASCII.png`,
		description: "Image to ASCII"
	},
	{
		imageKey: `${path}MotionController.jpg`,
		description: "Motion controller utilitzing PIC18F4550 & MPU-6050"
	},
]

export const projectMetaObjects: ProjectCardMeta[] = projectMetadata.map((projectMetaObject) => 
	{
		return {
			coverimage: images[projectMetaObject.imageKey].default,
			description: projectMetaObject.description
		}
	});
