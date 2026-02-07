import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ShowRow from "@/components/ShowRow";
import { shows, creatorStats } from "@/data/mockData";
import { Sparkles, Clock, Users, Video, PenTool, UploadCloud } from "lucide-react";
import { useState } from "react";
import { X, User, Send } from "lucide-react"; 
import { Button } from "@/components/ui/button";

const Index = () => {
  const featuredShow = shows[0];

  const yourStories = shows;
  const trendingNow = [...shows].sort((a, b) => b.views - a.views);

  const userNiche = creatorStats.primaryNiche;
  const trendingInNiche = shows.filter((s) => s.genre === userNiche);

  const [selectedCreator, setSelectedCreator] = useState<{name: string, role: string, niche: string} | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroBanner show={featuredShow} />

      {/* Studio Quick Actions */}
      <div className="relative z-10 -mt-24 px-4 md:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">AI Story Lab</p>
                <p className="text-lg font-semibold mt-2">Generate hooks & scripts</p>
              </div>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Turn a rough idea into a ready-to-shoot outline in minutes.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Posting Intel</p>
                <p className="text-lg font-semibold mt-2">Best time to post</p>
              </div>
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Next slot: Thu 7:30 PM. Expected lift +18%.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/90 backdrop-blur p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Creator Lounge</p>
                <p className="text-lg font-semibold mt-2">Find collaborators</p>
              </div>
              <Users className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-3">Editors, designers, and writers ready for your series.</p>
          </div>
        </div>
      </div>

      {/* Episode Pipeline */}
      <div className="relative z-10 mt-10 px-4 md:px-12">
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Season Board</p>
              <h2 className="text-xl md:text-2xl font-semibold mt-2">Move episodes from idea → posted</h2>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              New Episode
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { title: "Idea", icon: Sparkles, items: ["What if…", "Pilot hook", "Cold open"] },
              { title: "Script", icon: PenTool, items: ["Outline draft", "Scene beats"] },
              { title: "Shoot", icon: Video, items: ["Shot list", "B-roll"] },
              { title: "Posted", icon: UploadCloud, items: ["Ep 1 live", "Ep 2 teaser"] },
            ].map((col) => (
              <div key={col.title} className="rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <col.icon className="w-4 h-4 text-primary" />
                  {col.title}
                </div>
                <div className="mt-3 space-y-2">
                  {col.items.map((item) => (
                    <div key={item} className="rounded-xl bg-card px-3 py-2 text-sm text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Lounge */}
      <div className="relative z-10 mt-10 px-4 md:px-12">
        <div className="rounded-3xl border border-border bg-card/80 backdrop-blur p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Creator Lounge</p>
              <h2 className="text-xl md:text-2xl font-semibold mt-2">Find collaborators in your niche</h2>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Browse all
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { name: "Ari V.", role: "Editor", niche: "Fantasy recaps" },
              { name: "Mina K.", role: "Designer", niche: "Cinematic titles" },
              { name: "Theo J.", role: "Writer", niche: "Sci‑fi hooks" },
            ].map((person) => (
              <div key={person.name} className="rounded-2xl border border-border bg-background/60 p-4">
                <p className="font-semibold">{person.name}</p>
                <p className="text-sm text-muted-foreground">{person.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{person.niche}</p>
                <button 
                  onClick={() => setSelectedCreator(person)} 
                  className="mt-4 text-xs font-semibold text-primary hover:underline">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Creator Profile Popup */}
      {selectedCreator && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border w-full max-w-[1000px] min-h-[600px] rounded-3xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedCreator(null)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{selectedCreator.name}</h3>
              <p className="text-primary font-medium">{selectedCreator.role}</p>
              <div className="mt-2 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                {selectedCreator.niche}
              </div>
              
              <p className="mt-6 text-muted-foreground text-sm">
                Professional {selectedCreator.role} specializing in {selectedCreator.niche}. 
                Ready to collaborate on high-quality Storyverse series.

                <div className="mt-10 w-full overflow-hidden">
                  <div className="flex items-center justify-between mb-4 px-2">
                  </div>
                  
                  <div className="scale-90 origin-top -mt-4"> 
                    <ShowRow title="" shows={yourStories.slice(0, 4)} /> 
                  </div>
                </div>
              </p>

              <div className="grid grid-cols-2 gap-3 w-full mt-8">
                <Button onClick={() => setSelectedCreator(null)}>View Portfolio</Button>
                <Button variant="outline" className="gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 pt-10 pb-20">
        <div id="your-stories">
          <ShowRow title="Your Series" shows={yourStories} />
        </div>
        <div id="new-on-storyverse">
          <ShowRow title="Trending on Storyverse" shows={trendingNow} />
        </div>
        <ShowRow
          title={`Trending in ${userNiche}`}
          shows={trendingInNiche.length > 0 ? trendingInNiche : yourStories}
        />
        
      </div>
    </div>
  );
};

export default Index;
