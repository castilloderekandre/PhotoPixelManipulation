import clsx from 'clsx';
import styles from './ProjectCardGrid.module.css';
import ProjectCard from "../ProjectCard/ProjectCard";
import type { ProjectCardMeta } from "../../api/types";

interface Props {
	projectMetaObjects: ProjectCardMeta[];
	cols: 1 | 2 | 3 | 4 | 5 | 6;
}

const ProjectCardGrid = ({projectMetaObjects, cols}: Props) => {
	const gridCols = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
	}

	const gridSpan = {
		1: 'col-span-1',
		2: 'col-span-2',
		3: 'col-span-3',
		4: 'col-span-4',
		5: 'col-span-5',
		6: 'col-span-6',
	}

	return (
		<div className={clsx(styles.root, gridCols[cols])}>
			{projectMetaObjects.map((projectMetaObject: ProjectCardMeta, index: number) => {
				const itemsLeft = 3 - ((index % cols) + 1);
				const lastItem = (index == projectMetaObjects.length - 1);
				return (<ProjectCard
					className={lastItem && gridSpan[itemsLeft + 1]}
					coverimage={projectMetaObject.coverimage}
					title={projectMetaObject.title}
					description={projectMetaObject.description}
					technologies={projectMetaObject.technologies} 
					path={projectMetaObject.path}
				/>);
			})}
		</div>
	);
}

export default ProjectCardGrid;
