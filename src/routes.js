import HomePannel from "./Pages/PannelPages/MainPage/HomePannel";
import Adduser from "./Pages/PannelPages/Users/Adduser/Adduser";
import Billing from "./Pages/mainPages/Billing/Billing";
import Factor from "./Pages/mainPages/Factor/Factor";
import Home from "./Pages/mainPages/Home";
import PrivateRoute from "./Pages/mainPages/PrivateRoute";
import SearchPage from "./Pages/mainPages/SearchPage/SearchPage";
import SinglePost from "./Pages/mainPages/SinglePost/SinglePost";
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
  { path: `/product/:cat/:id`, element: <SingleProduct /> },
  { path: `/post/:id`, element: <SinglePost /> },
  { path: `/search/:searchinput`, element: <SearchPage /> },
  { path: `/search/`, element: <SearchPage /> },
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

  //pannelPages
  { path: "/pannel", element: <HomePannel /> },
  {
    path: "/pannel/user/adduser",
    element: <Adduser />,
  },
];

export default routes;
