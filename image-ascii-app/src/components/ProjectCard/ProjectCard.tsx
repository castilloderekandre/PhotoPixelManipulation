import clsx from 'clsx';
import styles from './ProjectCard.module.css';
import type { ProjectData as ProjectData } from '../../utilities/types';
import { useNavigate } from 'react-router-dom';

interface Props extends ProjectData, Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {}

const Card = ({coverimage, title, description, technologies, className, path}: Props) => {
	const navigate = useNavigate();

	return (
		<div className={clsx(styles.root, className)} onClick={() => navigate(path)}>
			<img className={styles.image} src={coverimage} />
			<div className={styles.info}>
				<h1>{title}</h1>
				<p className={styles.text}>
					{description}
				</p>
			</div>
			<div>{technologies}</div>
		</div>
	); 
};

export default Card;
