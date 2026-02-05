import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/sections/Footer';
import { HomePage } from '@/pages/HomePage';
import { CarDetailsPage } from '@/pages/CarDetailsPage';
import { BrowsePage } from '@/pages/BrowsePage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { SellPage } from '@/pages/SellPage';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ROUTES } from '@/constants';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="relative min-h-screen bg-charcoal">
            {/* Atmospheric background mesh */}
            <div className="fixed inset-0 mesh-gradient opacity-30 pointer-events-none z-0" />
            
            {/* Grain Overlay */}
            <div className="grain-overlay" />

            {/* Header */}
            <Header />

            {/* Main Content */}
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.BROWSE} element={<BrowsePage />} />
              <Route path={ROUTES.CAR_DETAILS} element={<CarDetailsPage />} />
              <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorksPage />} />
              <Route path={ROUTES.SELL} element={<SellPage />} />
              {/* Add more routes as needed */}
            </Routes>

            {/* Footer */}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
