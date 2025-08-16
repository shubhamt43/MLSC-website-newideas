import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './utils/constants';
import Root from './pages/Root';

// 👇 import your TeamAssemble component
import TeamAssemble from './components/TeamAssemble';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      ...routes.map(route => ({ path: route.path, element: route.element })),
      {
        path: 'teamassemble',   // 👈 new route
        element: <TeamAssemble />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
