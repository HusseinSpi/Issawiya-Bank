import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { NavBar } from "./components/navbar/NavBar";
import { NoMatch } from "./pages/noMatch/NoMatch";
import { SignInPage } from "./pages/sign-in/SignInPage";
import { SignUpPage } from "./pages/sign-in/SignUpPage";
import { Account } from "./pages/account/Account";
import { TransferCreditPage } from "./pages/transferCredit/TransferCreditPage";
import { TransferCredit } from "./pages/transferCredit/TransferCredit";
import { TransferMoney } from "./pages/transferMoney/TransferMoney";
import { AdminPanel } from "./pages/Admin/AdminPanel";

const routes = [
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/transfer-credit",
        element: <TransferCreditPage />,
      },
      {
        path: "/transfer-money",
        element: <TransferMoney />,
      },
      {
        path: "/transfer-credit/:id",
        element: <TransferCredit />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
