import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background mosaic of show posters */}
      <div className="absolute inset-0 opacity-40">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 transform rotate-[-10deg] scale-125 -translate-y-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 rounded-sm"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <h1 className="font-display text-3xl md:text-5xl text-primary tracking-wider">
            STORYVERSE
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold transition-colors"
          >
            Sign In
          </button>
        </header>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 max-w-4xl leading-tight">
            Unlimited stories,
            <br />
            infinite endings
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Create your own adventure. Share with the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
            <button
              onClick={() => navigate("/signup")}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xl rounded flex items-center justify-center gap-2 transition-colors"
            >
              Get Started
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/login")}
              className="h-14 px-8 bg-background/80 border border-muted-foreground/30 rounded text-foreground font-semibold text-xl hover:bg-muted/30 transition-colors"
            >
              Login
            </button>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
