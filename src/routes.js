
import Billing from "./Pages/mainPages/Billing/Billing";
import Factor from "./Pages/mainPages/Factor/Factor";
import Home from "./Pages/mainPages/Home";
import PrivateRoute from "./Pages/mainPages/PrivateRoute";


import SingleProduct from "./Pages/mainPages/SingleProudct/SingleProduct";
import LoginForm from "./Pages/mainPages/UserAccount/LoginPage/LoginForm";
import Registeruser from "./Pages/mainPages/UserAccount/RegisterPage/Registeruser";

let routes = [
  //Mainpages
  { path: "/", element: <Home /> },
  {
    path: `/biling`,
    element: (
      <PrivateRoute>
        <Billing />
      </PrivateRoute>
    ),
  },
  {
    path: `/biling/*`,
    element: (
      <PrivateRoute>
        <Billing />
      </PrivateRoute>
    ),
  },
  { path: `/product/:id`, element: <SingleProduct /> },


  { path: "/useraccount", element: <LoginForm /> },
  { path: "/useraccount/*", element: <LoginForm /> },
  { path: "/useraccount/Login", element: <LoginForm /> },
  { path: "/useraccount/Register", element: <Registeruser /> },

  {
    path: "/outputpay",
    element: (
      <PrivateRoute>
        <Factor />
      </PrivateRoute>
    ),
  },

];

export default routes;
