import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) return;
    setPlacing(true);
    const orderItems = items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, restaurantName: i.restaurantName }));
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: orderItems,
      total: total + 40,
    });
    if (error) {
      toast({ title: "Failed to place order", variant: "destructive" });
    } else {
      toast({ title: "Order placed successfully! 🎉", description: `Total: ₹${total + 40}. Your food is being prepared.` });
      clearCart();
    }
    setPlacing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-16 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40" />
            <p className="mt-4 text-lg text-muted-foreground">Your cart is empty</p>
            <Link to="/home">
              <Button className="mt-6 gradient-warm text-primary-foreground">Browse Restaurants</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-card">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.restaurantName}</p>
                    <p className="mt-1 font-bold text-foreground">₹{item.price * item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center font-bold">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">₹{total}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-bold text-foreground">₹40</span>
              </div>
              <hr className="my-4 border-border" />
              <div className="flex items-center justify-between text-xl">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-primary">₹{total + 40}</span>
              </div>
              <Button onClick={handlePlaceOrder} className="mt-6 w-full gradient-warm text-primary-foreground text-lg font-semibold py-6">
                Place Order — ₹{total + 40}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
