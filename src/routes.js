
import HomePannel from "./Pages/PannelPages/MainPage/HomePannel"
import Adduser from "./Pages/PannelPages/Users/Adduser/Adduser"
import Billing from "./Pages/mainPages/Billing/Billing"
import Home from "./Pages/mainPages/Home"
import PrivateRoute from "./Pages/mainPages/PrivateRoute"
import SearchPage from "./Pages/mainPages/SearchPage/SearchPage"
import SinglePost from "./Pages/mainPages/SinglePost/SinglePost"
import SingleProduct from "./Pages/mainPages/SingleProudct/SingleProduct"
import Accountinformuser from "./Pages/mainPages/UserAccount/Accountinformuser/Accountinformuser"
import LoginForm from "./Pages/mainPages/UserAccount/LoginPage/LoginForm"
import Registeruser from "./Pages/mainPages/UserAccount/RegisterPage/Registeruser"



let routes=[

    //Mainpages
    {path:'/' , element:<Home/> },
    {path:`/biling` , element:<Billing/> },
    {path:`/biling/*` , element:<Billing/> },
    {path:`/product/:cat/:id` , element:<SingleProduct/> },
    {path:`/post/:id` , element:<SinglePost/> },
    {path:'/search' , element:<SearchPage/> },
    {path:'/useraccount' , element:<LoginForm />}, 
    {path:'/useraccount/*' , element:<LoginForm />}, 
    {path:'/useraccount/Login' , element:<LoginForm />}, 
    {path:'/useraccount/Register' , element:<Registeruser />}, 
    {path:'/useraccount/inform' , element:<Accountinformuser />}, 

    {path:'/useraccount/inform/*' , element:<PrivateRoute><Accountinformuser /></PrivateRoute>}, 






 //pannelPages
    {path:'/pannel' , element: <HomePannel/>
},
{
    path:'/pannel/user/adduser' , element: <Adduser/>
}

]

export default routes