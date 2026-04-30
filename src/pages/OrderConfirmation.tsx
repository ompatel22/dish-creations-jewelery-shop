import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    (async () => {
      const { data: o } = await supabase.from('orders').select('*').eq('id', orderId).maybeSingle();
      const { data: it } = await supabase.from('order_items').select('*').eq('order_id', orderId);
      setOrder(o);
      setItems(it ?? []);
      setLoading(false);
    })();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : !order ? (
          <p className="text-center text-muted-foreground">Order not found.</p>
        ) : (
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-serif mb-2">Thank you, {order.full_name}!</h1>
            <p className="text-muted-foreground mb-8">
              Your order <span className="font-mono text-foreground">#{order.id.slice(0, 8)}</span> has been placed.
              We'll be in touch shortly.
            </p>

            <div className="card-luxury p-6 text-left mb-6">
              <h2 className="font-serif text-xl mb-4">Order Summary</h2>
              {items.map((i) => (
                <div key={i.id} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span>{i.product_name} × {i.quantity}</span>
                  <span className="font-medium">₹{(i.unit_price * i.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-semibold text-lg">
                <span>Total</span>
                <span>₹{Number(order.total).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link to="/my-orders"><Button variant="outline">View My Orders</Button></Link>
              <Link to="/products"><Button className="btn-hero">Continue Shopping</Button></Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
