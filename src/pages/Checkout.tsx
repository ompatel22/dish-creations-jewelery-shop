import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const schema = z.object({
  full_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  address_line1: z.string().trim().min(1).max(200),
  address_line2: z.string().trim().max(200).optional().or(z.literal('')),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  postal_code: z.string().trim().min(3).max(20),
  country: z.string().trim().min(1).max(100),
  notes: z.string().trim().max(500).optional().or(z.literal('')),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (items.length === 0) navigate('/cart', { replace: true });
  }, [items, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      toast({ title: 'Please check the form', description: parsed.error.errors[0].message, variant: 'destructive' });
      return;
    }
    setBusy(true);
    const d = parsed.data;
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        full_name: d.full_name,
        email: d.email,
        phone: d.phone,
        address_line1: d.address_line1,
        address_line2: d.address_line2 || null,
        city: d.city,
        state: d.state,
        postal_code: d.postal_code,
        country: d.country,
        notes: d.notes || null,
        subtotal: totalPrice,
        total: totalPrice,
      })
      .select()
      .single();

    if (orderErr || !order) {
      setBusy(false);
      toast({ title: 'Could not place order', description: orderErr?.message, variant: 'destructive' });
      return;
    }

    const itemsPayload = items.map((i) => ({
      order_id: order.id,
      product_id: i.id,
      product_name: i.name,
      product_image: i.image,
      unit_price: i.price,
      quantity: i.quantity,
    }));

    const { error: itemsErr } = await supabase.from('order_items').insert(itemsPayload);
    if (itemsErr) {
      setBusy(false);
      toast({ title: 'Order saved but items failed', description: itemsErr.message, variant: 'destructive' });
      return;
    }

    // Send confirmation emails (best-effort)
    supabase.functions.invoke('send-order-emails', {
      body: { order_id: order.id },
    }).catch(() => {});

    clearCart();
    setBusy(false);
    toast({ title: 'Order placed!', description: 'Thank you for your purchase.' });
    navigate(`/order-confirmation/${order.id}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 card-luxury p-6 space-y-4">
            <h2 className="text-xl font-serif mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="full_name" placeholder="Full name *" required defaultValue={user?.user_metadata?.full_name || ''} />
              <Input name="email" type="email" placeholder="Email *" required defaultValue={user?.email || ''} />
            </div>
            <Input name="phone" type="tel" placeholder="Phone *" required />
            <Input name="address_line1" placeholder="Address line 1 *" required />
            <Input name="address_line2" placeholder="Address line 2 (optional)" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input name="city" placeholder="City *" required />
              <Input name="state" placeholder="State *" required />
              <Input name="postal_code" placeholder="PIN code *" required />
            </div>
            <Input name="country" placeholder="Country *" required defaultValue="India" />
            <Textarea name="notes" placeholder="Order notes (optional)" rows={3} />
            <Button type="submit" disabled={busy} className="w-full btn-hero">
              {busy ? 'Placing order...' : `Place Order — ₹${totalPrice.toLocaleString()}`}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Cash on delivery. Online payment coming soon.
            </p>
          </form>

          <aside className="card-luxury p-6 h-fit">
            <h2 className="text-xl font-serif mb-4">Your Order</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="flex-1">{item.name} × {item.quantity}</span>
                  <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
