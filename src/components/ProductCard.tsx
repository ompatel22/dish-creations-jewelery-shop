import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="card-luxury group relative overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-6">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
              {product.category}
            </span>
          </div>
          
          <h3 className="font-serif text-lg mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
      
      {/* Hover Actions */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button size="icon" variant="secondary" className="w-8 h-8 shadow-soft">
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="w-8 h-8 shadow-soft"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Quick Add to Cart */}
      <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary-dark text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;