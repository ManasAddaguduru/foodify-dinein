import { Link } from "react-router-dom";
import { Bike, UtensilsCrossed, Search } from "lucide-react";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="animate-fade-in text-center">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            What are you in the mood for?
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Order in or dine out — the choice is yours.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
          <Link
            to="/restaurants?mode=delivery"
            className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl gradient-warm transition-transform group-hover:scale-110">
              <Bike className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">Food Delivery</h2>
              <p className="mt-1 text-sm text-muted-foreground">Get your favorites delivered fast</p>
            </div>
          </Link>
          <Link
            to="/restaurants?mode=dine-in"
            className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent transition-transform group-hover:scale-110">
              <UtensilsCrossed className="h-10 w-10 text-accent-foreground" />
            </div>
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-foreground">Dine-In</h2>
              <p className="mt-1 text-sm text-muted-foreground">Book a table at top restaurants</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
