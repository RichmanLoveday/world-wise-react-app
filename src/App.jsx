import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";

import CountryList from "./components/CountryList";
import Form from "./components/Form";
import City from "./components/City";
import CityList from "./components/CityList";
import SpinnerFullPage from "./components/SpinnerFullPage";

import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";
import "./index.css";

// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import PricingPage from "./pages/Pricing";
// import ProductPage from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// Implementing lazy loading
const HomePage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PricingPage = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const ProductPage = lazy(() => import("./pages/Product"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<ProductPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
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
