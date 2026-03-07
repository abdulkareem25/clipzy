import { RouterProvider } from 'react-router'
import { router } from './AppRoutes'
import './features/shared/styles/global.scss'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import { PostProvider } from './features/post/contexts/PostContext'

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <RouterProvider router={router} />
      </PostProvider>
    </AuthProvider>
  )
}

export default App