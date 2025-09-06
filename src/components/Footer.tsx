import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="text-xl font-serif font-semibold text-gradient">
                Dish Creations
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Handmade jewellery crafted with love to elevate every occasion. 
              Each piece is unique and tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category=rings" className="text-muted-foreground hover:text-primary transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/products?category=necklaces" className="text-muted-foreground hover:text-primary transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/products?category=earrings" className="text-muted-foreground hover:text-primary transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/products?category=bracelets" className="text-muted-foreground hover:text-primary transition-colors">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+91 9664780894</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Patelishu2811@gmail.com</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Dish Creations. All rights reserved. Crafted with ❤️ by Isha Patel.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;