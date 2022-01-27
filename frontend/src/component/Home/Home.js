import React, { Fragment, useEffect} from 'react';
import { CgMouse } from 'react-icons/all';
import Product from "./ProductCard.js"
import "./Home.css";
import {Link} from "react-router-dom"
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../Actions/productActions.js';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from "react-alert";
import SearchIcon from "@material-ui/icons/Search"
import AccountBoxIcon from "@material-ui/icons/AccountBox";                      
const Home = () => { 
  const alert = useAlert();
 const dispatch = useDispatch();
 const { loading, error, products } = useSelector((state) => state.products);

 useEffect(() => {
  if (error) {
    alert.error(error);
    dispatch(clearErrors());

  }
  dispatch(getProduct());
   }, [dispatch,error, alert]);

    return ( 
      <Fragment>
        {loading ? (
          <Loader/>

        ) :
         (<Fragment>
      <MetaData title="Ecommerce" />
    


    <div className="banner">
      <p>Welcome to Ecommerce</p>
      <h1>FIND AMAZING PRODUCTS BELOW</h1>

      <a href="#container">
        <button>
          Scroll <CgMouse />
        </button>
      </a>
    </div>
    <div className='Navi'>
    <Link to ="/About"><h3>About</h3></Link>
      <Link to ="/Home"><h3>Home</h3></Link>
      <Link to ="/products"><h3>Products</h3></Link>
      <Link to ="/contact"><h3>Contacts</h3></Link>
      <Link to="/Search"><button><SearchIcon /></button></Link>
      <Link to="/login"><button><AccountBoxIcon /></button></Link>
  
    </div>

    <h2 className="homeHeading">Featured Products</h2>

    <div className="container" id="container">
    {products && products.map((product) => (
                <Product product={product} />
              ))}
    </div>
  </Fragment>) }
      </Fragment>
   
    );
};          

export default Home
