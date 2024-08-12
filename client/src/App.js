import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import { Publication_key } from "../src/Api/helper";
import './App.css';
import Loader from './components/Loader/Loader';
import AdminProtectedRoutes from './components/Protected/AdminProtectedRoutes';
import UserProtectedRoutes from './components/Protected/UserProtectedRoutes';
import Layout from './layouts/Layout';
import AddCategory from './pages/Admin/AddCategory';
import AddProducts from './pages/Admin/AddProducts';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProductspage from './pages/Admin/AdminProductspage';
import CommonLayoutAdmin from './pages/Admin/CommonLayoutAdmin';
import Orders from './pages/Admin/Orders';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Checkout from './pages/CheckoutPage/Checkout';
import Error from './pages/Error/Error';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ProductsDetailsPage from './pages/ProductsDetailsPage/ProductsDetailsPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import Register from './pages/Register/Register';
import Carts from './pages/carts/Carts';
import Payment from './pages/payment/Payment';
import Shipping from './pages/shipping/Shipping';
import UserOrders from './pages/userOrders/UserOrders';
import UserProfile from './pages/userprofile/UserProfile';

function App() {

  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpin(false)
    }, 3000)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])



  const stripePromise = loadStripe(
    `${Publication_key}`
  )
  return (
    <>

      {
        spin ? <Loader /> :
          <Elements stripe={stripePromise}>

            <Routes>
              {/* Admin Routes */}
              <Route path='/admin/dashboard' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AdminDashboard} /></CommonLayoutAdmin>} />
              <Route path='/admin/products' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AdminProductspage} /></CommonLayoutAdmin>} />
              <Route path='/admin/addcategory' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AddCategory} /></CommonLayoutAdmin>} />
              <Route path='/admin/addproducts' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AddProducts} /></CommonLayoutAdmin>} />
              <Route path='/admin/orders' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={Orders} /></CommonLayoutAdmin>} />
              <Route path='/admin/login' element={<Layout><AdminLogin /></Layout>} />

              {/* user routes */}
              <Route path='/' element={<Layout><Home /></Layout>} />
              <Route path='/products' element={<Layout><ProductsPage /></Layout>} />
              <Route path='/productdetails/:id' element={<Layout><ProductsDetailsPage /></Layout>} />
              <Route path='/carts' element={<Layout><UserProtectedRoutes Components={Carts} /></Layout>} />
              <Route path='/userprofile' element={<Layout><UserProtectedRoutes Components={UserProfile} /></Layout>} />
              <Route path='/login' element={<Layout><Login /></Layout>} />
              <Route path='/register' element={<Layout><Register /></Layout>} />
              <Route path='/forgotpassword' element={<Layout><ForgotPassword /></Layout>} />
              <Route path='/resetpassword/:id/:token' element={<Layout><ResetPassword /></Layout>} />
              <Route path='/shipping' element={<Layout><UserProtectedRoutes Components={Shipping} /></Layout>} />
              <Route path='/checkout' element={<Layout><UserProtectedRoutes Components={Checkout} /></Layout>} />
              <Route path='/payment' element={<Layout><UserProtectedRoutes Components={Payment} /></Layout>} />
              <Route path='/userorders' element={<Layout><UserProtectedRoutes Components={UserOrders} /></Layout>} />
              <Route path='*' element={<Layout><Error /></Layout>} />
            </Routes>
            <Toaster />
          </Elements>
      }


    </>
  );
}

export default App;
