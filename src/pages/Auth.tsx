import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import heroBanner from "../assets/hero-banner.jpg";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <img 
            src="/logo.png" 
            alt="STORYVERSE Logo" 
            className="h-12 md:h-16 w-auto object-contain" 
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
            Ready to create? Start your journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl justify-center">
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

        {/* Footer spacer */}
        <div className="h-20" />
      </div>
    </div>
  );
};

export default Auth;
