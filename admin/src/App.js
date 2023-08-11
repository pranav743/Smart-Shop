import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//Importing Components
import HomePage from "./components/HomePage"


//Importing Pages
import AddProduct from "./pages/Product/AddProduct";
import BrowseProduct from './pages/Product/BrowseProduct';
import EditUsers from "./pages/users/EditUsers"
import Orders_Page from "../src/pages/orders/orders"

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return (
    <div style={{height: '100vh', width: '100%', backgroundColor: '#0081fa'}}></div>
  );
}



function App() {


  return (
    <div className="App">
      <Router>

        
      <div style={{ position: 'fixed', top: '0', height: '60px', backgroundImage: 'linear-gradient(270deg, #002869, #000)', width: '100%', boxShadow: '0 0 0px #555', zIndex: '2'}}>
        <Navigation />
      </div>

      
        <Routes>
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/browseproduct" element={<BrowseProduct />} />
          <Route path="/admin/users" element={<EditUsers />} />
          <Route path="/admin/orders" element={<Orders_Page />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
