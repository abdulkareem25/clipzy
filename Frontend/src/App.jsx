import AppRoutes from './AppRoutes'
import { AuthProvider } from './features/auth/services/auth.context.jsx'

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
};

export default App