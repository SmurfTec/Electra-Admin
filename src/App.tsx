import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { SideBar } from './components';
import { EditCategory } from './pages/Categories/EditCategory';
import { EditVariant } from './pages/Categories/EditVariant';
import { UsersCount } from './pages/Users/Users/extraReducers';
import {
  AddNewVariant,
  AddProduct,
  Addnewbanner,
  Brands,
  Category,
  Coupon,
  CreateBrand,
  CreateCategory,
  CreateCoupon,
  CreateNewadmin,
  Createrole,
  Dashboard,
  EditBrand,
  EditProduct,
  Editnewbanner,
  Editrole,
  Editwebsite,
  Feemodifier,
  HelpCenter,
  HelpCenterDetail,
  ItemVerification,
  Listingdetail,
  Listings,
  Noticebanner,
  Notifications,
  Orders,
  ProductRequests,
  ProductView,
  Products,
  Roles,
  Searchrole,
  SecurityQuestion,
  Settings,
  Signin,
  Step1,
  UserProfile,
  Users,
  Verification,
  ViewAdmin,
  Wallet,
  Webandbanner,
} from './pages/index';
import PrivateRoute from './routes/Privateroute';
import { token } from './store/Slices/AuthSlice';
import { ListingsCount } from './store/Slices/ListingsSlice';
import { OrdersCount } from './store/Slices/OrderSlice';
import { ProductsCount } from './store/Slices/ProductSlice';
import { AppDispatch } from './store/store';
// Ye comment nomi ki farmaish par
function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = localStorage?.getItem('user');
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    dispatch(UsersCount());
    dispatch(OrdersCount());
    dispatch(ProductsCount());
    dispatch(ListingsCount());
    // dispatch(UsersCount());
    // dispatch(UsersCount());
  }, []);

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
            <Route path="/EditBrand/:id" element={<EditBrand />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/CreateCategory" element={<CreateCategory />} />
            <Route path="/EditCategory/:id" element={<EditCategory />} />
            <Route path="/AddNewVariant" element={<AddNewVariant />} />
            <Route path="/EditVariant/:id" element={<EditVariant />} />
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
