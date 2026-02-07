import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 creator-grid opacity-20" />
        <div className="absolute top-16 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
          <img
            src="/logo.png"
            alt="Storyverse Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Sign In
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4 max-w-4xl leading-tight">
            Build your story world.
            <br />
            Launch episodes with purpose.
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Storyverse is the studio for creators who want to plan, produce, and grow like a series.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              Get Started
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/browse")}
              className="h-14 px-8 bg-secondary/70 border border-border rounded-full text-foreground font-semibold text-lg hover:bg-secondary transition-colors"
            >
              See the studio
            </button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4 w-full max-w-5xl text-left">
            {[
              { title: "Season Board", body: "Move ideas → script → posted." },
              { title: "AI Story Lab", body: "Generate hooks and scripts." },
              { title: "Posting Intel", body: "Best time + trend lift." },
              { title: "Creator Lounge", body: "Find editors & writers." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card/70 p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
