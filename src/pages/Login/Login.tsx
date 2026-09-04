import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { api } from '../../api/client';
import { loginSchema, type LoginFormData } from './loginSchema';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [erroApi, setErroApi] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    setErroApi(null);

    try {
      await api.post('/auth/login', data);
      navigate('/dashboard');
    } catch (err) {
      const mensagem =
        err instanceof AxiosError
          ? (err.response?.data?.message ?? 'Erro ao fazer login')
          : 'Erro ao fazer login';

      setErroApi(mensagem);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white px-12 py-16 rounded-lg shadow-md space-y-4"
      >

        <center>
          <img src='/logo-black.svg' alt='MyMeasure' className='h-16 w-auto'></img>
        </center>

        <div className="space-y-2 pt-4">
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
          <label htmlFor="senha" className="block text-md font-medium text-tertiary-900">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            {...register('password')}
            className="w-full rounded-md border-2 border-tertiary-700 px-3 py-2.5 text-sm focus:outline-none"
          />
          {errors.password && (
            <p className="text-sm text-error">{errors.password.message}</p>
          )}
        </div>

        {erroApi && (
          <p role="alert" className="text-sm text-error">
            {erroApi}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-tertiary-700 px-4 py-3 my-4 text-md font-medium text-white hover:bg-tertiary-900 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>

        <div className='max-w-72 mx-auto mt-2 h-0.5 bg-tertiary-500/50'></div>

        <p className="text-center text-md text-tertiary-500">
          Não possui uma conta?{' '}
          <Link to="/cadastro" className="text-tertiary-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}