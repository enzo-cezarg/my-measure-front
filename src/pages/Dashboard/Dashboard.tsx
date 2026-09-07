import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ruler, Copy, Check } from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../hooks/useAuth';

type Medidas = {
  busto: number;
  torax: number;
  cintura: number;
  quadril: number;
  coxa: number;
  calcado: number;
  codigoAcesso: string;
};

export function Dashboard() {
  const { user } = useAuth();
  const [medidas, setMedidas] = useState<Medidas | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/medidas/me')
      .then((res) => setMedidas(res.data))
      .catch(() => setMedidas(null))
      .finally(() => setCarregando(false));
  }, []);

  function handleCopiar() {
    if (!medidas) return;
    navigator.clipboard.writeText(medidas.codigoAcesso);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div>
      <p className="text-sm text-tertiary-500">Página Inicial</p>
      <h1 className="text-xl font-semibold text-tertiary-900 mt-1">Olá, {user?.name}!</h1>

      <div className="bg-white border border-tertiary-200 rounded-lg mt-4 p-4">
        <p className="text-xs text-tertiary-500 mb-4">Dashboard</p>

        {carregando ? (
          <p className="text-center text-tertiary-500 py-12">Carregando...</p>
        ) : !medidas ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Ruler size={40} className="text-tertiary-700 -rotate-45" />
            <p className="text-sm text-tertiary-500">Sem medidas cadastradas.</p>
            <button
              onClick={() => navigate('/medidas')}
              className="bg-tertiary-900 hover:bg-tertiary-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
            >
              Cadastrar
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-64">
              <label className="text-xs text-tertiary-500 block mb-1">Código de acesso:</label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={medidas.codigoAcesso}
                  className="flex-1 bg-white border border-tertiary-300 rounded-md px-3 py-2 text-sm text-center"
                />
                <button
                  onClick={handleCopiar}
                  className="bg-tertiary-900 hover:bg-tertiary-700 text-white px-3 rounded-md transition-colors"
                  aria-label="Copiar código"
                >
                  {copiado ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
              <CampoMedida label="Busto" valor={`${medidas.busto} cm`} />
              <CampoMedida label="Quadril" valor={`${medidas.quadril} cm`} />
              <CampoMedida label="Tórax" valor={`${medidas.torax} cm`} />
              <CampoMedida label="Coxa" valor={`${medidas.coxa} cm`} />
              <CampoMedida label="Cintura" valor={`${medidas.cintura} cm`} />
              <CampoMedida label="Calçado" valor={`${medidas.calcado}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CampoMedida({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex justify-between bg-white border border-tertiary-200 rounded-md px-3 py-2 text-sm">
      <span className="text-tertiary-500">{label}:</span>
      <span className="text-tertiary-900 font-medium">{valor}</span>
    </div>
  );
}