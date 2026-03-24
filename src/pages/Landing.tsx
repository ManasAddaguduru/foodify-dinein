import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (user) return <Navigate to="/home" replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-hero px-4">
      <div className="animate-fade-in text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl gradient-warm shadow-elevated">
          <UtensilsCrossed className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="font-display text-6xl font-extrabold tracking-tight text-primary-foreground md:text-7xl">
          Foodify
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/70">
          Delicious food, delivered to your door — or dine in style.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/login">
            <Button size="lg" className="w-full gradient-warm text-primary-foreground px-10 text-base font-semibold sm:w-auto">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="outline" className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-10 text-base font-semibold sm:w-auto">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
