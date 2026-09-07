import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { Cadastro } from './pages/Cadastro/Cadastro';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { AppLayout } from './layouts/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { MinhasMedidas } from './pages/MinhasMedidas/MinhasMedidas';
import { Configuracoes } from './pages/Configuracoes/Configuracoes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/medidas" element={<MinhasMedidas />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;