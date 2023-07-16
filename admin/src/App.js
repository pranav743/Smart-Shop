import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//Importing Components
import MultiForm from "./components/MultiForm"


//Importing Pages
import AddProduct from "./pages/Product/AddProduct";
import BrowseProduct from './pages/Product/BrowseProduct';

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

        
      <div style={{ position: 'fixed', top: '0', height: '60px', backgroundImage: 'linear-gradient(180deg, #002869, #000)', width: '100%', boxShadow: '0 0 0px #555', zIndex: '2'}}>
        <Navigation />
      </div>

      
        <Routes>
          <Route path="/admin/addproduct" element={<AddProduct />} />
          <Route path="/admin/browseproduct" element={<BrowseProduct />} />
          <Route path="/" element={<MultiForm />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
