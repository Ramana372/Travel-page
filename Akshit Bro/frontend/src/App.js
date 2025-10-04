import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Places from './Components/Pages/Places';
import ExpertHistory from './Components/Pages/ExpertHistory';
import LoginRegister from './Components/Pages/LoginRegister';
import PlaceDetail from './Components/Pages/PlaceDetail';
import Profile from './Components/Pages/Profile';
import './App.css';

// Root layout keeps Navbar persistent across routes
const RootLayout = () => (
  <div className="App">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // { index: true, element: <Home /> },
        { path: '/', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'places', element: <Places /> },
        { path: 'places/:id', element: <PlaceDetail /> },
        { path: 'expert', element: <ExpertHistory /> },
        { path: 'login', element: <LoginRegister /> },
        { path: 'profile', element: <Profile /> },
      ],
    },
  ],
 {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
