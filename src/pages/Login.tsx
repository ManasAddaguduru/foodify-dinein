import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { user, signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  if (!loading && user) return <Navigate to="/home" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: error, variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <span className="font-display text-3xl font-bold text-foreground">Foodify</span>
          </Link>
          <p className="mt-2 text-muted-foreground">Welcome back! Sign in to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-8 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full gradient-warm text-primary-foreground font-semibold" disabled={submitting}>
            {submitting ? "Signing in…" : "Login"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
