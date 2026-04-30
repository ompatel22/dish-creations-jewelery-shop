import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
      setProduct(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image_url || '',
      });
    }
    toast({ title: 'Added to Cart', description: `${quantity} × ${product.name} added.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-xl bg-muted">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <span className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-serif mb-4 mt-2">{product.name}</h1>

            <div className="flex items-center space-x-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-sm text-muted-foreground">Handcrafted with care</span>
            </div>

            <div className="text-3xl font-semibold text-primary mb-6">₹{Number(product.price).toLocaleString()}</div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-input rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">-</button>
                <span className="px-4 py-2 border-x border-input">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">+</button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 btn-hero">
                <ShoppingCart className="h-4 w-4 mr-2" />Add to Cart
              </Button>
              <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Free Shipping</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Secure Checkout</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Easy Returns</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
