import { NavLink } from 'react-router-dom';
import { Home, Ruler, Settings } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Página Inicial', icon: Home },
  { to: '/medidas', label: 'Minhas Medidas', icon: Ruler },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-56 p-1 bg-white-bg m-2 mr-0 rounded-lg drop-shadow-sm">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 mb-1 px-4 py-3 text-sm border-2 rounded-sm font-medium transition-colors ${isActive
              ? 'bg-primary/25 text-secondary transition-none'
              : 'text-tertiary-700 hover:bg-primary/25 border-white-bg'
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}