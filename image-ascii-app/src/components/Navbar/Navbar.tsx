import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

type NavLink = {
	path: string;
	label: string;
}

type NavProps = {
	links: NavLink[];
}

const Navbar = ({links}: NavProps) => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				{ links.map((link) => (<Link className={styles.links} key={link.path} to={link.path} >{link.label}</Link>)) }
			</div>
		</nav>
	)
}

export default Navbar;
