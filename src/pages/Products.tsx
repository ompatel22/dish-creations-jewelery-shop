import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

// Mock products data
const products = [
  {
    id: '1',
    name: 'Golden Bloom Necklace',
    price: 2999,
    image: '/src/assets/necklace-gold.jpg',
    category: 'necklaces',
    description: 'Elegant gold necklace with intricate floral design'
  },
  {
    id: '2', 
    name: 'Gemstone Ring Collection',
    price: 1599,
    image: '/src/assets/rings-collection.jpg',
    category: 'rings',
    description: 'Beautiful set of rings with precious gemstones'
  },
  {
    id: '3',
    name: 'Pearl Drop Earrings',
    price: 899,
    image: '/src/assets/earrings-pearl.jpg', 
    category: 'earrings',
    description: 'Classic pearl earrings with gold accents'
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Our <span className="text-gradient">Collections</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted jewellery pieces, each designed to add elegance to your special moments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="rings">Rings</SelectItem>
              <SelectItem value="necklaces">Necklaces</SelectItem>
              <SelectItem value="earrings">Earrings</SelectItem>
              <SelectItem value="bracelets">Bracelets</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;