import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/profiles";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err?.code === "auth/invalid-credential"
          ? "Incorrect email or password."
          : "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 creator-grid opacity-20" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      <form onSubmit={handleLogin} className="relative w-full max-w-md space-y-5 rounded-3xl border border-border bg-card/90 backdrop-blur p-8">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Storyverse Logo"
            className="h-10 w-auto object-contain"
          />
          <p className="text-xs text-muted-foreground">Welcome back</p>
        </div>

        <h1 className="text-2xl font-semibold">Sign in to your studio</h1>

        {error && (
          <div className="bg-destructive/15 border border-destructive/30 text-destructive px-4 py-3 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 bg-background/60 border border-muted-foreground/30 rounded-xl"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 bg-background/60 border border-muted-foreground/30 rounded-xl"
        />

        <button
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <button type="button" onClick={() => navigate("/signup")} className="underline text-foreground">
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
