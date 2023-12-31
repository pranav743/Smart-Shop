import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//Importing Components
import MultiForm from "./components/MultiForm"
import WithSubnavigation from "./components/Navbar"
import Otp from "./components/Otp"
import Cart from "./components/Cart"


//Importing Pages
import SignUp from "./components/SignUp";
import BrowseProduct from './pages/Product/BrowseProduct';
import ProductPage from "./pages/Product/ProductPage";
import SignIn from "./components/SignIn";
import BrowseCategory from "./pages/Product/BrowseCategory";
import Current_Orders from './pages/orders/Current_Orders';
import History_Orders from './pages/orders/History_Orders';
import Home_Page from './pages/Home_Page';





function App() {


  return (
    <div className="App">
      <Router>

        
      <div style={{ position: 'fixed', top: '0', height: '60px', backgroundImage: 'linear-gradient(180deg, #002869, #000)', width: '100%', boxShadow: '0 0 0px #555', zIndex: '2'}}>
       
        <WithSubnavigation/>
      </div>

      
        <Routes>
          <Route path="/" element={<Home_Page />} />
          <Route path="/client/signin" element={<SignIn />} />
          <Route path="/client/signup" element={<SignUp />} />
          <Route path="/client/otpvalidation" element={<Otp />} />
          <Route path="/browse-all" element={<BrowseProduct />} />
          <Route path="/:category" element={<BrowseCategory />} />
          <Route path="/admin/browseproduct/product/:product_id" element={<ProductPage />} />
          <Route path="/client/cart" element={<Cart />} />
          <Route path="/client/current-orders" element={<Current_Orders />} />
          <Route path="/client/history-orders" element={<History_Orders />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
