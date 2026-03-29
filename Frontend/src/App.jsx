import { RouterProvider } from 'react-router'
import { router } from './AppRoutes'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import { PostProvider } from './features/post/contexts/PostContext'
import { ProfileProvider } from './features/profile/contexts/ProfileContext'
import './features/shared/styles/global.scss'

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </PostProvider>
    </AuthProvider>
  )
}

export default App