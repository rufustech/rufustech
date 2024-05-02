import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Blog from './pages/Blog'
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activation from './pages/Activation';
import Reset from './pages/Reset';

function App() {
  return (
    <div >
     
      <BrowserRouter>
      

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/activate/:uuid/:token" element={<Activation />} />

      </Routes> 
  
      </BrowserRouter>
      
    </div>
  );
}

export default App;
