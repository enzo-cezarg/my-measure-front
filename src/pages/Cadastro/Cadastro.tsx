import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { api } from '../../api/client';
import { cadastroSchema, type CadastroFormData } from './cadastroSchema';

export function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  const [erroApi, setErroApi] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const senhasConferem =
    password && confirmPassword && password === confirmPassword;

  async function onSubmit(data: CadastroFormData) {
    setErroApi(null);

    const cadastroDto = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    try {
      await api.post('/auth/register', cadastroDto);
      setSucesso(true);
    } catch (err) {
      const mensagem =
        err instanceof AxiosError
          ? (err.response?.data?.message ?? 'Erro ao realizar cadastro')
          : 'Erro ao realizar cadastro';

      setErroApi(mensagem);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md bg-white-bg px-12 py-16 rounded-lg shadow-md space-y-4">

        <center>
          <img src="/logo-black.svg" alt="MyMeasure" className="h-16 w-auto" />
        </center>

        {sucesso ? (
          <div className="space-y-4 pt-4 text-center">
            <p className="text-md text-tertiary-900 font-medium">
              Cadastro realizado com sucesso!
            </p>
            <p className="text-sm text-tertiary-500">
              Enviamos um e-mail de confirmação. Você já pode fazer login.
            </p>
            <Link
              to="/login"
              className="inline-block w-full rounded-md bg-tertiary-700 px-4 py-3 mt-2 text-md font-medium text-white hover:bg-tertiary-900 transition-colors"
            >
              Ir para o login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 pt-4">
              <label htmlFor="name" className="block text-md font-medium text-tertiary-900">
                Nome
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full rounded-md border-2 border-tertiary-700 px-3 py-2.5 text-sm focus:outline-none"
              />
              {errors.name && (
                <p className="text-sm text-error">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-md font-medium text-tertiary-900">
                Endereço de e-mail
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full rounded-md border-2 border-tertiary-700 px-3 py-2.5 text-sm focus:outline-none"
              />
              {errors.email && (
                <p className="text-sm text-error">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-md font-medium text-tertiary-900">
                Senha
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full rounded-md border-2 border-tertiary-700 px-3 py-2.5 text-sm focus:outline-none"
              />
              {errors.password && (
                <p className="text-sm text-error">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-md font-medium text-tertiary-900">
                Confirme a senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="w-full rounded-md border-2 border-tertiary-700 px-3 py-2.5 text-sm focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {erroApi && (
              <p role="alert" className="text-sm text-error">
                {erroApi}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !senhasConferem}
              className="w-full rounded-md bg-tertiary-700 px-4 py-3 my-4 text-md font-medium text-white hover:bg-tertiary-900 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <div className="max-w-72 mx-auto mt-2 h-0.5 bg-tertiary-500/50"></div>

            <p className="text-center text-md text-tertiary-500">
              Já possui uma conta?{' '}
              <Link to="/login" className="text-tertiary-700 hover:underline">
                Fazer login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}