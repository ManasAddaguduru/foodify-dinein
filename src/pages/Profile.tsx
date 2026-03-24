import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { User, ShoppingBag, UtensilsCrossed, Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";

const Profile = () => {
  const { user } = useAuth();

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-warm">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {user?.user_metadata?.full_name || "User"}
            </h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" /> Order History
          </h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {orders.map((order) => {
                const items = order.items as Array<{ name: string; quantity: number; price: number }>;
                return (
                  <div key={order.id} className="rounded-lg border border-border bg-card p-4 shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(order.created_at), "dd MMM yyyy, hh:mm a")}
                      </span>
                      <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                        {order.status}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {items.map((item, i) => (
                        <li key={i} className="flex justify-between text-sm text-foreground">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 border-t border-border pt-2 text-right font-bold text-foreground">
                      Total: ₹{order.total}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Booking History */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <UtensilsCrossed className="h-5 w-5 text-primary" /> Dine-In Bookings
          </h2>
          {bookings.length === 0 ? (
            <p className="mt-4 text-muted-foreground">No bookings yet.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{booking.restaurant_name}</h3>
                    <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {booking.booking_date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {booking.booking_time}</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {booking.num_people} people</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
