import {
  createRouter,
  defaultParseSearch,
  defaultStringifySearch,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  // defaultStringifySearch,
  // defaultParseSearch,
});

export default function App() {
  return <RouterProvider router={router} />;
}
