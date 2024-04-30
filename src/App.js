import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Login';
import { useEffect } from 'react';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  // Redirect to URL without trailing slash if necessary
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      navigate(location.pathname.slice(0, -1));
    }
  }, [location.pathname, navigate]);

  // Render header conditionally
  const renderHeader = () => {
    if (isLoginPage) {
      return null; // Omit header from login page
    }
    return <Header />;
  };

  // Render footer conditionally
  const renderFooter = () => {
    if (isLoginPage) {
      return null; // Omit footer from login page
    }
    return <Footer />;
  };

  return (
    <div>
      {renderHeader()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {renderFooter()}
    </div>
  );
}

export default App;
