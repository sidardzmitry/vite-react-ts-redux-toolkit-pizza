import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";

//styles
import styles from "./index.module.scss";

//components
import { API_URL } from "./helpers/config";
import { Layout } from "./layout/Layout";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { NotFound } from "./pages/NotFound";
import { TailSpin } from "react-loader-spinner";
import { AuthLayout } from "./layout/Auth";
import { RequireAuth } from "./helpers/RequireAuth";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Success } from "./pages/Success";
import { Switcher } from "./components/Switcher";

//for Suspence
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <TailSpin color="#8e00ff" wrapperClass={`${styles["loader"]}`} />
            }
          >
            <Menu />
          </Suspense>
        ),
        //можно через Suspense + lazy = router
      },
      {
        path: "/success",
        element: (
          <Suspense
            fallback={
              <TailSpin color="#8e00ff" wrapperClass={`${styles["loader"]}`} />
            }
          >
            <Success />
          </Suspense>
        ),
        //можно через Suspense + lazy = router
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <TailSpin color="#8e00ff" wrapperClass={`${styles["loader"]}`} />
            }
          >
            <Cart />
          </Suspense>
        ),
        //можно через Suspense + lazy = router
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
        errorElement: <h3 className="error">Error</h3>,
        loader: async ({ params }) => {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
          const { data } = await axios.get(`${API_URL}/products/${params.id}`);
          return data;
        },
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <TailSpin
                color="#8e00ff"
                wrapperClass={`${styles["loader__auth"]}`}
              />
            }
          >
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense
            fallback={
              <TailSpin
                color="#8e00ff"
                wrapperClass={`${styles["loader__auth"]}`}
              />
            }
          >
            <Register />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Switcher />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
