import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../../api/client';
import { MedidaFormModal } from './MedidaFormModal';
import type { MedidaFormData } from './medidaSchema';
import { useAuth } from '../../hooks/useAuth';

type Medidas = MedidaFormData & { codigoAcesso: string };

export function MinhasMedidas() {
  const [medidas, setMedidas] = useState<Medidas | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const { refreshUser } = useAuth();

  useEffect(() => {
    carregarMedidas();
  }, []);

  function carregarMedidas() {
    setCarregando(true);
    api
      .get('/medidas/me')
      .then((res) => setMedidas(res.data))
      .catch(() => setMedidas(null))
      .finally(() => setCarregando(false));
  }

  async function handleSalvar(data: MedidaFormData) {
    const res = await api.post('/medidas', data);
    setMedidas({ ...data, codigoAcesso: res.data.codigoAcesso });
    setModalAberto(false);
  }

  async function handleExcluir() {
    await refreshUser();
    await api.delete('/medidas/me');
    setMedidas(null);
  }

  return (
    <div>
      <p className="text-sm text-tertiary-500">Minhas Medidas</p>

      <div className="mt-4">
        {carregando ? (
          <p className="text-sm text-tertiary-500">Carregando...</p>
        ) : !medidas ? (
          <button
            onClick={() => setModalAberto(true)}
            className="w-full h-24 flex items-center justify-center rounded-lg border-2 border-secondary bg-secondary/25 hover:bg-secondary/35 cursor-pointer transition-colors"
          >
            <Plus size={32} className="text-secondary" />
          </button>
        ) : (
          <div className="relative bg-white border-2 border-tertiary-500 rounded-lg p-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-tertiary-700 mb-2">Medidas:</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-tertiary-700">
                <span>Busto: {medidas.busto} cm</span>
                <span>Quadril: {medidas.quadril} cm</span>
                <span>Tórax: {medidas.torax} cm</span>
                <span>Coxa: {medidas.coxa} cm</span>
                <span>Cintura: {medidas.cintura} cm</span>
                <span>Calçado: {medidas.calcado}</span>
              </div>
            </div>

            <button
              onClick={handleExcluir}
              aria-label="Excluir medidas"
              className="shrink-0 h-full aspect-square flex items-center justify-center bg-error hover:bg-red-700 cursor-pointer rounded-md text-white transition-colors p-3"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {modalAberto && (
        <MedidaFormModal onCancel={() => setModalAberto(false)} onSubmit={handleSalvar} />
      )}
    </div>
  );
}