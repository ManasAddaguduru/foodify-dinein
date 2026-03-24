import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { restaurants } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import Navbar from "@/components/Navbar";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const mode = (searchParams.get("mode") as "delivery" | "dine-in") || "delivery";
  const [search, setSearch] = useState("");
  const [filterVeg, setFilterVeg] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "none">("none");

  let filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  if (filterVeg !== null) {
    filtered = filtered.filter((r) => r.isVeg === filterVeg);
  }

  if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          {mode === "delivery" ? "Order Food Delivery" : "Book a Table"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {mode === "delivery" ? "Choose from the best restaurants near you" : "Reserve your spot at top restaurants"}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or cuisines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant={filterVeg === true ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterVeg(filterVeg === true ? null : true)}
            className={filterVeg === true ? "bg-accent text-accent-foreground" : ""}
          >
            Veg Only
          </Button>
          <Button
            variant={filterVeg === false ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterVeg(filterVeg === false ? null : false)}
            className={filterVeg === false ? "bg-destructive text-destructive-foreground" : ""}
          >
            Non-Veg
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy(sortBy === "rating" ? "none" : "rating")}
          >
            <SlidersHorizontal className="mr-1 h-4 w-4" /> Top Rated
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} mode={mode} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-lg text-muted-foreground">No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
