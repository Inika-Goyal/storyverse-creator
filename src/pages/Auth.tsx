import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // For now, just navigate to profile selection
      navigate("/profiles");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background mosaic of show posters */}
      <div className="absolute inset-0 opacity-40">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1 transform rotate-[-10deg] scale-125 -translate-y-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-gradient-to-br from-muted to-muted/50 rounded-sm"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
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
          <img 
            src="/logo.png" 
            alt="StoryVerse Logo" 
            className="h-8 md:h-12 w-auto object-contain" 
          />
          <button
            onClick={() => navigate("/profiles")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded text-sm font-semibold transition-colors"
          >
            Sign In
          </button>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 max-w-4xl leading-tight">
            Unlimited stories,
            <br />
            infinite endings
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Create your own adventure. Share with the world.
          </p>
          
          <p className="text-foreground mb-4">
            Ready to create? Enter your email to start your journey.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 px-4 bg-background/80 border border-muted-foreground/30 rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
            <button
              type="submit"
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xl rounded flex items-center justify-center gap-2 transition-colors"
            >
              Get Started
              <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* Footer spacer */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Auth;
