import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/cart";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import VerifyPaymentPage from "./pages/VerifyPaymentPage/VerifyPaymentPage";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import MyOrderPage from "./pages/MyOrderPage/MyOrderPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/login" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/myOrder/verify" element={<VerifyPaymentPage />} />

      <Route path="/cart" element={
        <PrivateRoute>
          <Cart />
        </PrivateRoute>
      } />

      <Route path="/checkout" element={
        <PrivateRoute>
          <CheckOutPage />
        </PrivateRoute>
      } />

      <Route path="/myorder" element={
        <PrivateRoute>
          <MyOrderPage />
        </PrivateRoute>
      } />

    </Routes>
  )
}
export default App