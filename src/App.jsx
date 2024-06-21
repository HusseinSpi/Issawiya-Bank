import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { NavBar } from "./components/navbar/NavBar";
import { NoMatch } from "./pages/noMatch/NoMatch";
import { SignInPage } from "./pages/sign-in/SignInPage";
import { SignUpPage } from "./pages/sign-in/SignUpPage";
import { Account } from "./pages/account/Account";
import { TransferCreditPage } from "./pages/transferMoney/TransferCreditPage";
import { TransferCredit } from "./pages/transferMoney/TransferCredit";

// Define routes
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
        path: "account",
        element: <Account />,
      },
      {
        path: "transfer-credit",
        element: <TransferCreditPage />,
      },
      {
        path: "transfer-credit/:id",
        element: <TransferCredit />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
];

// Main App component
function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
