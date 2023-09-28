import React from 'react';
import {BrowserRouter as Router , Routes , Route,} from "react-router-dom"
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import OurStore from './pages/OurStore/OurStore';
import Blog from './pages/Blog/Blog';
import WishList from './pages/WishList/WishList';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import SignUp from './pages/SignUp/SignUp';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SingleBlog from './pages/SingleBlog/SingleBlog';
import PrivacyPolicy from "./pages/Policy and terms/PrivacyPolicy/PrivacyPolicy"
import RefundPolicy from "./pages/Policy and terms/RefundPolicy/RefundPolicy"
import ShippingPolicy from "./pages/Policy and terms/ShippingPolicy/ShippingPolicy"
import TermsOfServices from "./pages/Policy and terms/TermsOfServices/TermsOfServices"
import SingleProduct from './pages/SingleProduct/SingleProduct';
import Cart from './pages/Cart/Cart';
import CheckOut from './pages/CheckOut/CheckOut';
import { PrivateRoutes } from './pages/ProtectedRoutes/PrivateRoute';
import { OpenRoutes } from './pages/ProtectedRoutes/OpenRoute';
import Orders from './pages/Orders/Orders';
import Profile from './pages/Profile/Profile';


function App() {
  return( 
  <>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='contact' element={<Contact />}/>
          <Route path='product' element={<OurStore />}/>
          <Route path='product/:id' element={<SingleProduct />}/>
          <Route path='blogs' element={<Blog />}/>
          <Route path='blog/:id' element={<SingleBlog />}/>
          <Route path='cart' element={<PrivateRoutes><Cart /></PrivateRoutes>}/>
          <Route path='my-orders' element={<PrivateRoutes><Orders /></PrivateRoutes>}/>
          <Route path='my-profile' element={<PrivateRoutes><Profile /></PrivateRoutes>}/>
          <Route path='checkout' element={<PrivateRoutes><CheckOut /></PrivateRoutes>}/>
          <Route path='wishlist' element={<PrivateRoutes><WishList /></PrivateRoutes>}/>
          <Route path='login' element={<OpenRoutes><Login/></OpenRoutes>}/>
          <Route path='forgot-password' element={<ForgotPassword />}/>
          <Route path='signup' element={<OpenRoutes><SignUp /></OpenRoutes>}/>
          <Route path='reset-password/:token' element={<ResetPassword />}/>
          <Route path='privacy-policy' element={<PrivacyPolicy />}/>
          <Route path='refund-policy' element={<RefundPolicy />}/>
          <Route path='shipping-policy' element={<ShippingPolicy />}/>
          <Route path='terms-services' element={<TermsOfServices />}/>
        </Route>
      </Routes>
    </Router>
  </>
  )
}

export default App;
