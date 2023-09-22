import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CityData } from "./context/CityContext";
import { Auth } from "./context/Auth";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./pages/SpinnerFullPage";
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import CityList from "./pages/CityList";
import CountryList from "./pages/CountryList";
import City from "./pages/City";
import Form from "./pages/Form";
// import PageNotFound from "./pages/PageNotFound";

// import Nav from "./components/Nav";

function App() {
  return (
    <div>
      <Auth>
        <CityData>
          {/* <Nav /> */}
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="Products" element={<Product />} />
                <Route path="Pricing" element={<Pricing />} />
                <Route path="Login" element={<Login />} />
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
        </CityData>
      </Auth>
    </div>
  );
}

export default App;
