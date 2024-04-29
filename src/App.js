import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog'
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Footer /> {/* Render Footer outside of AppContent */}
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  // Render header conditionally
  const renderHeader = () => {
    if (isLoginPage) {
      return null; // Omit header from login page
    }
    return <Header />;
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
    </div>
  );
}

export default App;
