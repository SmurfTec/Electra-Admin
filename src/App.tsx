import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import IMAGES from './assets/Images';
import { SideBar } from './components';
import { SVGIcon } from './components/SVG';
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
import { AutheticateUser, token } from './store/Slices/AuthSlice';
import { ListingsCount } from './store/Slices/ListingsSlice';
import { OrdersCount } from './store/Slices/OrderSlice';
import { ProductsCount } from './store/Slices/ProductSlice';
import { AppDispatch, RootState } from './store/store';
// Ye comment nomi ki farmaish par
function App() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const { isLoggedIn } = useSelector((st: RootState) => st.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('isLoggedIn', isLoggedIn);
    if (isAuthenticating)
      dispatch(AutheticateUser()).then(res => {
        if (res.meta.requestStatus === 'rejected') navigate('/');
        if (res.meta.requestStatus === 'fulfilled' && location.pathname === '/')
          navigate('/Dashboard');
        setIsAuthenticating(false);
      });
    else {
      if (isLoggedIn) {
        dispatch(UsersCount());
        dispatch(OrdersCount());
        dispatch(ProductsCount());
        dispatch(ListingsCount());
        if (location.pathname === '/') navigate('/Dashboard');
      }
    }
  }, [isAuthenticating, dispatch, isLoggedIn]);

  // useEffect(() => {
  //   if (!user || location.pathname === '/') {
  //     setShow(false);
  //   } else {
  //     setShow(true);
  //   }
  // }, [user, location]);
  // useEffect(()=>{
  //   console.clear()
  // })

  // useEffect(() => {
  //   dispatch(UsersCount());
  //   dispatch(OrdersCount());
  //   dispatch(ProductsCount());
  //   dispatch(ListingsCount());
  //   // dispatch(UsersCount());
  //   // dispatch(UsersCount());
  // }, []);

  console.log('isAuthenticating', isAuthenticating);
  console.log('isLoggedIn', isLoggedIn);

  return (
    <div className="flex">
      {isAuthenticating ? (
        <div id="globalLoader">
          <SVGIcon src={IMAGES.Logo} filled={'inherit'} fillcolor={'inherit'} />
        </div>
      ) : (
        <>
          {isLoggedIn && <SideBar />}
          <div className="w-[100%]">
            <div className="ml-[36px]">
              <Routes>
                <Route path="/" element={<Signin />} />
                <Route
                  path="/SecurityQuestion"
                  element={<SecurityQuestion />}
                />
                <Route path="/Notifications" element={<Notifications />} />
                <Route path="/Dashboard" element={<Dashboard />} />
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
