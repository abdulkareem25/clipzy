import { createBrowserRouter } from 'react-router';
import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import Feed from './features/post/pages/Feed';
import Landing from './pages/Landing';

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignIn />
  }, {
    path: '/signup',
    element: <SignUp />
  }, {
    path: '/',
    element: <Landing />
  }, {
    path: '/feed',
    element: <Feed />
  }
]);