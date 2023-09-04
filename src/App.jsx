import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Suspense, lazy } from "react";

// lazy loading - optimization
const Home = lazy(() => import("./RoutingPages/HomePage"));
const Pricing = lazy(() => import("./RoutingPages/Pricing"));
const Products = lazy(() => import("./RoutingPages/Product"));
const Login = lazy(() => import("./RoutingPages/Login"));
const AppLayout = lazy(() => import("./RoutingPages/AppLayout"));
const PageNotFound = lazy(() => import("./RoutingPages/PageNotFound"));

// import Products from "./RoutingPages/Product";
// import Pricing from "./RoutingPages/Pricing";
// import Home from "./RoutingPages/HomePage";
// import PageNotFound from "./RoutingPages/PageNotFound";
// import AppLayout from "./RoutingPages/AppLayout";
// import Login from "./RoutingPages/Login";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";
import { ContextProvider } from "./CustomHooks/CitiesContext";
import { AuthProvider } from "./Components/FakeUserContext";
import { ProtectRoute } from "./RoutingPages/RouteProtecter";
import SpinnerFullPage from "./Components/SpinnerFullPage";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <ContextProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Home />}></Route>
                <Route path="products" element={<Products />}></Route>
                <Route path="pricing" element={<Pricing />}></Route>
                <Route
                  path="app"
                  element={
                    <ProtectRoute>
                      <AppLayout />
                    </ProtectRoute>
                  }
                >
                  <Route index element={<Navigate replace to={"cities"} />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ContextProvider>
      </AuthProvider>
    </div>
  );
}
