//import './App.css'
import Navbar from './components/Navbar/Navbar';
import { navLinks } from './routes';

function App() {

  return (
    <div>
		<Navbar links={navLinks} />
    </div>
  )
}

export default App
