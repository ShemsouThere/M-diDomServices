import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home.jsx';
import Services from './component/Services.jsx';
import Rendezvous from './component/Rendezvous.jsx';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';


function App2() {
return (
<>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/services" element={<Services />} />
<Route path="/rendezvous" element={<Rendezvous />} />
</Routes>
<Footer />
</>
);
}

export default App2;