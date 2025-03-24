import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import RegistrationSuccess from './components/auth/RegistrationSuccess';

// Add this import
import TryOnPage from './pages/TryOnPage';

const theme = {
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#808080',
    background: '#f5f5f5',
    success: '#4CAF50',
    error: '#f44336',
    warning: '#ff9800'
  },
  fonts: {
    main: "'Helvetica Neue', sans-serif"
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  },
  transitions: {
    ease: 'all 0.3s ease',
    smooth: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <AppContainer>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  <Route path="/shop" element={<Layout><Shop /></Layout>} />
                  <Route path="/product/:id" element={<Layout><ProductDetails /></Layout>} />
                  <Route path="/cart" element={<Layout><Cart /></Layout>} />
                  <Route path="/men" element={<Layout><Men /></Layout>} />
                  <Route path="/women" element={<Layout><Women /></Layout>} />
                  <Route path="/kids" element={<Layout><Kids /></Layout>} />
                  <Route path="/try-on" element={<Layout><TryOnPage /></Layout>} />
                  <Route path="/login" element={<Layout><Login /></Layout>} />
                  <Route path="/register" element={<Layout><Register /></Layout>} />
                  <Route path="/registration-success" element={<Layout><RegistrationSuccess /></Layout>} />
                  <Route path="/profile" element={<Layout><Profile /></Layout>} />
                </Routes>
                {/* Remove Footer from here since it's already in Layout */}
                <ToastContainer />
              </AppContainer>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
