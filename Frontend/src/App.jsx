import { RouterProvider } from 'react-router'
import { router } from './AppRoutes'
import './features/shared/styles/global.scss'
import { AuthProvider } from './features/auth/contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App