import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { Suspense } from 'react';

// import Homepage from './pages/Homepage';
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Before Lazy Loading
// dist/assets/index-a9ec642d.css   30.25 kB │ gzip:   5.05 kB
// dist/assets/index-524a9d84.js   508.22 kB │ gzip: 148.46 kB

// After Lazy Loading
// dist/index.html                           0.45 kB │ gzip:   0.28 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-c6f6e207.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-4ac3e173.css           26.58 kB │ gzip:   4.38 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-c3a06961.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-2eb14492.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-1a07f6c4.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-da11e1b5.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-cee21cd9.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-aa627f6e.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-f76ba2f8.js             1.03 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-e83f2359.js       156.05 kB │ gzip:  45.94 kB
// dist/assets/index-ebe61e10.js           350.63 kB │ gzip: 101.98 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
