import { MenuItem } from "@/data/restaurants";
import { useCart } from "@/contexts/CartContext";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

const MenuItemCard = ({ item, restaurantId, restaurantName }: Props) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartId = `${restaurantId}-${item.id}`;
  const cartItem = items.find((i) => i.id === cartId);

  const handleAdd = () => {
    addItem({
      id: cartId,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId,
      restaurantName,
    });
  };

  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-4 shadow-card">
      <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-4 w-4 rounded-sm border-2 ${item.isVeg ? "border-accent" : "border-destructive"}`}>
              <span className={`block m-0.5 h-2 w-2 rounded-full ${item.isVeg ? "bg-accent" : "bg-destructive"}`} />
            </span>
            <h4 className="font-semibold text-foreground">{item.name}</h4>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">₹{item.price}</span>
          {cartItem ? (
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center font-bold text-primary">{cartItem.quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleAdd}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={handleAdd} className="gradient-warm text-primary-foreground">
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
