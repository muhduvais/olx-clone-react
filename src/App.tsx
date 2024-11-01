import { FC } from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Sell from './pages/Sell';
import ItemDetails from './pages/ItemDetails';

const App: FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/details/:itemId" element={<ItemDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;