import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DC</span>
            </div>
            <span className="text-xl font-serif font-semibold text-gradient">
              Dish Creations
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;