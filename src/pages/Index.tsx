import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-jewellery.jpg';
import necklaceImage from '@/assets/necklace-gold.jpg';
import ringsImage from '@/assets/rings-collection.jpg';
import earringsImage from '@/assets/earrings-pearl.jpg';

const testimonials = [
  { name: 'Priya Sharma', rating: 5, text: 'Absolutely stunning pieces! The quality is exceptional and the designs are so unique. I get compliments every time I wear them.', location: 'Mumbai' },
  { name: 'Anita Gupta', rating: 5, text: 'Isha creates the most beautiful handmade jewellery. Perfect for special occasions and the customer service is outstanding.', location: 'Delhi' },
  { name: 'Meera Patel', rating: 5, text: 'I ordered a custom necklace for my wedding and it was beyond my expectations. Truly a work of art!', location: 'Ahmedabad' },
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('id, name, price, image_url, category, description')
        .eq('featured', true)
        .limit(3);
      setFeaturedProducts(
        (data ?? []).map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          image: p.image_url || '',
          category: p.category,
          description: p.description || '',
        }))
      );
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Exquisite handmade jewellery collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 fade-in">
            Handmade Jewellery to
            <span className="block text-gradient bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent pb-6">
              Elevate Every Occasion
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            Discover our exquisite collection of handcrafted jewellery, where each piece tells a unique story of elegance and beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/products">
              <Button className="btn-hero text-lg px-8 py-4">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="btn-elegant text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="fade-in">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">Handcrafted with finest materials and attention to detail</p>
            </div>
            
            <div className="fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Complimentary shipping on all orders across India</p>
            </div>
            
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Made with Love</h3>
              <p className="text-muted-foreground">Each piece is crafted with passion and care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Featured <span className="text-gradient">Collections</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated selection of handmade jewellery pieces, perfect for every style and occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center fade-in">
            <Link to="/products">
              <Button className="btn-hero">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find the perfect piece for every occasion and style.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Rings', category: 'rings', image: ringsImage },
              { name: 'Necklaces', category: 'necklaces', image: necklaceImage },
              { name: 'Earrings', category: 'earrings', image: earringsImage },
              { name: 'Bracelets', category: 'bracelets', image: heroImage }
            ].map((cat, index) => (
              <Link
                key={cat.category}
                to={`/products?category=${cat.category}`}
                className="group slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-xl aspect-square">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl md:text-2xl font-serif font-semibold">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              What Our <span className="text-gradient">Customers</span> Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who love our handcrafted jewellery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-luxury p-8 text-center slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 fade-in">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl mb-8 opacity-90 fade-in" style={{ animationDelay: '0.1s' }}>
            Explore our full collection and discover jewellery that speaks to your unique style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/products">
              <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                Custom Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;