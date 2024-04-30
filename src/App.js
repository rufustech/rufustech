import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog'
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <div >
     
      <BrowserRouter>
      
      <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact/>} />

      </Routes> 
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
