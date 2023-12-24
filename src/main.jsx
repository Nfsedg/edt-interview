import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/root';
import Restaurants from './routes/restaurants';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/edt-interview",
    element: <Root />,
  },
  {
    path: "/edt-interview/restaurant/:restId",
    element: <Restaurants/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
