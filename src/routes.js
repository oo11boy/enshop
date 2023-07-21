
import HomePannel from "./Pages/PannelPages/MainPage/HomePannel"
import Adduser from "./Pages/PannelPages/Users/Adduser/Adduser"
import Billing from "./Pages/mainPages/Billing/Billing"
import Home from "./Pages/mainPages/Home"
import SearchPage from "./Pages/mainPages/SearchPage/SearchPage"
import SinglePost from "./Pages/mainPages/SinglePost/SinglePost"
import SingleProduct from "./Pages/mainPages/SingleProudct/SingleProduct"
import UserAccount from "./Pages/mainPages/UserAccount/UserAccount"



let routes=[

    //Mainpages
    {path:'/' , element:<Home/> },
    {path:`/biling` , element:<Billing/> },
    {path:`/biling/*` , element:<Billing/> },
    {path:`/product/:cat/:id` , element:<SingleProduct/> },
    {path:`/post/:id` , element:<SinglePost/> },
    {path:'/search' , element:<SearchPage/> },
    {path:'/useraccount' , element:<UserAccount />}, 








 //pannelPages
    {path:'/pannel' , element: <HomePannel/>
},
{
    path:'/pannel/user/adduser' , element: <Adduser/>
}

]

export default routes