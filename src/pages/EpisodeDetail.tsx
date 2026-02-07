import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Users, BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { shows } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EpisodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find episode across all shows
  let foundEpisode = null;
  let foundShow = null;
  
  for (const show of shows) {
    const episode = show.episodes.find((e) => e.id === id);
    if (episode) {
      foundEpisode = episode;
      foundShow = show;
      break;
    }
  }

  const [plot, setPlot] = useState(foundEpisode?.plot || "");
  const [characters, setCharacters] = useState(
    foundEpisode?.characters.join("\n") || ""
  );
  const [additionalElements, setAdditionalElements] = useState(
    foundEpisode?.additionalElements || ""
  );

  if (!foundEpisode || !foundShow) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Episode not found</p>
      </div>
    );
  }

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving:", { plot, characters, additionalElements });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="pt-24 px-4 md:px-12 pb-8 border-b border-border">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to={`/show/${foundShow.id}`}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-muted-foreground text-sm">{foundShow.title}</p>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Episode {foundEpisode.number}: {foundEpisode.title}
            </h1>
          </div>
        </div>
        
        <p className="text-muted-foreground max-w-2xl">
          {foundEpisode.description}
        </p>
      </div>

      {/* Editor */}
      <div className="px-4 md:px-12 py-8">
        <Tabs defaultValue="plot" className="max-w-4xl">
          <TabsList className="mb-6 bg-card">
            <TabsTrigger value="plot" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Plot
            </TabsTrigger>
            <TabsTrigger value="characters" className="gap-2">
              <Users className="w-4 h-4" />
              Characters
            </TabsTrigger>
            <TabsTrigger value="elements" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Additional Elements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plot" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Episode Plot
              </label>
              <Textarea
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
                placeholder="Write your episode plot here..."
                className="min-h-[300px] bg-card border-border"
              />
            </div>
          </TabsContent>

          <TabsContent value="characters" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Characters (one per line)
              </label>
              <Textarea
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
                placeholder="Character Name - Description&#10;Another Character - Their role"
                className="min-h-[300px] bg-card border-border"
              />
            </div>
          </TabsContent>

          <TabsContent value="elements" className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Additional Elements
              </label>
              <Textarea
                value={additionalElements}
                onChange={(e) => setAdditionalElements(e.target.value)}
                placeholder="Setting, mood, themes, notes..."
                className="min-h-[300px] bg-card border-border"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Save & Choice Section */}
        <div className="max-w-4xl mt-8 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            
            {foundEpisode.isFinished && (
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => navigate(`/episode/${id}/choice`)}
              >
                Preview Story Choice
              </Button>
            )}
          </div>

          {/* Choice Endings Preview */}
          {foundEpisode.isFinished && foundEpisode.choiceA && foundEpisode.choiceB && (
            <div className="bg-card rounded-lg p-6">
              <h3 className="font-semibold mb-4">Story Endings</h3>
              <p className="text-muted-foreground text-sm mb-4">
                This episode has multiple endings. Readers will choose their path.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/30 rounded-lg border border-border">
                  <span className="text-primary font-semibold">Option A</span>
                  <p className="mt-1">{foundEpisode.choiceA.label}</p>
                </div>
                <div className="p-4 bg-accent/30 rounded-lg border border-border">
                  <span className="text-primary font-semibold">Option B</span>
                  <p className="mt-1">{foundEpisode.choiceB.label}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetail;
