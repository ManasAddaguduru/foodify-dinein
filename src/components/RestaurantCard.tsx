import { Restaurant } from "@/data/restaurants";
import { Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  restaurant: Restaurant;
  mode: "delivery" | "dine-in";
}

const RestaurantCard = ({ restaurant, mode }: Props) => {
  return (
    <Link
      to={`/restaurant/${restaurant.id}?mode=${mode}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
          {restaurant.discount}
        </span>
        {restaurant.isVeg && (
          <span className="absolute right-3 top-3 rounded-md bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
            Pure Veg
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground">{restaurant.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{restaurant.cuisine} • {restaurant.priceRange}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 font-medium text-accent">
            <Star className="h-3.5 w-3.5 fill-current" /> {restaurant.rating}
          </span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {restaurant.deliveryTime}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {restaurant.location.split(",")[0]}</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
