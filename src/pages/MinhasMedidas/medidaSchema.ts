import { z } from 'zod';

const numeroObrigatorio = z.coerce
  .number({ error: 'Preencha todos os campos' })
  .positive('Preencha todos os campos');

export const medidaSchema = z.object({
  busto: numeroObrigatorio,
  torax: numeroObrigatorio,
  cintura: numeroObrigatorio,
  quadril: numeroObrigatorio,
  coxa: numeroObrigatorio,
  calcado: numeroObrigatorio,
});

export type MedidaFormData = z.infer<typeof medidaSchema>;