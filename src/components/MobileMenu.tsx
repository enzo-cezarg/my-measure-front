import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Ruler, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const links = [
  { to: '/dashboard', label: 'Página Inicial', icon: Home },
  { to: '/medidas', label: 'Minhas Medidas', icon: Ruler },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

type MobileMenuProps = {
  aberto: boolean;
  onClose: () => void;
};

export function MobileMenu({ aberto, onClose }: MobileMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="absolute top-0 left-0 h-full w-64 bg-white-bg shadow-lg flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-tertiary-200">
          <span className="font-heading text-lg text-tertiary-900">Menu</span>
          <button onClick={onClose} aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>

        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-sm font-medium ${isActive ? 'bg-primary/10 text-tertiary-900' : 'text-tertiary-500'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-error cursor-pointer mt-auto border-t border-tertiary-200"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </div>
  );
}