import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type NavbarProps = {
  onMenuClick: () => void;
};

export function Navbar({ onMenuClick }: NavbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header className="bg-tertiary-900 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden cursor-pointer hover:scale-110 transition" aria-label="Abrir menu">
          <Menu size={24} />
        </button>

        <div className='max-w-32 mt-1'>
          <img src="./logo-white.svg" alt="MyMeasure" />
        </div>

      </div>

      <button
        onClick={handleLogout}
        className="hidden md:flex items-center gap-2 bg-tertiary-500 hover:bg-tertiary-500/80 px-4 py-3 rounded-md text-sm transition-colors cursor-pointer"
      >
        <LogOut size={16} />
        Sair
      </button>
    </header>
  );
}