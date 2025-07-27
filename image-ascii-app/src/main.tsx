import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes.tsx';

const router = createBrowserRouter(appRoutes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<RouterProvider router={router} />
  </StrictMode>,
)
