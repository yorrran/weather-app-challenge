import type { FC } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { useRoutes } from "react-router-dom";

import Home from "@/pages/Home";
import LayoutPage from "@/components/Layout";
import SearchHistory from "@/pages/SearchHistory";

// import WrapperRouteComponent from './config';

// const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));

const routeList: RouteObject[] = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "",
        element: <Navigate to="home" />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "search-history",
        element: <SearchHistory />
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
