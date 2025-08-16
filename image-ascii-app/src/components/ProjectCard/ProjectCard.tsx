import clsx from 'clsx';
import styles from './ProjectCard.module.css';
import type { ProjectCardMeta } from '../../api/types';
import { useNavigate } from 'react-router-dom';

interface Props extends ProjectCardMeta, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}

const ProjectCard = ({coverimage, title, description, technologies, className, path}: Props) => {
	const navigate = useNavigate();

	return (
		<div className={clsx(styles.root, className)} onClick={() => navigate(path)}>
			<img className={styles.image} src={coverimage} />
			<h1>{title}</h1>
			<p className={styles.text}>
				{description}
			</p>
			<div>{technologies}</div>
		</div>
	); 
};

export default ProjectCard;
