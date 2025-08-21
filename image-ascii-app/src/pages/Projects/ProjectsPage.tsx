import styles from './ProjectsPage.module.css';
import { projectMetaObjects } from '../../assets/projects/projectMetadata';
import CardGrid from '../../components/ProjectCardGrid/ProjectCardGrid';

export default function ProjectsPage() {
	return (
		<div className={styles.root}>
				<CardGrid projectMetaObjects={projectMetaObjects} cols={3} />
		</div>
	);
}
