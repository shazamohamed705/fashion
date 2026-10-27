import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FlyAnimLayer from '../cart/FlyAnimLayer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <FlyAnimLayer />
      <main className="flex-grow overflow-x-hidden flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
