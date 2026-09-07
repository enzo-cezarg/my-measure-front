import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MobileMenu } from '../components/MobileMenu';

export function AppLayout() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-primary">
      <Navbar onMenuClick={() => setMenuAberto(true)} />
      <MobileMenu aberto={menuAberto} onClose={() => setMenuAberto(false)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 m-2 ml-0 bg-white-bg rounded-lg drop-shadow-sm overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}