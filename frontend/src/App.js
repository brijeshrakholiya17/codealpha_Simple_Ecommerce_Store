import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './components/Cart';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminProductList from './pages/AdminProductList';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
