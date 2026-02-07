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
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Sign in</h1>

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
          className="w-full h-12 px-4 bg-background border border-muted-foreground/30 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 bg-background border border-muted-foreground/30 rounded"
        />

        <button
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="underline text-foreground"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
