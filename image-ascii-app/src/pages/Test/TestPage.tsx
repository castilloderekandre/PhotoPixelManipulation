import clsx from "clsx";
import styles from './TestPage.module.css';

export default function TestPage() {
	return (
		<div className={clsx(styles.root)} >
			<div className={clsx(styles.child1)}>
				A
			</div>
			<div>
				B
			</div>
		</div>
	);
}
