import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const load = async () => {
    setLoading(true);
    let q = supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
    if (filter !== 'all') q = q.eq('status', filter as any);
    const { data } = await q;
    setOrders(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status: status as any }).eq('id', id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Order updated', description: `Status changed to ${status}` });
    load();
  };

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + Number(o.total), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif">Admin — Orders</h1>
            <p className="text-muted-foreground">{orders.length} orders · ₹{totalRevenue.toLocaleString()} revenue (excl. cancelled)</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="card-luxury p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-sm text-muted-foreground">#{o.id.slice(0, 8)}</div>
                    <div className="font-semibold">{o.full_name}</div>
                    <div className="text-sm text-muted-foreground">{o.email} · {o.phone}</div>
                    <div className="text-sm text-muted-foreground">
                      {o.address_line1}{o.address_line2 ? `, ${o.address_line2}` : ''}, {o.city}, {o.state} {o.postal_code}, {o.country}
                    </div>
                    {o.notes && <div className="text-sm italic text-muted-foreground mt-1">"{o.notes}"</div>}
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(o.created_at).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={statusColor[o.status]}>{o.status}</Badge>
                    <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                      <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  {o.order_items?.map((it: any) => (
                    <div key={it.id} className="flex items-center gap-3 text-sm">
                      {it.product_image && <img src={it.product_image} alt="" className="w-12 h-12 rounded object-cover" />}
                      <span className="flex-1">{it.product_name} × {it.quantity}</span>
                      <span>₹{(it.unit_price * it.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-semibold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₹{Number(o.total).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;
