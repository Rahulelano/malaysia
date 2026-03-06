import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import PageLoader from "@/components/common/PageLoader";

import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider } from "./contexts/AuthContext";

// Lazy loaded pages
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const SellerRegister = lazy(() => import("./pages/SellerRegister"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Category = lazy(() => import("./pages/Category"));
const Brand = lazy(() => import("./pages/Brand"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const TrackOrder = lazy(() => import("./pages/TrackOrder"));
const SellerLogin = lazy(() => import("./pages/SellerLogin"));
const SellerGuidelines = lazy(() => import("./pages/SellerGuidelines"));
const SellerFees = lazy(() => import("./pages/SellerFees"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const AddProduct = lazy(() => import("./pages/seller/AddProduct"));
const SellerDashboard = lazy(() => import("./pages/seller/SellerDashboard"));
const SellerProducts = lazy(() => import("./pages/seller/SellerProducts"));
const Addresses = lazy(() => import("./pages/profile/Addresses"));
const Payments = lazy(() => import("./pages/profile/Payments"));
const Settings = lazy(() => import("./pages/profile/Settings"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
import AdminRoute from "./components/routing/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <BrowserRouter>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/category/:slug" element={<Category />} />
                    <Route path="/brand/:slug" element={<Brand />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/seller/register" element={<SellerRegister />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />

                    {/* Admin Routes */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Route>

                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/seller/login" element={<SellerLogin />} />
                    <Route path="/seller/guidelines" element={<SellerGuidelines />} />
                    <Route path="/seller/fees" element={<SellerFees />} />
                    <Route path="/seller/products/new" element={<AddProduct />} />
                    <Route path="/seller/dashboard" element={<SellerDashboard />} />
                    <Route path="/seller/products" element={<SellerProducts />} />
                    <Route path="/profile/addresses" element={<Addresses />} />
                    <Route path="/profile/payments" element={<Payments />} />
                    <Route path="/profile/settings" element={<Settings />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
