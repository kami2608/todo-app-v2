import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from "react-router-dom";
import { AuthURLs } from "./constants/Auth.paths";
import LoadingPage from "./pages/LoadingPage";
import { lazy, Suspense } from "react";
import Navbar from "./components/navbar/Navbar";
import { AppURLs } from "./constants/App.paths";
import AuthProvider from "./components/authentication/AuthProvider";

const Signup = lazy(() => import("./pages/signup/Signup"));
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/main/home/Home"));
const DetailTodo = lazy(() => import("./pages/main/detail/DetailTodo"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/loading-page" element={<LoadingPage />} />
      <Route path="/" loader={() => redirect(AuthURLs.login)} />
      <Route
        path={AppURLs.home}
        element={
          <Suspense fallback={<LoadingPage />}>
            <AuthProvider>
              <Navbar>
                <Home />
              </Navbar>
            </AuthProvider>
          </Suspense>
        }
      >
        <Route
          path={AppURLs.detailTodo}
          element={
            <Suspense fallback={<LoadingPage />}>
              <AuthProvider>
                <Navbar>
                  <DetailTodo />
                </Navbar>
              </AuthProvider>
            </Suspense>
          }
        />
      </Route>

      <Route
        path={AuthURLs.login}
        element={
          <Suspense fallback={<LoadingPage />}>
            <AuthProvider>
              <Login />
            </AuthProvider>
          </Suspense>
        }
      />
      <Route
        path={AuthURLs.signup}
        element={
          <Suspense fallback={<LoadingPage />}>
            <Signup />
          </Suspense>
        }
      />
    </>,
  ),
);
