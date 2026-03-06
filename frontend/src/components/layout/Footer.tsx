import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main footer */}
      <div className="container-main px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">
              Malasiya<span className="text-accent">kart</span>
            </h2>
            <p className="text-background/70 text-sm mb-4">
              Malaysia's trusted multi-vendor marketplace. Shop from thousands of sellers with secure payments and fast delivery.
            </p>
            <div className="flex gap-3 justify-start">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li><Link to="/shop" className="hover:text-background transition-colors">All Products</Link></li>
              <li><Link to="/category/electronics" className="hover:text-background transition-colors">Electronics</Link></li>
              <li><Link to="/category/fashion" className="hover:text-background transition-colors">Fashion</Link></li>
              <li><Link to="/category/home-living" className="hover:text-background transition-colors">Home & Living</Link></li>
              <li><Link to="/deals" className="hover:text-background transition-colors">Deals</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li><Link to="/contact" className="hover:text-background transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-background transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-background transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-background transition-colors">Returns</Link></li>
              <li><Link to="/track-order" className="hover:text-background transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Seller */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Sell on Malasiyakart</h3>
            <ul className="space-y-2.5 text-sm text-background/70">
              <li><Link to="/seller/register" className="hover:text-background transition-colors">Become a Seller</Link></li>
              <li><Link to="/seller/login" className="hover:text-background transition-colors">Seller Login</Link></li>
              <li><Link to="/seller/guidelines" className="hover:text-background transition-colors">Seller Guidelines</Link></li>
              <li><Link to="/seller/fees" className="hover:text-background transition-colors">Fees & Pricing</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2 justify-start">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>123 Commerce Street, Kuala Lumpur, Malaysia</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+60 3-1234 5678</span>
              </li>
              <li className="flex items-center gap-2 justify-start">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>support@malasiyakart.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 mt-6 sm:mt-8">
        <div className="container-main px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-3 sm:gap-4 text-sm text-background/60">
            <p className="order-2 sm:order-1 mt-2 sm:mt-0">© 2024 Malasiyakart. All rights reserved.</p>
            <div className="order-1 sm:order-2 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/privacy" className="hover:text-background transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-background transition-colors whitespace-nowrap">Terms & Conditions</Link>
              <Link to="/about" className="hover:text-background transition-colors whitespace-nowrap">About Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
