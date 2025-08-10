import styles from './ProjectCard.module.css';
import type { ProjectCardMeta } from '../../api/types';

const ProjectCard = ({coverimage, description}: ProjectCardMeta) => {
	return (
		<div className={styles.root}>
			<img className={styles.image} src={coverimage} />
			<p className={styles.text}>
				{description}
			</p>
		</div>
	); 
};

export default ProjectCard;
