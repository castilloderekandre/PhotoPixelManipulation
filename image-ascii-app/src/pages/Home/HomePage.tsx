import clsx from 'clsx';
import styles from './HomePage.module.css';

export default function HomePage() {
	return (
		<div>
			<section className={clsx(styles['name-container'])}>
				<h1>Derek Castillo</h1>
			</section>
		</div>
	);
}
