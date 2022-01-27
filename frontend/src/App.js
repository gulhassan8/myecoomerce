import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './App.css';
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/Home/Home.js";
import React from "react";
import ProductDetails from "./component/Product/ProductDetail";
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search"
import LoginSignUp from "./component/Users/LoginSignUp";
import store from "./Store"

import UserOptions from "./component/layout/Header/UserOptions.js";   
import { useSelector } from "react-redux";
import { loadUser } from "./Actions/userAction";
import { useEffect,useState } from "react";
import  Profile from "./component/Users/Profile.js"
import ForgotPassword from "./component/Users/ForgotPassword";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/Users/UpdateProfile.js";
import UpdatePassword from "./component/Users/UpdatePassword.js"
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder"
import axios from "axios"
import Payment from "./component/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Orders/MyOrders.js";
import OrderDetails from "./component/Orders/OrderDetails"
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/updateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";
import ResetPassword from "./component/Users/ResetPassword";



 


function App() {

  const {isAuthenticated, user } = useSelector((state) =>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {

    store.dispatch(loadUser());

    getStripeApiKey();

    
  }, []);


  
  return (
    <Router>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}
   
    {stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute exact path="/process/payment" component={Payment} /></Elements>
    )}
    
    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products} />
    <Route path="/products/:keyword" component={Products} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/about" component={About} />
    <Route exact path="/password/reset/:token" component={ResetPassword} />
    <ProtectedRoute exact path="/account" component={Profile}/> 
    <Route exact path="/login"  component={LoginSignUp} />
    <ProtectedRoute exact path="/me/update" component={UpdateProfile}/> 
    <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
    <Route exact path="/password/forgot" component={ForgotPassword} />
    <Route exact path="/cart" component={Cart}/>
    <ProtectedRoute exact path="/shipping" component={Shipping}/>;
    
    <ProtectedRoute exact path="/success" component={OrderSuccess}/>;
    <ProtectedRoute exact path="/orders" component={MyOrders}/>;
    
    <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>;
    <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>;
    <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>;
    <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>;
    <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>;
    <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>;
    <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>; 
    <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>;
    <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList}/>;  
    <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>; 
    <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews}/>; 

    <Route component ={
      window.location.pathname ==="/process/payment" ? null : NotFound
    }/>
    </Switch>

   
        
          
 

 
    <Footer/>  
    </Router>
  );
}

export default App;
