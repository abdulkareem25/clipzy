import { RouterProvider } from 'react-router'
import { router } from './AppRoutes'
import './features/shared/styles/global.scss'

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App