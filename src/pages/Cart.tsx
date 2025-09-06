import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    // For now, we'll show a toast about backend integration
    toast({
      title: "Checkout Coming Soon",
      description: "Payment integration will be available after connecting to Supabase for secure transactions.",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Discover our beautiful handcrafted jewellery collection
            </p>
            <Link to="/products">
              <Button className="btn-hero">Start Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="fade-in">
          <h1 className="text-3xl font-serif mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="card-luxury p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                      <p className="text-muted-foreground">₹{item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-12 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4">
                <Link to="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-luxury p-6 sticky top-24">
                <h2 className="text-xl font-serif mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleCheckout} className="w-full btn-hero mb-4">
                  Proceed to Checkout
                </Button>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Secure checkout with SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;