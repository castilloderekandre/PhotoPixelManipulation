import clsx from 'clsx';
import styles from './ProjectCard.module.css';
import type { ProjectCardMeta } from '../../api/types';

interface Props extends ProjectCardMeta, React.HTMLAttributes<HTMLDivElement> {}

const ProjectCard = ({coverimage, projectTitle, description, technologies, className}: Props) => {
	return (
		<div className={clsx(styles.root, className)}>
			<img className={styles.image} src={coverimage} />
			<h1>{projectTitle}</h1>
			<p className={styles.text}>
				{description}
			</p>
			<div>{technologies}</div>
		</div>
	); 
};

export default ProjectCard;
