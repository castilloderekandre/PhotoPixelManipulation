import styles from './ProjectsPage.module.css';
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projectMetaObjects } from '../../assets/projects/projectMetadataObjects';
import type { ProjectCardMeta } from '../../api/types';

export default function ProjectsPage() {
	return (
		<div className={styles.root}>
			{
				projectMetaObjects.map((projectMetaObject: ProjectCardMeta) => {
					return (<ProjectCard coverimage={projectMetaObject.coverimage} description={projectMetaObject.description} />);
				})
			}
		</div>
	);
}
