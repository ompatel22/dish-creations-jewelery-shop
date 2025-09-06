import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

// Mock product data
const products = {
  '1': {
    id: '1',
    name: 'Golden Bloom Necklace',
    price: 2999,
    images: ['/src/assets/necklace-gold.jpg'],
    category: 'necklaces',
    description: 'This exquisite golden bloom necklace features intricate floral designs that capture the essence of natural beauty. Handcrafted with premium gold and adorned with carefully selected gemstones, each piece tells a unique story of elegance and sophistication.',
    features: ['18k Gold Plated', 'Hypoallergenic', 'Handmade', 'Adjustable Chain'],
    inStock: true,
    rating: 4.9,
    reviews: 24
  },
  '2': {
    id: '2',
    name: 'Gemstone Ring Collection',
    price: 1599,
    images: ['/src/assets/rings-collection.jpg'],
    category: 'rings',
    description: 'A stunning collection of rings featuring precious gemstones in elegant rose gold settings. Each ring is carefully crafted to showcase the natural beauty of the stones while ensuring comfort and durability.',
    features: ['Rose Gold Plated', 'Natural Gemstones', 'Various Sizes', 'Gift Box Included'],
    inStock: true,
    rating: 4.8,
    reviews: 18
  },
  '3': {
    id: '3',
    name: 'Pearl Drop Earrings',
    price: 899,
    images: ['/src/assets/earrings-pearl.jpg'],
    category: 'earrings',
    description: 'Classic pearl drop earrings that embody timeless elegance. These sophisticated pieces feature lustrous pearls suspended from delicate gold accents, perfect for both everyday wear and special occasions.',
    features: ['Freshwater Pearls', 'Gold Accents', 'Lightweight', 'Secure Clasps'],
    inStock: true,
    rating: 5.0,
    reviews: 12
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = id ? products[id as keyof typeof products] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline mt-4 inline-block">
            Back to Products
          </Link>
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
        price: product.price,
        image: product.images[0]
      });
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="fade-in">
            <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="fade-in">
            <div className="mb-4">
              <span className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="text-3xl font-semibold text-primary mb-6">
              ₹{product.price.toLocaleString()}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-input rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-input">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              
              <Button onClick={handleAddToCart} className="flex-1 btn-hero">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-muted-foreground">On orders over ₹1000</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Secure Payment</div>
                <div className="text-xs text-muted-foreground">100% Protected</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-medium">Easy Returns</div>
                <div className="text-xs text-muted-foreground">30 day policy</div>
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