import { useParams, useSearchParams } from "react-router-dom";
import { restaurants, menuItems } from "@/data/restaurants";
import MenuItemCard from "@/components/MenuItemCard";
import Navbar from "@/components/Navbar";
import { Star, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "delivery";
  const restaurant = restaurants.find((r) => r.id === id);
  const { toast } = useToast();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("2");

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="mt-20 text-center text-lg text-muted-foreground">Restaurant not found.</p>
      </div>
    );
  }

  const timeSlots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

  const handleBookTable = async () => {
    if (!date || !time || !people) {
      toast({ title: "Please fill all booking details", variant: "destructive" });
      return;
    }
    if (!user) return;
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      restaurant_name: restaurant.name,
      booking_date: date,
      booking_time: time,
      num_people: parseInt(people),
    });
    if (error) {
      toast({ title: "Failed to book table", variant: "destructive" });
    } else {
      toast({ title: `Table booked at ${restaurant.name}!`, description: `${date} at ${time} for ${people} people` });
      setDate("");
      setTime("");
      setPeople("2");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <div className="relative h-56 overflow-hidden md:h-72">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-primary-foreground">
          <h1 className="font-display text-3xl font-bold md:text-4xl">{restaurant.name}</h1>
          <p className="mt-1 text-primary-foreground/80">{restaurant.cuisine}</p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-current text-secondary" /> {restaurant.rating}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {restaurant.deliveryTime}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {restaurant.location}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {mode === "dine-in" && (
          <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-xl font-bold text-foreground">Book a Table</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="space-y-2">
                <Label>Time Slot</Label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Number of People</Label>
                <Input type="number" min="1" max="20" value={people} onChange={(e) => setPeople(e.target.value)} />
              </div>
              <div className="flex items-end">
                <Button onClick={handleBookTable} className="w-full gradient-warm text-primary-foreground font-semibold">
                  Book Table
                </Button>
              </div>
            </div>
          </div>
        )}

        <h2 className="font-display text-2xl font-bold text-foreground">Menu</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} restaurantId={restaurant.id} restaurantName={restaurant.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
