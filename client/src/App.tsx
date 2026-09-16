import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Collections } from "./pages/Collections";
import { ProductDetailsPage } from "./components/ProductDetailsPage";
import { Lookbook } from "./pages/Lookbook";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { FAQ } from "./pages/FAQ";
import { NotFound } from "./pages/NotFound";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { Shipping } from "./pages/Shipping";
import { Returns } from "./pages/Returns";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:slug" element={<Collections />} />
      <Route path="/product/:slug" element={<ProductDetailsPage />} />
      <Route path="/lookbook" element={<Lookbook />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/order-confirmed" element={<OrderConfirmation />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
