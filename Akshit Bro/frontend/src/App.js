import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ScrollToTop from './Components/ScrollToTop';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Places from './Components/Pages/Places';
import ExpertHistory from './Components/Pages/ExpertHistory';
import LoginRegister from './Components/Pages/LoginRegister';
import PlaceDetail from './Components/Pages/PlaceDetail';
import Profile from './Components/Pages/Profile';
import Blog from './Components/Pages/Blog';
import BlogDetail from './Components/Pages/BlogDetail';
import Contact from './Components/Pages/Contact';
import FAQ from './Components/Pages/FAQ';
import ForgotPassword from './Components/Pages/ForgotPassword';
import ResetPassword from './Components/Pages/ResetPassword';

// 404 Error Page Component
const NotFound = () => (
  <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center text-center p-8">
    <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500 mb-4">404</h1>
    <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
    <p className="text-gray-400 mb-8 text-lg">The page you're looking for doesn't exist.</p>
    <a href="/" className="px-8 py-3 bg-gradient-purple text-white rounded-lg font-bold hover:opacity-90 transition-opacity">
      Go Home
    </a>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 text-white py-16 px-8">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Travel Explorer</h3>
        <p className="text-gray-400 leading-relaxed">
          Discover amazing destinations with comprehensive guides, stunning photography, and expert insights for unforgettable journeys.
        </p>
      </div>
      
      <div>
        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link to="/" className="text-gray-300 hover:text-accent-brown transition-colors">Home</Link></li>
          <li><Link to="/places" className="text-gray-300 hover:text-accent-brown transition-colors">Destinations</Link></li>
          <li><Link to="/blog" className="text-gray-300 hover:text-accent-brown transition-colors">Blog</Link></li>
          <li><Link to="/about" className="text-gray-300 hover:text-accent-brown transition-colors">About</Link></li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-bold text-white mb-4">Support</h4>
        <ul className="space-y-2">
          <li><Link to="/contact" className="text-gray-300 hover:text-accent-brown transition-colors">Contact Us</Link></li>
          <li><Link to="/faq" className="text-gray-300 hover:text-accent-brown transition-colors">FAQ</Link></li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-lg font-bold text-white mb-4">Connect With Us</h4>
        <div className="flex gap-4 text-2xl">
          <a href="#" className="text-gray-400 hover:text-accent-brown transition-colors">📘</a>
          <a href="#" className="text-gray-400 hover:text-accent-brown transition-colors">📷</a>
          <a href="#" className="text-gray-400 hover:text-accent-brown transition-colors">🐦</a>
          <a href="#" className="text-gray-400 hover:text-accent-brown transition-colors">📧</a>
        </div>
      </div>
    </div>
    
    <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-400">
      <p>© 2025 Travel Explorer. All rights reserved.</p>
    </div>
  </footer>
);

// Root layout keeps Navbar persistent across routes
const RootLayout = () => (
  <div className="App flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <RootLayout><NotFound /></RootLayout>,
      children: [
        { path: '/', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'places', element: <Places /> },
        { path: 'places/:id', element: <PlaceDetail /> },
        { path: 'expert', element: <ExpertHistory /> },
        { path: 'login', element: <LoginRegister /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
        { path: 'reset-password/:token', element: <ResetPassword /> },
        { path: 'profile', element: <Profile /> },
        { path: 'blog', element: <Blog /> },
        { path: 'blog/:id', element: <BlogDetail /> },
        { path: 'contact', element: <Contact /> },
        { path: 'faq', element: <FAQ /> },
        { path: '*', element: <NotFound /> }
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
