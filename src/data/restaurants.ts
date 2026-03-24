export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  discount: string;
  cuisine: string;
  deliveryTime: string;
  priceRange: string;
  isVeg: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isVeg: boolean;
  description: string;
}

export const restaurants: Restaurant[] = [
  { id: "1", name: "Biryani House", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600", rating: 4.5, location: "Koramangala, Bangalore", discount: "20% OFF", cuisine: "Hyderabadi", deliveryTime: "30-35 min", priceRange: "₹300 for two", isVeg: false },
  { id: "2", name: "Tandoori Nights", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600", rating: 4.3, location: "Indiranagar, Bangalore", discount: "Flat ₹100 OFF", cuisine: "North Indian", deliveryTime: "25-30 min", priceRange: "₹400 for two", isVeg: false },
  { id: "3", name: "Punjabi Dhaba", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", rating: 4.1, location: "HSR Layout, Bangalore", discount: "30% OFF", cuisine: "Punjabi", deliveryTime: "35-40 min", priceRange: "₹250 for two", isVeg: false },
  { id: "4", name: "South Spice", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600", rating: 4.6, location: "JP Nagar, Bangalore", discount: "15% OFF", cuisine: "South Indian", deliveryTime: "20-25 min", priceRange: "₹200 for two", isVeg: true },
  { id: "5", name: "Delhi Darbar", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600", rating: 4.4, location: "MG Road, Bangalore", discount: "Flat ₹150 OFF", cuisine: "Mughlai", deliveryTime: "30-35 min", priceRange: "₹500 for two", isVeg: false },
  { id: "6", name: "Spice Villa", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600", rating: 4.2, location: "Whitefield, Bangalore", discount: "25% OFF", cuisine: "Multi-Cuisine", deliveryTime: "35-40 min", priceRange: "₹350 for two", isVeg: false },
  { id: "7", name: "Andhra Meals", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600", rating: 4.7, location: "BTM Layout, Bangalore", discount: "20% OFF", cuisine: "Andhra", deliveryTime: "25-30 min", priceRange: "₹200 for two", isVeg: true },
  { id: "8", name: "Udupi Grand", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600", rating: 4.0, location: "Jayanagar, Bangalore", discount: "Flat ₹75 OFF", cuisine: "Udupi", deliveryTime: "15-20 min", priceRange: "₹150 for two", isVeg: true },
  { id: "9", name: "Hyderabad Biryani Hub", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600", rating: 4.8, location: "Electronic City, Bangalore", discount: "40% OFF", cuisine: "Hyderabadi", deliveryTime: "30-40 min", priceRange: "₹350 for two", isVeg: false },
];

export const menuItems: MenuItem[] = [
  { id: "m1", name: "Chicken Biryani", price: 299, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", isVeg: false, description: "Aromatic basmati rice cooked with tender chicken and spices" },
  { id: "m2", name: "Paneer Butter Masala", price: 249, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400", isVeg: true, description: "Cottage cheese cubes in rich tomato and butter gravy" },
  { id: "m3", name: "Masala Dosa", price: 129, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400", isVeg: true, description: "Crispy rice crepe filled with spiced potato filling" },
  { id: "m4", name: "Butter Naan", price: 59, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400", isVeg: true, description: "Soft leavened bread baked in tandoor with butter" },
  { id: "m5", name: "Chicken Tikka", price: 329, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400", isVeg: false, description: "Chargrilled chicken marinated in yogurt and spices" },
  { id: "m6", name: "Veg Thali", price: 199, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400", isVeg: true, description: "Complete meal with dal, sabzi, roti, rice, and dessert" },
  { id: "m7", name: "Fried Rice", price: 179, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400", isVeg: true, description: "Wok-tossed rice with fresh vegetables and soy sauce" },
  { id: "m8", name: "Noodles", price: 169, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400", isVeg: true, description: "Stir-fried noodles with crunchy vegetables" },
  { id: "m9", name: "Gulab Jamun", price: 99, image: "https://images.unsplash.com/photo-1666190073498-d3e9eef52a0c?w=400", isVeg: true, description: "Deep-fried milk dumplings soaked in sugar syrup" },
  { id: "m10", name: "Ice Cream", price: 119, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400", isVeg: true, description: "Creamy artisan ice cream in assorted flavors" },
];
