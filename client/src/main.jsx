import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { Recommended } from "./Recommended";
import { Saved } from "./Saved";
import { Search } from "./Search";
import { ViewArticle } from "./ViewArticle"
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Recommended />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/saved",
        element: <Saved />
      },
      {
        path: "/viewarticle",
        element: <ViewArticle />
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
