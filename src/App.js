import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog'
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';

function App() {
  return (
    <div >
      <Header />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact/>} />

      </Routes> 
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
