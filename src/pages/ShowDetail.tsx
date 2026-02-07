import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Plus, ThumbsUp, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getMovies } from "@/lib/movieService";
import { Movie } from "@/data/mockData";
import { shows } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      const allShows = await getMovies();
      const found = allShows.find((s) => String(s.id) === String(id));
      setShow(found || null);
      setLoading(false);
    };
    fetchShow();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-background text-white flex items-center justify-center">Loading Story...</div>;

  if (!show) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        <p>Show not found (ID: {id})</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-24 left-4 md:left-12 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Content */}
      <div className="relative -mt-48 px-4 md:px-12 pb-20">
        <div className="max-w-4xl">
          {/* Title & Actions */}
          <h1 className="font-display text-4xl md:text-6xl tracking-wide mb-4">
            {show.title.toUpperCase()}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-semibold">{show.genre}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {show.episodes.length} Episodes
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {show.views.toLocaleString()} views
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Link to={`/episode/${show.episodes[0]?.id}`}>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Reading
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2">
              <Plus className="w-5 h-5" />
              My List
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <ThumbsUp className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-foreground/90 text-lg mb-8 max-w-2xl">
            {show.description}
          </p>

          {/* Episodes Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Episodes</h2>

            <div className="space-y-4">
              {show.episodes.map((episode) => (
                <Link
                  key={episode.id}
                  to={`/episode/${episode.id}`}
                  className="flex gap-4 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors group"
                >
                  {/* Episode Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded bg-muted flex items-center justify-center font-display text-2xl">
                    {episode.number}
                  </div>

                  {/* Episode Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {episode.title}
                      </h3>
                      {episode.isFinished && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                          Choice Available
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {episode.description}
                    </p>
                  </div>

                  {/* Play Icon */}
                  <div className="flex-shrink-0 flex items-center">
                    <div className="w-10 h-10 rounded-full border border-muted-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
