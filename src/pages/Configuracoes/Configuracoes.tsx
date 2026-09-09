import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2 } from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../hooks/useAuth';

export function Configuracoes() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [excluindo, setExcluindo] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  async function handleExcluirConta() {
    const confirmado = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.',
    );

    if (!confirmado) return;

    setExcluindo(true);
    try {
      await api.delete('/users/me');
      await logout();
      navigate('/login');
    } catch {
      setExcluindo(false);
    }
  }

  return (
    <div>
      <p className="text-sm text-tertiary-500">Configurações</p>

      <div className="flex flex-col items-center mt-12 gap-2">
        <button
          onClick={handleLogout}
          className="w-full max-w-xs flex items-center justify-center gap-2 bg-tertiary-700 hover:bg-tertiary-900 text-white text-sm font-heading font-medium px-4 py-2.5 rounded-md transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Sair
        </button>

        <div className="w-full max-w-72 mx-auto m-2 h-0.5 bg-tertiary-500/50"></div>

        <button
          onClick={handleExcluirConta}
          disabled={excluindo}
          className="w-full max-w-xs flex items-center justify-center gap-2 bg-error hover:bg-red-700 text-white text-sm font-heading font-medium px-4 py-2.5 rounded-md disabled:opacity-50 transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
          {excluindo ? 'Excluindo...' : 'Excluir Conta'}
        </button>

        <p className="text-center text-xs text-tertiary-500 mt-2">
          MyMeasure por Enzo Garcia
          <br />
          Disciplina Integradora de Projetos | PUCRS
        </p>
      </div>
    </div>
  );
}