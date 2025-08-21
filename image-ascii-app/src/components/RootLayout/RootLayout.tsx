import Navbar from '../Navbar/Navbar';
import { navLinks } from '../../utilities/routes';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {

	return (
		<div>
			<Navbar links={navLinks} />
				<main>
					<Outlet />
				</main>
    	</div>
	);
}

