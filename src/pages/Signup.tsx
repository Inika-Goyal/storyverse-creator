import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profiles", { replace: true });
    } catch (err: any) {
      setError(
        err?.code === "auth/email-already-in-use"
          ? "This email already has an account. Try logging in."
          : err?.code === "auth/weak-password"
          ? "Password must be at least 6 characters."
          : "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <form onSubmit={handleSignup} className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-bold">Create account</h1>

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
          placeholder="Password (min 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 bg-background border border-muted-foreground/30 rounded"
        />

        <button
          disabled={loading}
          className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded disabled:opacity-70"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="underline text-foreground"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
