import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Star, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            About <span className="text-gradient">Dish Creations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every piece tells a story of passion, craftsmanship, and the timeless beauty of handmade jewellery.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="slide-up">
            <h2 className="text-3xl font-serif mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Dish Creations was born from a passion for creating beautiful, meaningful jewellery that celebrates life's precious moments. Founded by <strong className="text-foreground">Isha Patel</strong>, our brand represents the perfect blend of traditional craftsmanship and contemporary design.
              </p>
              <p>
                Each piece in our collection is meticulously handcrafted with love and attention to detail. We believe that jewellery should not just be an accessory, but a reflection of your unique story and personality.
              </p>
              <p>
                From delicate everyday pieces to statement jewellery for special occasions, we create designs that elevate every moment and make you feel confident and beautiful.
              </p>
            </div>
          </div>
          
          <div className="slide-up">
            <div className="relative">
              <div className="w-full h-96 bg-gradient-secondary rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">DC</span>
                  </div>
                  <p className="text-muted-foreground">Founder: Isha Patel</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif text-center mb-12 fade-in">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center slide-up">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Crafted with Love</h3>
              <p className="text-muted-foreground text-sm">
                Every piece is handmade with passion and attention to detail.
              </p>
            </div>
            
            <div className="text-center slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                We use only the finest materials and gemstones in our creations.
              </p>
            </div>
            
            <div className="text-center slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Unique Designs</h3>
              <p className="text-muted-foreground text-sm">
                Each design is original and reflects contemporary elegance.
              </p>
            </div>
            
            <div className="text-center slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-lg mb-2">Customer First</h3>
              <p className="text-muted-foreground text-sm">
                Your satisfaction and happiness are our top priorities.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-secondary rounded-xl p-8 md:p-12 text-center fade-in">
          <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            To create beautiful, handcrafted jewellery that celebrates the unique story of every individual. 
            We believe that the right piece of jewellery has the power to elevate not just your outfit, 
            but your confidence and spirit.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-16 fade-in">
          <h3 className="text-2xl font-serif mb-4">Get in Touch</h3>
          <p className="text-muted-foreground mb-6">
            Have questions about our pieces or need something custom? We'd love to hear from you.
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p><strong className="text-foreground">Isha Patel</strong> - Founder & Designer</p>
            <p>📞 +91 9664780894</p>
            <p>✉️ Patelishu2811@gmail.com</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;