import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from "react-router-dom";
import { AuthURLs } from "./constants/Auth.paths";
import LoadingPage from "./pages/LoadingPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/loading-page" element={<LoadingPage />} />
      <Route path="/" loader={() => redirect(AuthURLs.login)} />
    </>,
  ),
);
