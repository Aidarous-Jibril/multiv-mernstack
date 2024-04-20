import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// local imports
import { LoginPage, RegisterPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage,CustomerService, ProductDetailsPage, ProfilePage, CheckoutPage, StoreCreatePage, StoreLoginPage, PaymentPage, OrderSuccessPage, UserOrderDetailsPage, UserTrackOrderPage, UserInboxPage, } from './pages';
import { UserProtectedRoute, SellerProtectedRoute } from './routes/protected-routes';
import { StoreHomePage, StoreDashboardPage, StoreCreateProductPage, StoreCreateEventPage, StoreAllProductsPage, StoreAllEventsPage, StoreAllCouponsPage, StoreAllOrdersPage, StorePreviewPage, StoreOrderDetailsPage, StoreAllRefundsPage, StoreSettingsPage, StoreWithDrawMoneyPage, StoreMessagesPage, } from './pages/store';
import { getAllProducts } from './redux/actions/productActions';
import { getAllEvents, storeGetAllEvents } from './redux/actions/eventActions';
import { useDispatch } from 'react-redux';
// import { loadUser } from './redux/actions/userActions';



function App() {
  const [stripeApiKey, setstripeApiKey] = useState("");
  const dispatch = useDispatch()

  async function getStripeApiKey(){
    const { data } = await axios.get(`/api/payment/stripeapikey`);
    setstripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllEvents());
    getStripeApiKey();
  }, []);

  return (
    <div className="overflow-x-hidden"  >

      <BrowserRouter>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <UserProtectedRoute>
                  <PaymentPage />
                </UserProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}

       <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/best-sellers' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/customer-service' element={<CustomerService />} />
        <Route path='/faq' element={<FAQPage />} />
        <Route path='/store-create' element={<StoreCreatePage/>} />
        <Route path='/store-login' element={<StoreLoginPage />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path='/profile' element={
          <UserProtectedRoute >
            <ProfilePage />
          </UserProtectedRoute>
        } />
        <Route path='/checkout' element={
          <UserProtectedRoute >
            <CheckoutPage />
          </UserProtectedRoute>
        } />
        <Route
          path="/user/order/:id"
          element={
            <UserProtectedRoute>
              <UserOrderDetailsPage />
            </UserProtectedRoute>
          }
        />
      
        <Route
          path="/user/track/order/:id"
          element={
            <UserProtectedRoute>
              <UserTrackOrderPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/inbox"
          element={
            <UserProtectedRoute>
              <UserInboxPage/>
            </UserProtectedRoute>
          }
        />
        
        <Route path='/store/:id' element={
          <SellerProtectedRoute >
            <StoreHomePage />
          </SellerProtectedRoute>
        } />
        
        <Route path="/store/preview/:id" element={<StorePreviewPage /> } />

        <Route path='/dashboard' element={
          <SellerProtectedRoute >
            <StoreDashboardPage />
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-orders' element={
          <SellerProtectedRoute >
            <StoreAllOrdersPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-messages' element={
          <SellerProtectedRoute >
            <StoreMessagesPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-products' element={
          <SellerProtectedRoute >
            <StoreAllProductsPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute >
            <StoreCreateProductPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-events' element={
          <SellerProtectedRoute >
            <StoreAllEventsPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-create-event' element={
          <SellerProtectedRoute >
            <StoreCreateEventPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-withdraw-money' element={
          <SellerProtectedRoute >
            <StoreWithDrawMoneyPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-coupons' element={
          <SellerProtectedRoute >
            <StoreAllCouponsPage/>
          </SellerProtectedRoute>
        } />
        <Route path='/dashboard-refunds' element={
          <SellerProtectedRoute >
            <StoreAllRefundsPage/>
          </SellerProtectedRoute>
        } />
          <Route path='/settings' element={
          <SellerProtectedRoute >
            <StoreSettingsPage />
          </SellerProtectedRoute>
        } />
        <Route
          path="/store/order/:id"
          element={
            <SellerProtectedRoute>
              <StoreOrderDetailsPage />
            </SellerProtectedRoute>
          }
        />

      </Routes> 
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </BrowserRouter>
    </div>

  );
}

export default App;
