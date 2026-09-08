import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { medidaSchema, type MedidaFormData } from './medidaSchema';

type MedidaFormInput = z.input<typeof medidaSchema>;

type MedidaFormModalProps = {
  onCancel: () => void;
  onSubmit: (data: MedidaFormData) => Promise<void>;
};

const campos: { name: keyof MedidaFormInput; label: string; sufixo: string }[] = [
  { name: 'busto', label: 'Busto', sufixo: 'cm' },
  { name: 'quadril', label: 'Quadril', sufixo: 'cm' },
  { name: 'torax', label: 'Tórax', sufixo: 'cm' },
  { name: 'coxa', label: 'Coxa', sufixo: 'cm' },
  { name: 'cintura', label: 'Cintura', sufixo: 'cm' },
  { name: 'calcado', label: 'Calçado', sufixo: 'BR' },
];

export function MedidaFormModal({ onCancel, onSubmit }: MedidaFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MedidaFormInput, undefined, MedidaFormData>({
    resolver: zodResolver(medidaSchema),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative bg-white-bg rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-sans font-semibold text-tertiary-900 mb-4">
          Cadastrar Medidas
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {campos.map(({ name, label, sufixo }) => (
              <div key={name} className="space-y-1">
                <label htmlFor={name} className="block text-sm font-medium text-tertiary-900">
                  {label}
                </label>
                <div className="relative">
                  <input
                    id={name}
                    type="text"
                    inputMode="decimal"
                    {...register(name)}
                    className="w-full rounded-md border border-tertiary-700/25 pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-tertiary-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-tertiary-500">
                    {sufixo}
                  </span>
                </div>
                {errors[name] && (
                  <p className="text-xs text-error">{errors[name]?.message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 rounded-md border border-tertiary-300 text-sm text-tertiary-700 hover:bg-tertiary-700/10 transition-colors cursor-pointer font-heading"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-md bg-tertiary-700 hover:bg-tertiary-900 text-white text-sm font-heading disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}