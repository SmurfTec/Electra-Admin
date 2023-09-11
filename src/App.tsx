import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import {
  Dashboard,
  Users,
  Signin,
  ProductView,
  UserProfile,
  AddProduct,
  ProductRequests,
  Roles,
  Products,
  Wallet,
  Coupon,
  CreateCoupon,
  Category,
  CreateCategory,
  AddNewVariant,
  HelpCenter,
  HelpCenterDetail,
  CreateNewadmin,
  ViewAdmin,
  Searchrole,
  Createrole,
  Verification,
  ItemVerification,
  Settings,
  Listings,
  Orders,
  Listingdetail,
  Editwebsite,
  Webandbanner,
  Noticebanner,
  Addnewbanner,
  Step1,
  Feemodifier,
  Notifications,
  SecurityQuestion,
  Editrole,
  EditProduct,
  Editnewbanner,
  Brands,
  CreateBrand,
} from './pages/index';
import { SideBar } from './components';
import PrivateRoute from './routes/Privateroute';
import { token } from './store/Slices/AuthSlice';

function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = localStorage?.getItem('user');
  useEffect(() => {
    if (!user || location.pathname === '/') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [user, location]);
  // useEffect(()=>{
  //   console.clear()
  // })
  return (
    <div className="flex">
      {show && <SideBar />}
      <div className="w-[100%]">
        <div className="ml-[36px]">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/SecurityQuestion" element={<SecurityQuestion />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route
              path="/Dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/Users" element={<Users />} />
            <Route path="/ProductDetail/:id" element={<ProductView />} />
            <Route path="/UserProfile/:id" element={<UserProfile />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/EditProduct/:id" element={<EditProduct />} />
            <Route path="/Productrequest" element={<ProductRequests />} />
            <Route path="/Roles" element={<Roles />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Wallet" element={<Wallet />} />
            <Route path="/Coupon" element={<Coupon />} />
            <Route path="/CreateCoupon" element={<CreateCoupon />} />
            <Route path="/CreateBrand" element={<CreateBrand />} />
            <Route path="/Brand" element={<Brands />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/CreateCategory" element={<CreateCategory />} />
            <Route path="/AddNewVariant" element={<AddNewVariant />} />
            <Route path="/HelpCenter" element={<HelpCenter />} />
            <Route
              path="/HelpCenterDetail/:id"
              element={<HelpCenterDetail />}
            />
            <Route path="/Newadmin" element={<CreateNewadmin />} />
            <Route path="/Viewadmin/:id" element={<ViewAdmin />} />
            <Route path="/Searchrole" element={<Searchrole />} />
            <Route path="/Verification" element={<Verification />} />
            <Route path="/Verification/Step1/:id" element={<Step1 />} />
            <Route
              path="/Verification/ItemVerification/:id"
              element={<ItemVerification />}
            />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Creationroles" element={<Createrole />} />
            <Route path="/Editroles/:name" element={<Editrole />} />
            <Route path="/Listings" element={<Listings />} />
            <Route path="/ListingsDetail/:id" element={<Listingdetail />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Editwebsite" element={<Editwebsite />} />
            <Route path="/Webandbanner/:id" element={<Webandbanner />} />
            <Route path="/Noticebanner" element={<Noticebanner />} />
            <Route path="/Addbanner" element={<Addnewbanner />} />
            <Route path="/EditNewBanner/:id" element={<Editnewbanner />} />
            <Route path="/Feemodifier" element={<Feemodifier />} />
            <Route path="*" element={<Signin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
