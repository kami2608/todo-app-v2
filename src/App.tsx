import { RouterProvider } from "react-router-dom";
import { router } from "./BrowserRouter";

export default function App() {
  return <RouterProvider router={router} />;
}
