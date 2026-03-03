import { createBrowserRouter } from 'react-router';
import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignIn />
  }, {
    path: '/signup',
    element: <SignUp />
  }, {
    path: '/',
    element: <main>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </main> 
  }
]);