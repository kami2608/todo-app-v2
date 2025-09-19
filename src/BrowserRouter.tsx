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

const Signup = lazy(() => import("./pages/signup/Signup"));
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/main/home/Home"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/loading-page" element={<LoadingPage />} />
      <Route path="/" loader={() => redirect(AuthURLs.login)} />
      <Route
        path={AppURLs.home}
        element={
          <Suspense fallback={<LoadingPage />}>
            <Navbar>
              <Home />
            </Navbar>
          </Suspense>
        }
      >
        <Route
          path={AppURLs.detailTodo}
          element={
            <Suspense fallback={<LoadingPage />}>
              <p>Detail todo</p>
            </Suspense>
          }
        />
      </Route>

      <Route
        path={AuthURLs.login}
        element={
          <Suspense fallback={<LoadingPage />}>
            <Login />
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
