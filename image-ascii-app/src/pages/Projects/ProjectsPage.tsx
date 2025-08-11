import styles from './ProjectsPage.module.css';
import { projectMetaObjects } from '../../assets/projects/projectMetadataObjects';
import ProjectCardGrid from '../../components/ProjectCardGrid/ProjectCardGrid';

export default function ProjectsPage() {
	return (
		<div className={styles.root}>
				<ProjectCardGrid projectMetaObjects={projectMetaObjects} cols={3} />
		</div>
	);
}
